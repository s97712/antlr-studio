// 添加全局beforeEach钩子
beforeEach(() => {
  // 可以在这里添加测试前的通用逻辑
});

// 添加全局afterEach钩子
afterEach(() => {
  // 可以在这里添加测试后的清理逻辑
});

// 添加自定义命令
Cypress.Commands.add('parseInput', (grammar, input) => {
  cy.get('.editor-panel textarea').first().type(grammar);
  cy.get('.editor-panel textarea').last().type(input);
  cy.get('button').contains('解析').click();
});