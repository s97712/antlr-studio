export const convertTree = (node: any): TreeNode | null => {
  if (!node) return null;

  // 获取原始文本内容（如果有）
  const originalText = node.getText?.() || '';
  
  console.log('Node received by convertTree:', node);
  return {
    name: (node.getText?.() && node.getText() !== '') ? node.getText() : (node.symbol?.text || node.constructor.name.replace('Context', '')),
    originalText: originalText,
    type: node.type, // 映射 type 属性
    text: node.text, // 映射 text 属性
    children: node.children?.map(convertTree) || []
  };
};

export interface TreeNode {
  name: string;
  originalText?: string;
  children?: TreeNode[];
  type?: 'Rule' | 'Terminal'; // 添加 type 属性
  text?: string; // 添加 text 属性
}