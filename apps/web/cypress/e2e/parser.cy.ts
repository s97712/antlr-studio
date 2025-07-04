import compilerResponse from '../../mocks/real-compiler-response.json';

describe('ANTLR Playground E2E', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('.app-container').should('be.visible');
  });

  it('should successfully trigger compilation with valid grammar', () => {
    cy.task("log", "compiler response:" + JSON.stringify(compilerResponse));
    cy.intercept('POST', '/.netlify/functions/antlr-compiler', {
      statusCode: 200,
      body: compilerResponse,
    }).as('compileGrammar');

    cy.get('.editor-container .editor-panel .cm-content').first().clear({ force: true }).type(`grammar Hello;
    r  : 'hello' ID ;
    ID : [a-z]+ ;
    WS : [ \\t\\r\\n]+ -> skip;`);
    
    cy.get('[aria-label="解析语法"]').click();

    cy.wait('@compileGrammar');

    cy.get('[aria-label="解析树容器"]').should('be.visible');
  });

  it('should show an error panel on compilation failure', () => {
    cy.intercept('POST', '/.netlify/functions/antlr-compiler', {
      statusCode: 500,
      body: {
        error: 'Compilation failed',
        details: 'This is a mocked error from the test.',
      },
    }).as('compileGrammarError');

    cy.get('.editor-container .editor-panel .cm-content').first().clear({ force: true }).type('invalid grammar {');
    
    cy.get('[aria-label="解析语法"]').click();

    cy.wait('@compileGrammarError');

    cy.get('.error-panel').should('be.visible');
    cy.get('[aria-label="解析树容器"]').should('not.exist');
  });
});