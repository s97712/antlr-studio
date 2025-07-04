# ANTLR Playground

这是一个基于React和Vite构建的ANTLR语法解析器在线演示平台。

## 项目结构

- `apps/web`: 前端React应用
- `netlify/functions`: Netlify函数，用于执行ANTLR语法编译

## 启动项目
在项目根目录执行：

```bash
pnpm install
pnpm dev
```

以上命令将同时启动前端应用和Netlify Functions模拟器。
- 前端应用将在 `http://localhost:5175` 启动。
- Netlify Functions将在 `http://localhost:8888` 运行，供前端调用。

## 单独启动服务

如果需要单独启动前端或后端服务进行调试，可以在项目根目录使用以下命令：

- **仅启动前端应用:**
```bash
pnpm run dev:web
```

- **仅启动Netlify Functions模拟器:**
```bash
pnpm run dev:api
```

## 测试
本项目使用Cypress进行端到端测试。详细的测试指南，请参阅 [AI 测试指南](./AI_README.md)。