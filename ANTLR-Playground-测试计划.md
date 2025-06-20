# ANTLR Playground 端到端测试计划

## 测试框架
- 使用 **Cypress** 进行端到端测试
- 安装命令：`pnpm add -D cypress`

## 测试环境配置
1. 创建 `apps/web/cypress.config.ts`：
```ts
import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    setupNodeEvents(on, config) {
      // 集成Netlify Functions模拟器
    }
  }
})
```

2. 添加测试脚本到 `apps/web/package.json`：
```json
"scripts": {
  "test:e2e": "cypress run",
  "test:e2e:open": "cypress open"
}
```

## 核心测试用例
```ts
// apps/web/cypress/e2e/parser.cy.ts
describe('ANTLR Playground E2E', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('成功解析简单语法', () => {
    cy.get('.editor').type('grammar Example;')
    cy.get('.parse-btn').click()
    cy.get('.parse-tree').should('contain', 'Example')
  })

  it('处理解析错误', () => {
    cy.get('.editor').type('invalid syntax{')
    cy.get('.parse-btn').click()
    cy.get('.error-panel').should('be.visible')
  })

  it('渲染复杂解析树', () => {
    cy.get('.editor').type('grammar Complex; root : A B C;')
    cy.get('.parse-btn').click()
    cy.get('.node').should('have.length.at.least', 3)
  })
})
```

## 文件结构
```
apps/web/
└── cypress/
    ├── e2e/
    │   └── parser.cy.ts
    ├── fixtures/
    └── support/
```

## 后续实施步骤
1. 安装Cypress依赖
2. 初始化测试配置
3. 编写核心测试用例
4. 集成到CI/CD流程