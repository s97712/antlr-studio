describe('ANTLR Playground E2E', () => {
  beforeEach(() => {
    cy.visit('/', {
      timeout: 20000
    })
    cy.get('.app-container', { timeout: 20000 }).should('be.visible')
  })

  it('成功解析简单语法', () => {
    // 输入语法
    cy.get('.editor-container .editor-panel .cm-content').first().type('grammar Example;')
    cy.get('button').contains('解析').click()
    
    // 等待解析完成
    cy.get('.parse-tree', { timeout: 30000 }).should('be.visible')
    
    // 验证节点文本
    cy.get('.node text', { timeout: 20000 }).should('contain', 'Example')
  })

  it('处理解析错误', () => {
    cy.get('.editor-container .editor-panel .cm-content').first().type('invalid syntax{')
    cy.get('button').contains('解析').click()
    cy.get('.error-panel', { timeout: 20000 }).should('be.visible')
  })

  it('渲染复杂解析树', () => {
    cy.get('.editor-container .editor-panel .cm-content').first().type('grammar Complex; root : A B C;')
    cy.get('button').contains('解析').click()
    
    // 等待解析完成
    cy.get('.parse-tree', { timeout: 30000 }).should('be.visible')
    
    // 验证节点数量
    cy.get('.node', { timeout: 20000 }).should('have.length.at.least', 3)
  })
})