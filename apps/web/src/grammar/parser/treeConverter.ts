export const convertTree = (node: any): TreeNode | null => {
  if (!node) return null;

  // For terminal nodes (tokens)
  if (node.symbol) {
    let text = node.getText();
    if (text === '<EOF>') {
      text = 'EOF';
    }
    return {
      name: text,
      originalText: text,
      type: 'Terminal',
      render: text,
      text: text,
      children: [],
      width: 0,
      height: 0,
    };
  }

  // For rule nodes
  const ruleName = node.constructor.name.replace('Context', '');

  // Filter out null children, which can happen with optional rules or error nodes.
  const children = node.children?.map(convertTree).filter((c: TreeNode | null): c is TreeNode => c !== null) || [];

  return {
    name: ruleName,
    originalText: node.getText?.() || '',
    type: 'Rule',
    render: ruleName,
    text: node.getText?.() || '',
    children: children,
    width: 0,
    height: 0,
  };
};

export interface TreeNode {
  name: string;
  originalText?: string;
  children?: TreeNode[];
  type?: 'Rule' | 'Terminal'; // 添加 type 属性
  render: string;
  text?: string; // 添加 text 属性
  width: number; // 添加 width 属性
  height: number; // 添加 height 属性
}