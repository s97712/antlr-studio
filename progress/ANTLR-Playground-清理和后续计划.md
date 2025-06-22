# ANTLR Playground - 清理和后续计划

## 1. 当前任务状态总结

在实现 `apps/web/src/utils/parser.ts` 中的解析过程并尝试通过所有测试的过程中，我们取得了以下进展：

**已解决的问题：**
*   **后端编译错误**：解决了语法名称与文件名不匹配的问题。
*   **`antlr4` 导入问题**：成功将 `antlr4` 运行时库暴露到全局 `window` 对象，解决了动态加载模块的导入问题。
*   **`exportsMap is not defined` 错误**：通过将 `exportsMap` 暴露到 `window` 对象，并确保其在模块加载时被正确填充，解决了该错误。
*   **`Cannot read properties of undefined (reading 'default')` 错误**：通过改进动态加载模块的顺序（Listener -> Lexer -> Parser）和从文件名中正确提取模块名作为 `exportsMap` 的键，解决了模块依赖加载顺序问题。
*   **`无法找到入口规则 'program'` 错误**：在解析器入口规则查找逻辑中添加了对 `prog` 规则的识别，解决了该问题。

**未解决的问题（Cypress E2E 测试失败）：**
尽管核心解析逻辑已成功运行，但 Cypress E2E 测试仍然全部失败。具体失败的测试用例及原因如下：

*   **“成功解析简单语法”**：
    *   **错误信息**：`AssertionError: Timed out retrying after 4000ms: expected '<text>' to contain 'r'`
    *   **分析**：此错误表明测试期望在解析树的文本表示中找到特定的字符 'r'，但实际生成的文本不符合预期。这可能与 `convertParseTreeToJson` 函数的转换逻辑有关，或者前端组件在渲染解析树时对数据的处理方式不正确。

*   **“处理解析错误”**：
    *   **错误信息**：`AssertionError: Timed out retrying after 4000ms: Expected to find element: `.error-panel`, but never found it.`
    *   **分析**：此错误指示在发生解析错误时，页面上预期的错误面板（`.error-panel`）没有被渲染或显示。这可能意味着错误处理逻辑没有正确触发，或者错误面板的 CSS 类名、渲染条件存在问题。

*   **“渲染复杂解析树”**：
    *   **错误信息**：`Timed out retrying after 4000ms + expected - actual -1 +3`
    *   **分析**：此错误表明复杂解析树的渲染结果与预期不符。期望值是 1，实际值是 3。这可能意味着 `convertParseTreeToJson` 函数在处理复杂树结构时存在缺陷，导致生成的 JSON 结构不正确，或者前端渲染组件无法正确地将复杂的 JSON 树结构可视化。

**调试工具问题：**
在调试过程中，Playwright 工具会话频繁失效，导致调试中断，增加了问题排查的难度。

## 2. 代码清理计划

根据用户指示，我们需要清理 `apps/web/src/utils/parser.ts` 中所有调试过程中添加的无用代码。

**清理项：**

1.  **移除调试用的 `console.log` 语句**：
    *   `console.log('exportsMap content:', (window as any).exportsMap);`
    *   `console.log('解析成功！');`
2.  **移除暴露到 `window` 的变量**：
    *   `(window as any).exportsMap = {};`
    *   `(window as any).parser = parser;` (如果存在)
    *   `(window as any).parseTree = parseTree;` (如果存在)

## 3. 后续任务建议

为了完成整个任务（实现解析过程并确保所有测试通过），建议后续按照以下步骤进行：

1.  **切换到 `code` 模式**：
    *   使用 `switch_mode` 工具切换到 `code` 模式，因为代码修改和调试需要在该模式下进行。

2.  **逐一调试 Cypress E2E 测试用例**：
    *   **针对“成功解析简单语法”**：
        *   检查 `convertParseTreeToJson` 函数的输出，确保其生成的 JSON 结构与 Cypress 测试的预期一致。可能需要查看 Cypress 测试代码，了解其对解析树 JSON 结构的具体期望。
        *   验证前端渲染组件是否正确地从 `convertParseTreeToJson` 的输出中提取并显示文本。
    *   **针对“处理解析错误”**：
        *   检查 `parseInput` 函数中的错误处理逻辑，确保当解析发生错误时，`errors` 数组被正确填充。
        *   验证前端组件是否监听了 `errors` 数组的变化，并根据错误信息正确渲染 `.error-panel`。检查 `.error-panel` 的 CSS 类名和显示逻辑。
    *   **针对“渲染复杂解析树”**：
        *   深入调试 `convertParseTreeToJson` 函数在处理复杂解析树时的行为，确保其递归逻辑和节点转换是正确的。
        *   检查前端 `ParseTree` 组件的渲染逻辑，确保它能够正确地遍历和显示复杂的 JSON 树结构。

3.  **优化调试流程**：
    *   如果 Playwright 工具会话仍然不稳定，考虑在本地环境中手动运行 Cypress 测试，并使用浏览器开发者工具进行更直接的调试。
    *   在 Cypress 测试中添加更详细的 `cy.log()` 或 `console.log()` 语句，以在测试报告中输出中间状态和变量值。

4.  **提交最终解决方案**：
    *   在所有 Cypress E2E 测试通过后，提交最终的代码更改。

## 4. 计划确认

请您审阅此计划。如果您满意，我将开始执行代码清理步骤，并准备后续的调试工作。