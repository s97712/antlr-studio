# ANTLR Playground

这是一个基于React和Vite构建的ANTLR语法解析器在线演示平台。

## 项目结构

- `apps/web`: 前端React应用
- `netlify/functions/antlr-compiler`: Netlify函数，用于执行ANTLR语法编译和解析

## 启动项目

请确保您已安装 [pnpm](https://pnpm.io/) 和 [Netlify CLI](https://docs.netlify.com/cli/get-started/)。

### 1. 安装依赖

在项目根目录执行：

```bash
pnpm install
```

### 2. 启动开发环境

在项目根目录执行：

```bash
pnpm run dev
```

此命令将同时启动前端应用和Netlify Functions模拟器。
- 前端应用将在 `http://localhost:5175` 启动。
- Netlify Functions将在 `http://localhost:8888` 运行，供前端调用。

### 4. 运行端到端测试

本项目使用Cypress进行端到端测试。请在 `apps/web` 目录下执行测试命令。

- **运行Cypress (命令行模式):**
  ```bash
  cd apps/web
  pnpm test:e2e
  ```

- **打开Cypress (交互模式):**
  ```bash
  cd apps/web
  pnpm test:e2e:open
  ```

**重要提示:** 当测试环境（例如由AI助手使用的Playwright工具）在Docker容器中运行时，必须使用 `http://host.docker.internal:5175` 作为基础URL来访问前端应用，而不是 `localhost`。

## 贡献

欢迎贡献！请参阅 `CONTRIBUTING.md` (如果存在) 获取更多信息。

### 单独启动服务 (用于调试)

如果需要单独启动前端或后端服务进行调试，可以在项目根目录使用以下命令：

- **仅启动前端应用:**
  ```bash
  pnpm run dev:web
  ```

- **仅启动Netlify Functions模拟器:**
  ```bash
  pnpm run dev:api
  ```