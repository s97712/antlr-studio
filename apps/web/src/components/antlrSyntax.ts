import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { tags } from "@lezer/highlight";

// ANTLR语法高亮规则
export const antlrGrammarSyntax = HighlightStyle.define([
  // 语法规则
  { tag: tags.keyword, color: "#7c4dff" },
  // 字符串
  { tag: tags.string, color: "#39b54a" },
  // 注释
  { tag: tags.comment, color: "#546e7a", fontStyle: "italic" },
  // 标点符号
  { tag: tags.punctuation, color: "#555" },
  // 操作符
  { tag: tags.operator, color: "#2196f3" },
  // 标识符
  { tag: tags.variableName, color: "#000" },
  // 类型名
  { tag: tags.typeName, color: "#7c4dff" },
]);

// 导出高亮扩展
export const antlrGrammarHighlight = syntaxHighlighting(antlrGrammarSyntax);