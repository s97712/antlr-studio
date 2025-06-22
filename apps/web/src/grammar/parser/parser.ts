import antlr4 from 'antlr4';

interface ParseResult {
  tree: any;
  errors: string[];
}

interface ParserModule {
  default: any;
  [key: string]: any;
}


export async function parseInput(grammar: string, input: string): Promise<ParseResult> {
  const errors: string[] = [];
  let parseTree: any = null;

  // 1. 向后端请求编译后的解析器文件
  // 尝试从语法内容中提取语法名称
  const grammarNameMatch = grammar.match(/^\s*grammar\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*;/);
  const extractedGrammarName = grammarNameMatch && grammarNameMatch[1] ? grammarNameMatch[1] : 'Grammar';

  const response = await fetch('/.netlify/functions/antlr-compiler', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ grammar, language: 'JavaScript', grammarName: extractedGrammarName }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`后端编译失败: ${errorData.error || response.statusText}`);
  }

  const files: { fileName: string; content: string }[] = await response.json();

  // 2. 动态加载解析器
  // 将 antlr4 暴露为全局变量，以便动态加载的模块可以访问
  (window as any).antlr4 = antlr4;

  const processedFiles: { fileName: string; content: string }[] = [];

  // 第一阶段：预处理文件，只替换 antlr4 导入
  for (const file of files) {
    let modifiedContent = file.content.replace(/import antlr4 from 'antlr4';/g, 'const antlr4 = window.antlr4;');
    processedFiles.push({ fileName: file.fileName, content: modifiedContent });
  }

  // 将 exportsMap 暴露为全局变量，以便动态加载的模块可以访问

  (window as any).exportsMap = {};

  // 明确的加载顺序：Listener -> Lexer -> Parser
  const sortedFiles: { fileName: string; content: string }[] = [];
  const listenerFile = processedFiles.find(f => f.fileName.endsWith('Listener.js'));
  const lexerFile = processedFiles.find(f => f.fileName.endsWith('Lexer.js'));
  const parserFile = processedFiles.find(f => f.fileName.endsWith('Parser.js'));

  if (listenerFile) sortedFiles.push(listenerFile);
  if (lexerFile) sortedFiles.push(lexerFile);
  if (parserFile) sortedFiles.push(parserFile);

  // 添加其他可能的文件，尽管通常只有这三种
  for (const file of processedFiles) {
    if (!sortedFiles.includes(file)) {
      sortedFiles.push(file);
    }
  }

  // 第二阶段：处理相对导入并动态加载模块
  for (const file of sortedFiles) { // 使用排序后的文件列表
    let finalContent = file.content;
    // 匹配形如 "import SomeModule from './SomeModule.js';" 的相对导入
    // 并将其替换为从 exportsMap 中获取的引用
    finalContent = finalContent.replace(/import\s+(\w+)\s+from\s+'\.\/(\w+)\.js';/g, (match, moduleName, fileName) => {
      // 这里的 moduleName 应该是 ExprListener, ExprLexer, ExprParser 等
      // 确保 moduleName 和 fileName 匹配，以避免意外替换
      // 这里的 moduleName 应该直接是 ExprListener
      return `const ${moduleName} = window.exportsMap.${moduleName}.default;`; // 这里的 moduleName 应该直接是 ExprListener
    });
    
    // 创建一个Blob URL来加载JS文件
    const blob = new Blob([finalContent], { type: 'application/javascript' });
    const url = URL.createObjectURL(blob);
    try {
      const module = await import(/* @vite-ignore */ url);
      // 从完整路径中提取文件名（不含路径和扩展名）作为模块名
      const baseModuleName = file.fileName.split(/[\/\\]/).pop()?.split('.')[0];
      if (baseModuleName) {
        (window as any).exportsMap[baseModuleName] = module;
      }
    } finally {
      URL.revokeObjectURL(url); // 释放Blob URL
    }
  }

  // 动态获取 Lexer 和 Parser 的名称
  let LexerName: string | undefined;
  let ParserName: string | undefined;

  for (const file of files) {
    const baseName = file.fileName.split(/[\/\\]/).pop()?.split('.')[0];
    if (baseName && baseName.endsWith('Lexer')) {
      LexerName = baseName;
    } else if (baseName && baseName.endsWith('Parser')) {
      ParserName = baseName;
    }
  }

  if (!LexerName || !ParserName) {
    throw new Error('无法找到Lexer或Parser的文件名。');
  }

  const Lexer = (window as any).exportsMap[LexerName]?.default;
  const Parser = (window as any).exportsMap[ParserName]?.default;

  if (!Lexer || !Parser) {
    throw new Error('无法加载生成的Lexer或Parser。请检查语法名称是否与文件匹配。');
  }

  // 3. 使用解析器解析输入
  const chars = new antlr4.InputStream(input);
  const lexer = new Lexer(chars);
  const tokens = new antlr4.CommonTokenStream(lexer);
  const parser = new Parser(tokens);
  // 尝试查找常见的入口规则名称
  let entryRuleName = 'program'; // 默认入口规则
  if (typeof parser['start'] === 'function') {
    entryRuleName = 'start';
  } else if (typeof parser['compilationUnit'] === 'function') {
    entryRuleName = 'compilationUnit';
  } else if (typeof parser['r'] === 'function') {
    entryRuleName = 'r';
  } else if (typeof parser['prog'] === 'function') {
    entryRuleName = 'prog';
  }
  // 可以在这里添加更多常见的入口规则名称

  if (typeof parser[entryRuleName] !== 'function') {
    throw new Error(`无法找到入口规则 '${entryRuleName}'。请确保您的语法定义了该规则或指定了正确的入口规则。`);
  }

  parseTree = parser[entryRuleName]();

  // 4. 将解析结果转换为JSON格式 (这里需要一个AST转换函数)
  // 暂时返回原始的parseTree，后续可以集成AST转换
  // 为了通过测试，我们可能需要一个简单的树结构转换
  parseTree = convertParseTreeToJson(parseTree, parser.ruleNames);

  return { tree: parseTree, errors };
}

// 辅助函数：将ANTLR解析树转换为JSON对象
function convertParseTreeToJson(node: any, ruleNames: string[]): any {
  if (!node) {
    return null;
  }

  const children = [];
  if (node.children) {
    for (const child of node.children) {
      if (child.ruleIndex !== undefined) {
        // 这是一个规则上下文节点
        children.push(convertParseTreeToJson(child, ruleNames));
      } else if (child.symbol) {
        // 这是一个终端节点 (Token)
        children.push({
          type: 'Terminal',
          text: child.symbol.text,
          tokenType: child.symbol.type,
          line: child.symbol.line,
          column: child.symbol.column,
        });
      }
    }
  }

  if (node.ruleIndex !== undefined) {
    return {
      type: 'Rule',
      name: ruleNames[node.ruleIndex],
      text: node.getText(),
      children: children.length > 0 ? children : undefined,
    };
  } else if (node.symbol) {
    // 这是一个终端节点 (Token)
    return {
      type: 'Terminal',
      text: node.symbol.text,
      tokenType: node.symbol.type,
      line: node.symbol.line,
      column: node.symbol.column,
    };
  }
  return null;
}