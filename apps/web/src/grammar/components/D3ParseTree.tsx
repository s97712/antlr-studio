import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import type { TreeNode } from '../parser/treeConverter';

interface D3ParseTreeProps {
  data: TreeNode;
  isDarkMode: boolean; // 新增属性：是否为暗色模式
}

const D3ParseTree: React.FC<D3ParseTreeProps> = ({ data, isDarkMode }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!data || !svgRef.current) return;

    const width = 800;
    const height = 600;
    const margin = { top: 20, right: 90, bottom: 30, left: 90 };

    // 清理旧的SVG内容
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.right + margin.left)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // 添加缩放和拖拽功能
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 10]) // 缩放范围
      .on('zoom', (event) => {
        svg.attr('transform', event.transform);
      });

    d3.select(svgRef.current).call(zoom);


    const treeLayout = d3.tree<TreeNode>()
      .size([height, width])
      .separation((a, b) => (a.parent === b.parent ? 1 : 2)); // 调整节点间距，阻止重叠

    const root = d3.hierarchy(data);
    const nodes = treeLayout(root).descendants(); // 恢复为原始类型
    const links = root.links();

    // 调整节点位置，避免重叠
    nodes.forEach(d => {
      d.y = d.depth * 60; // 根据深度调整y坐标，减小垂直间距
    });

    // 绘制链接
    svg.selectAll('.link')
      .data(links)
      .enter().append('path')
      .attr('class', 'link')
      .attr('fill', 'none')
      .attr('stroke', '#ccc')
      .attr('stroke-width', 1.5)
      .attr('d', d3.linkVertical<d3.HierarchyLink<TreeNode>, d3.HierarchyPointNode<TreeNode>>()
        .x(d => d.x)
        .y(d => d.y)
      );

    // 绘制节点
    const node = svg.selectAll('.node')
      .data(nodes)
      .enter().append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x},${d.y})`);

    // 添加文本，用于测量
    const text = node.append('text')
      .attr('fill', d => {
        const color = isDarkMode ? '#E0E0E0' : '#333333';
        console.log('D3 Node Text Color:', color);
        return color;
      }) // 根据模式设置文本颜色，增加对比度
      .attr('text-anchor', 'middle') // 文本居中
      .attr('dy', '0.35em') // 垂直居中
      .style('font-weight', 'bold') // 加粗文字
      .text(d => d.data.text || d.data.name);

    // 获取文本的包围盒，用于计算矩形大小
    text.each(function(d) {
      const bbox = this.getBBox();
      d.data.width = bbox.width + 10; // 文本宽度 + 额外边距
      d.data.height = bbox.height + 10; // 文本高度 + 额外边距
    });

    // 绘制矩形
    node.insert('rect', 'text') // 在文本后面插入矩形
      .attr('x', d => -(d.data.width || 0) / 2) // 矩形x坐标，使其居中
      .attr('y', d => -(d.data.height || 0) / 2) // 矩形y坐标，使其居中
      .attr('width', d => d.data.width || 0)
      .attr('height', d => d.data.height || 0)
      .attr('fill', d => {
        const color = isDarkMode ? '#555555' : '#F0F0F0';
        console.log('D3 Node Fill Color:', color);
        return color;
      }) // 根据模式设置节点填充颜色，增加对比度
      .attr('stroke', d => {
        const color = isDarkMode ? '#88CCFF' : '#666666';
        console.log('D3 Node Stroke Color:', color);
        return color;
      }) // 根据模式设置边框颜色，增加对比度
      .attr('stroke-width', 1.5)
      .attr('rx', 5) // 圆角
      .attr('ry', 5);

    // 重新定位文本，确保在矩形中心
    text.attr('x', 0)
        .attr('y', 0);

  }, [data, isDarkMode]);


  return (
    <div style={{ overflow: 'auto', width: '100%', height: '100%' }}>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default D3ParseTree;