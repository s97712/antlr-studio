import { test, expect } from '@playwright/test';

test.describe('API: antlr-compiler', () => {
  interface CompiledFile {
    name: string;
    content: string;
  }

  const grammars = [
    {
      name: 'MyLexer.g4',
      content: "lexer grammar MyLexer;\n\nID : [a-zA-Z]+ ;\nINT : [0-9]+ ;\nWS : [ \\t\\n]+ -> skip ;"
    },
    {
      name: 'MyParser.g4',
      content: "parser grammar MyParser;\n\noptions { tokenVocab=MyLexer; }\n\nprog: stat+;\nstat: ID INT;"
    }
  ];

  test('should compile a valid multi-file grammar and return JavaScript files', async ({ request }) => {
    const response = await request.post('/.netlify/functions/antlr-compiler', {
      data: {
        grammars: grammars,
        mainGrammar: 'MyParser.g4'
      }
    });

    // 断言：响应成功
    expect(response.ok()).toBeTruthy();
    
    const body = await response.json();

    // 断言：响应体包含 'files' 属性，且是一个数组
    expect(body).toHaveProperty('files');
    expect(body.files).toBeInstanceOf(Array);

    // 断言：至少生成了 MyLexer.js 和 MyParser.js
    const fileNames = body.files.map((f: CompiledFile) => f.name);
    expect(fileNames).toContain('MyLexer.js');
    expect(fileNames).toContain('MyParser.js');

    // 断言：检查其中一个文件的内容
    const parserFile = body.files.find((f: CompiledFile) => f.name === 'MyParser.js');
    expect(parserFile).toBeDefined();
    expect(parserFile.content).toContain('MyParser');
  });

  test('should return 400 if grammars array is missing', async ({ request }) => {
    const response = await request.post('/.netlify/functions/antlr-compiler', {
      data: {
        mainGrammar: 'MyParser.g4'
        // grammars 字段缺失
      }
    });

    // 断言：响应失败
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.error).toContain('Missing grammars array');
  });
});