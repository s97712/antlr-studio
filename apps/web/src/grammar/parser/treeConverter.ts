export const convertTree = (node: any) => {
  if (!node) return null;

  return {
    name: node.constructor.name.replace('Context', ''),
    children: node.children?.map(convertTree) || []
  };
};