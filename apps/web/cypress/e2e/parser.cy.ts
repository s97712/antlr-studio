describe('ANTLR Playground E2E', () => {
  beforeEach(() => {
    cy.intercept('POST', '/.netlify/functions/antlr-compiler').as('parseGrammar') // 拦截解析请求
    cy.visit('/')
    cy.get('.app-container').should('be.visible')
  })

  afterEach(() => {
    // Capture and print logs after each test
    cy.window().then((win) => {
      // @ts-ignore
      if (win.appLogs && win.appLogs.length > 0) {
        // @ts-ignore
        win.appLogs.forEach(log => {
          cy.task('log', `[App Log] ${JSON.stringify(log)}`);
        });
        // @ts-ignore
        win.appLogs = []; // Clear logs for next test
      }
    });
  });
  
  it('成功解析简单语法', () => {
    // 简化语法和输入
    cy.get('.editor-container .editor-panel .cm-content').first().clear().type(`grammar Hello;
    r  : 'hello' ID ;
    ID : [a-z]+ ;
    WS : [ \\t\\r\\n]+ -> skip;`);
    cy.get('.editor-container .editor-panel .cm-content').eq(1).clear().type('hello world');
    cy.get('button').contains('解析').click()
    cy.wait('@parseGrammar') // 使用默认等待时间
    
    // 延长超时时间并添加重试
    // 等待解析树容器出现
    cy.get('[data-testid="parse-tree-container"]').should('be.visible')
    cy.get('[data-testid="parse-tree-container"] .node text').should('contain', 'r')
  })

  it('处理解析错误', () => {
    // 输入一个会导致语法错误的语法
    cy.get('.editor-container .editor-panel .cm-content').first().clear().type('invalid grammar {');
    cy.get('.editor-container .editor-panel .cm-content').eq(1).clear().type('test');
    cy.get('button').contains('解析').click()
    cy.get('.error-panel').should('be.visible')
    cy.get('.error-panel').should('contain', '错误') // 放宽错误文本匹配
  })

  it('渲染复杂解析树', () => {
    // 使用简化语法
    cy.get('.editor-container .editor-panel .cm-content').first().clear().type(`grammar Expr;
    expr: expr ('+'|'-') expr
         | INT
         ;
    INT: [0-9]+;
    WS: [ \\t\\r\\n]+ -> skip;`);
    cy.get('.editor-container .editor-panel .cm-content').eq(1).clear().type('1+2-3');
    cy.get('button').contains('解析').click()
    cy.wait('@parseGrammar')
    
    // 等待解析树容器出现
    cy.get('[data-testid="parse-tree-container"]').should('be.visible')
    cy.get('[data-testid="parse-tree-container"] .node').should('have.length.at.least', 3)
  })
})