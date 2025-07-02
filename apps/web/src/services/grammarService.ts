import type { TreeNode } from '../grammar/parser/treeConverter';
import { parseInput } from '../grammar/parser/parser';
import { convertTree } from '../grammar/parser/treeConverter';

/**
 * 定义预置语法的结构信息。
 */
export interface GrammarInfo {
  name: string;
  lexer?: string;
  parser: string;
  input?: string;
  startRule?: string;
  mainGrammar?: string;
}

/**
 * 从服务器获取预置语法的索引列表。
 * @async
 * @returns {Promise<GrammarInfo[]>} 返回一个包含所有语法信息的数组。
 * @throws {Error} 如果网络请求失败或响应状态不为 'ok'，则抛出错误。
 */
export const fetchGrammarList = async (): Promise<GrammarInfo[]> => {
  const response = await fetch('/pre-filled-grammars/index.json');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

/**
 * 根据指定的语法信息，从服务器加载对应的 Lexer、Parser 和输入文本内容。
 * @async
 * @param {GrammarInfo} grammarInfo - 包含要加载文件路径的语法信息对象。
 * @returns {Promise<{parserContent: string, lexerContent: string, inputContent: string}>} 返回一个包含文件内容的对象。
 * @throws {Error} 如果任何文件获取失败，Promise.all 将会 reject。
 */
export const loadGrammarContents = async (grammarInfo: GrammarInfo) => {
  const { lexer, parser, input } = grammarInfo;
  const basePath = `/pre-filled-grammars/`;

  const fetchPromises = [
    parser ? fetch(`${basePath}${parser}`).then(res => res.text()) : Promise.resolve(''),
    lexer ? fetch(`${basePath}${lexer}`).then(res => res.text()) : Promise.resolve(''),
    input ? fetch(`${basePath}${input}`).then(res => res.text()) : Promise.resolve('')
  ];
  
  const [parserContent, lexerContent, inputContent] = await Promise.all(fetchPromises);

  return { parserContent, lexerContent, inputContent };
};

/**
 * 调用核心解析引擎，对输入文本进行解析，并转换成可视化树结构。
 * @async
 * @param {Array<{fileName: string, content: string}>} grammars - 包含语法文件及其内容的数组。
 * @param {string} input - 需要被解析的输入字符串。
 * @param {string} mainGrammar - 主语法文件的名称，用于启动解析。
 * @param {string} startRule - 解析过程的入口规则名称。
 * @returns {Promise<TreeNode>} 返回转换后的可视化树的根节点。
 * @throws {Error} 如果解析过程（`parseInput`）或树转换过程（`convertTree`）失败，则抛出错误。
 */
export const runParser = async (
  grammars: { fileName: string; content: string }[],
  input: string,
  mainGrammar: string,
  startRule: string
): Promise<TreeNode | null> => {
  const tree = await parseInput(grammars, input, mainGrammar, startRule);
  return convertTree(tree.tree);
};