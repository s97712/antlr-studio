import React, { useEffect, useRef, useMemo, useState } from 'react';
import * as d3 from 'd3';
import type { TreeNode } from '../parser/treeConverter';

// 将树结构转换为可读文本格式
const treeToText = (node: TreeNode): string => {
  if (node.type === 'Terminal') {
    return String(node.text || node.originalText || '');
  }
  
  let result = '';
  if (node.children) {
    for (const child of node.children) {
      result += treeToText(child);
    }
  }
  
  return result.replace(/<EOF>/g, '');
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
  const [extractedText, setExtractedText] = useState<string>('');
  

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
      .nodeSize([40, 100]); // 调整节点间距
    
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
    console.log('d.data in ParseTree:', nodes);
    
    node.append('circle')
      .attr('r', 5)
      .attr('fill', '#333');
    
    node.append('text')
      .attr('dy', '0.31em')
      .attr('x', d => d.children ? -8 : 8)
      .attr('text-anchor', d => d.children ? 'end' : 'start')
      .text(d => d.data.text || d.data.originalText || d.data.name);
    
    // 从渲染树中提取文本并设置到 data-extracted-text 属性
    if (containerRef.current && data) {
      const text = treeToText(data);
      setExtractedText(text);
    }

  }, [data, width, height]);
  
 
  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      <svg ref={svgRef} width={width} height={height}>
        <g ref={gRef} />
      </svg>
      {extractedText && (
        <span data-testid="extracted-text-display" style={{ position: 'absolute', top: 0, left: 0, opacity: 0 }}>
          {extractedText}
        </span>
      )}
    </div>
  );
};

export default ParseTree;