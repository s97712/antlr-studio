<p>
  <a href="./README.md">English</a> | <a href="./README.zh-CN.md"><strong>简体中文</strong></a>
</p>

# ANTLR Playground

这是一个基于React和Vite构建的ANTLR语法解析器在线演示平台。

## 功能特性

- **实时解析**: 编辑您的ANTLR v4语法（词法和解析）及输入文本，即可即时查看解析树。
- **交互式解析树**: 生成的解析树在HTML5 Canvas上渲染，允许您缩放、平移和点击以聚焦于特定节点。
- **预置语法**: 提供一系列预加载的语法示例，帮助您快速上手。
- **自定义语法管理**:
    - **保存与加载**: 将您的自定义语法保存在浏览器本地。
    - **Fork**: 基于现有语法创建一个新语法。
    - **重命名与删除**: 管理您的自定义语法集合。
- **暗黑模式**: 在亮色和暗色主题之间切换，以获得舒适的视觉体验。

## 项目结构

- `apps/web`: 前端React应用
- `netlify/functions`: Netlify无服务器函数，用于在后端执行ANTLR语法编译。

## 启动项目

在项目根目录执行以下命令以在本地运行项目：

```bash
pnpm install
pnpm dev
```

该命令将同时启动前端应用和Netlify Functions模拟器。
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
本项目使用Playwright进行端到端测试。详细的测试指南，请参阅 [AI 测试指南](./AI_README.md)。

## 待办事项

- [ ] 集成AI以生成和迭代语法。