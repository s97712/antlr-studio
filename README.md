# ANTLR Playground

这是一个基于React和Vite构建的ANTLR语法解析器在线演示平台。

## 项目结构

- `apps/web`: 前端React应用
- `netlify/functions/antlr-compiler`: Netlify函数，用于执行ANTLR语法编译和解析

## 启动项目

请确保您已安装 [pnpm](https://pnpm.io/)。

### 1. 安装依赖

在项目根目录执行：

```bash
pnpm install
```

### 2. 启动前端应用

进入 `apps/web` 目录并启动开发服务器：

```bash
cd apps/web
pnpm dev
```

前端应用将在 `http://localhost:5173` 启动。

### 3. 启动Netlify Functions模拟器 (可选，用于本地开发)

如果您需要本地测试Netlify Functions，请确保已安装 [Netlify CLI](https://docs.netlify.com/cli/get-started/)。

在项目根目录执行：

```bash
netlify dev
```

这将启动一个本地服务器，模拟Netlify环境，并使前端应用能够调用本地的Netlify函数。

### 4. 运行端到端测试 (待实现)

```bash
# 待添加Cypress测试命令
```

## 贡献

欢迎贡献！请参阅 `CONTRIBUTING.md` (如果存在) 获取更多信息。