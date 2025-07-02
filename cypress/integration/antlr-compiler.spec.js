describe('Netlify Function: antlr-compiler', () => {
  // 1. 从参考脚本中提取的多文件语法定义
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

  it('should compile a valid multi-file grammar and return JavaScript files', () => {
    cy.request({
      method: 'POST',
      url: '/.netlify/functions/antlr-compiler', // baseUrl is prepended automatically
      body: {
        grammars: grammars,
        mainGrammar: 'MyParser.g4'
      },
      failOnStatusCode: false // 让我们可以手动检查状态码
    }).then((response) => {
      // 断言：响应成功
      expect(response.status).to.eq(200);
      
      // 断言：响应体包含 'files' 属性，且是一个数组
      expect(response.body).to.have.property('files');
      expect(response.body.files).to.be.an('array');

      // 断言：至少生成了 MyLexer.js 和 MyParser.js
      const fileNames = response.body.files.map(f => f.name);
      expect(fileNames).to.include('MyLexer.js');
      expect(fileNames).to.include('MyParser.js');

      // 断言：检查其中一个文件的内容
      const parserFile = response.body.files.find(f => f.name === 'MyParser.js');
      expect(parserFile).to.exist;
      expect(parserFile.content).to.include('MyParser');
    });
  });

  it('should return 400 if grammars array is missing', () => {
    cy.request({
      method: 'POST',
      url: '/.netlify/functions/antlr-compiler',
      body: {
        mainGrammar: 'MyParser.g4'
        // grammars 字段缺失
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.error).to.contain('Missing grammars array');
    });
  });
});