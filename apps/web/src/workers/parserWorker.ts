// 导入ANTLR运行时
import * as antlr4 from 'antlr4ng';

// 声明Worker全局类型
declare const self: WorkerGlobalScope & {
  parser?: {
    Lexer: new (input: antlr4.InputStream) => any;
    Parser: new (tokens: antlr4.CommonTokenStream) => any;
  };
};

// 处理ANTLR解析器加载和解析
self.onmessage = async (e) => {
  if (e.data.type === 'LOAD_PARSER') {
    const { grammar } = e.data;
    
    try {
      // 提取语法名称（如 grammar Hello; 中的 Hello）
      const grammarName = grammar.match(/grammar\s+(\w+);/)?.[1] || 'Grammar';
      
      // 调用Netlify函数编译语法
      const response = await fetch('/.netlify/functions/antlr-compiler', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grammar,
          language: 'TypeScript',
          grammarName
        })
      });
      
      if (!response.ok) {
        let errorMessage = '编译失败';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorData.details || '编译失败';
        } catch (e) {
          // 如果响应不是JSON
          errorMessage = await response.text();
        }
        throw new Error(`后端服务错误 (${response.status}): ${errorMessage}`);
      }
      
      const files = await response.json();
      
      // 合并文件内容并动态执行
      const blob = new Blob([
        Object.values(files).join('\n\n'),
        ';self.parser = { Lexer, Parser };'
      ], { type: 'application/javascript' });
      
      const url = URL.createObjectURL(blob);
      await import(url);
      URL.revokeObjectURL(url);
      
      self.postMessage({ type: 'PARSER_READY' });
    } catch (error) {
      self.postMessage({
        type: 'PARSER_ERROR',
        error: error instanceof Error ? error.message : String(error)
      });
    }
  }
  
  if (e.data.type === 'PARSE_INPUT') {
    try {
      const { input } = e.data;
      
      if (!self.parser) {
        throw new Error('解析器未加载');
      }
      
      const { Lexer, Parser } = self.parser;
      
      // 创建词法分析器和语法分析器
      const chars = new antlr4.InputStream(input);
      const lexer = new Lexer(chars);
      const tokens = new antlr4.CommonTokenStream(lexer);
      const parser = new Parser(tokens);
      
      // 解析输入
      const tree = parser.startRule();
      
      // 转换解析树为可序列化格式
      const jsonTree = treeToJson(tree);
      
      self.postMessage({
        type: 'PARSE_RESULT',
        tree: jsonTree
      });
    } catch (error) {
      self.postMessage({
        type: 'PARSE_ERROR',
        error: error instanceof Error ? error.message : String(error)
      });
    }
  }
};

// 将ANTLR解析树转换为JSON格式
function treeToJson(tree: any): any {
  if (!tree) return null;
  
  return {
    type: tree.constructor.name,
    text: tree.getText(),
    children: tree.children?.map((child: any) => treeToJson(child)) || []
  };
}