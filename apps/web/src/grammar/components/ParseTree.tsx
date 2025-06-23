import React, { useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';
import type { TreeNode } from '../parser/treeConverter';

// 将树结构转换为可读文本格式
const treeToText = (node: TreeNode): string => {
  const nodeText = (() => {
    if (node.type === 'Terminal') {
      return String(node.text || '');
    } else if (node.type === 'Rule') {
      return String(node.text || String(node.name) || '');
    }
    return String(node.originalText || String(node.name) || '');
  })();
  
  let result = nodeText;
  
  if (node.children) {
    for (const child of node.children) {
      result += treeToText(child);
    }
  }
  
  return result;
};

interface ParseTreeProps {
  data: TreeNode | null;
  width?: number;
  height?: number;
}

const ParseTree: React.FC<ParseTreeProps> = ({
  data,
  width = 800,
  height = 600
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const gRef = useRef<SVGGElement>(null);
  

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.setAttribute('data-testid', 'parse-tree');
    }
  }, []);
   
  useEffect(() => {
    if (!data || !svgRef.current) return;
    
    const svg = d3.select(svgRef.current);
    const g = d3.select(gRef.current);
    
    // 清除现有内容
    g.selectAll('*').remove();
    
    // 创建树布局
    const treeLayout = d3.tree<TreeNode>()
      .size([height, width - 200]);
    
    // 创建层次数据
    const root = d3.hierarchy(data);
    const treeRoot = treeLayout(root);
    
    // 创建缩放行为
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 2])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });
    
    svg.call(zoom);
    
    // 创建连线生成器
    const linkGenerator = d3.linkHorizontal<
      d3.HierarchyPointLink<TreeNode>,
      [number, number]
    >()
      .source(d => [d.source.x, d.source.y])
      .target(d => [d.target.x, d.target.y]);

    // 绘制连线
    const links = treeRoot.links();
    const link = g.selectAll<SVGPathElement, d3.HierarchyPointLink<TreeNode>>('.link')
      .data(links)
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', d => linkGenerator(d))
      .attr('fill', 'none')
      .attr('stroke', '#555');
    
    // 绘制节点
    const nodes = treeRoot.descendants();
    const node = g.selectAll<SVGGElement, d3.HierarchyPointNode<TreeNode>>('.node')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x},${d.y})`);
    
    node.append('circle')
      .attr('r', 5)
      .attr('fill', '#999');
    
    node.append('text')
      .attr('dy', '0.31em')
      .attr('x', d => d.children ? -8 : 8)
      .attr('text-anchor', d => d.children ? 'end' : 'start')
      .text(d => d.data.originalText || d.data.name);
    
    // 从渲染树中提取文本并设置到 data-extracted-text 属性
    if (containerRef.current && data) {
      const extractedText = treeToText(data);
      containerRef.current.setAttribute('data-extracted-text', extractedText);
    }

  }, [data, width, height]);
  
 
  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      <svg ref={svgRef} width={width} height={height}>
        <g ref={gRef} />
      </svg>
    </div>
  );
};

export default ParseTree;