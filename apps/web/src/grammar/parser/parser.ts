import antlr4 from 'antlr4';

interface ParseResult {
  tree: any;
  errors: string[];
}

export async function parseInput(
  grammars: { fileName: string; content: string }[], 
  input: string, 
  mainGrammarName: string, 
  startRuleName: string
): Promise<ParseResult> {
  const errors: string[] = [];
  let parseTree: any = null;

  // 1. 向后端请求编译后的解析器文件
  const response = await fetch('/.netlify/functions/antlr-compiler', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      grammars: grammars.map(g => ({ name: g.fileName, content: g.content })),
      mainGrammar: mainGrammarName, // 直接使用传入的主语法文件名
      language: 'JavaScript'
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`后端编译失败: ${errorData.error || response.statusText}`);
  }

  const responseData = await response.json();
  const files: { fileName: string; content: string }[] = responseData.files.map((f: { name: string; content: string }) => ({ fileName: f.name, content: f.content }));

  // 2. 动态加载解析器
  (window as any).antlr4 = antlr4;
  (window as any).exportsMap = {};

  const processedFiles: { fileName: string; content: string }[] = files.map(file => ({
    ...file,
    content: file.content.replace(/import antlr4 from 'antlr4';/g, 'const antlr4 = window.antlr4;')
  }));

  const sortedFiles = [...processedFiles].sort((a, b) => {
    if (a.fileName.endsWith('Listener.js')) return -1;
    if (b.fileName.endsWith('Listener.js')) return 1;
    if (a.fileName.endsWith('Lexer.js')) return -1;
    if (b.fileName.endsWith('Lexer.js')) return 1;
    return 0;
  });

  for (const file of sortedFiles) {
    let finalContent = file.content.replace(/import\s+(\w+)\s+from\s+'\.\/(\w+)\.js';/g, (match, moduleName) => {
      return `const ${moduleName} = window.exportsMap.${moduleName}.default;`;
    });
    
    const blob = new Blob([finalContent], { type: 'application/javascript' });
    const url = URL.createObjectURL(blob);
    try {
      const module = await import(/* @vite-ignore */ url);
      const baseModuleName = file.fileName.split(/[\/\\]/).pop()?.split('.')[0];
      if (baseModuleName) {
        (window as any).exportsMap[baseModuleName] = module;
      }
    } finally {
      URL.revokeObjectURL(url);
    }
  }

  const LexerName = Object.keys((window as any).exportsMap).find(k => k.endsWith('Lexer'));
  const ParserName = Object.keys((window as any).exportsMap).find(k => k.endsWith('Parser'));

  if (!LexerName || !ParserName) {
    throw new Error('无法在动态加载的模块中找到Lexer或Parser。');
  }

  const Lexer = (window as any).exportsMap[LexerName]?.default;
  const Parser = (window as any).exportsMap[ParserName]?.default;

  if (!Lexer || !Parser) {
    throw new Error('无法实例化生成的Lexer或Parser。');
  }

  // 3. 使用解析器解析输入
  const chars = new antlr4.InputStream(input);
  const lexer = new Lexer(chars);
  const tokens = new antlr4.CommonTokenStream(lexer);
  const parser = new Parser(tokens);

  if (typeof parser[startRuleName] !== 'function') {
    throw new Error(`指定的入口规则 '${startRuleName}' 在解析器中不是一个有效的函数。请检查 index.json 或语法文件。`);
  }

  console.log(`正在使用入口规则: ${startRuleName}`);
  parseTree = parser[startRuleName]();

  // 4. 将解析结果转换为JSON格式
  // The conversion to a simplified JSON format is no longer needed here.
  // The raw ANTLR tree will be passed directly to the frontend,
  // where treeConverter.ts will handle the conversion to the visual TreeNode format.

  return { tree: parseTree, errors };
}

// The convertParseTreeToJson function is no longer needed and has been removed.