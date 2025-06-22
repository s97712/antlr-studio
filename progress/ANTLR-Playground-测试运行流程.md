# ANTLR Playground 前端测试流程

为了运行 ANTLR Playground 前端端到端测试，请按照以下步骤操作：

## 1. 启动后端服务

此步骤将启动后端 Netlify 函数，因为前端测试依赖于它。

*   **操作目录**：请确保您在项目的根目录 (`d:/workspace/antlr-playground`)。
*   **执行命令**：
    ```bash
    pnpm run dev:api
    ```
*   **说明**：此命令将启动后端 Netlify 函数。请等待终端输出显示后端服务已成功启动。

## 2. 启动前端开发服务器

此步骤将启动前端应用，Cypress 测试将连接到此服务器。

*   **操作目录**：请确保您在项目的根目录 (`d:/workspace/antlr-playground`)。
*   **执行命令**：
    ```bash
    pnpm run dev:web
    ```
*   **说明**：此命令将启动前端开发服务器。请等待终端输出显示前端服务已成功启动。

## 3. 运行端到端测试

在后端服务和前端开发服务器都已启动并运行正常后，您可以执行 Cypress 端到端测试。

*   **操作目录**：请进入 `apps/web` 目录。
    ```bash
    cd apps/web
    ```
*   **执行命令**：
    ```bash
    pnpm test:e2e
    ```
*   **说明**：此命令将以命令行模式运行所有 Cypress 端到端测试用例。测试结果将直接输出到终端。

## 4. 查看测试结果

*   **实时结果**：Cypress 命令行输出。
*   **失败截图**：`apps/web/cypress/screenshots/` 目录。
*   **进度报告**：`progress/ANTLR-Playground-测试进度报告.md` 文件。