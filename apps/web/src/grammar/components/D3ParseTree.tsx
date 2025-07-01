import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { flextree } from 'd3-flextree';
import type { TreeNode } from '../parser/treeConverter';

interface D3ParseTreeProps {
  data: TreeNode;
  isDarkMode: boolean; // 新增属性：是否为暗色模式
}

const D3ParseTree: React.FC<D3ParseTreeProps> = ({ data, isDarkMode }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!data || !svgRef.current || !containerRef.current) return;

    const svgElement = d3.select(svgRef.current);
    svgElement.selectAll('*').remove(); // Clean up on initial setup

    const g = svgElement.append('g');

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 10])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svgElement.call(zoom);

    const drawChartContent = () => {
      // This function only draws/updates the tree elements.
      g.selectAll('*').remove();

      const treeLayout = flextree<TreeNode>({})
        .nodeSize(d => [d.data.width || 0, d.data.height || 0]);

      const root = d3.hierarchy(data);
      const nodes = treeLayout(root).descendants();
      const links = root.links();

      g.selectAll('.link')
        .data(links)
        .enter().append('path')
        .attr('class', 'link')
        .attr('fill', 'none')
        .attr('stroke', '#ccc')
        .attr('stroke-width', 1.5)
        .attr('d', d3.linkVertical<d3.HierarchyLink<TreeNode>, d3.HierarchyPointNode<TreeNode>>()
          .x(d => d.x)
          .y(d => d.y));

      const node = g.selectAll('.node')
        .data(nodes)
        .enter().append('g')
        .attr('class', 'node')
        .attr('transform', d => `translate(${d.x},${d.y})`);

      const text = node.append('text')
        .attr('fill', () => isDarkMode ? '#E0E0E0' : '#333333')
        .attr('text-anchor', 'middle')
        .attr('dy', '0.35em')
        .style('font-weight', 'bold')
        .text(d => d.data.text || d.data.name);

      text.each(function(d) {
        const bbox = this.getBBox();
        d.data.width = bbox.width + 10;
        d.data.height = bbox.height + 10;
      });

      node.insert('rect', 'text')
        .attr('x', d => -(d.data.width || 0) / 2)
        .attr('y', d => -(d.data.height || 0) / 2)
        .attr('width', d => d.data.width || 0)
        .attr('height', d => d.data.height || 0)
        .attr('fill', () => isDarkMode ? '#555555' : '#F0F0F0')
        .attr('stroke', () => isDarkMode ? '#88CCFF' : '#666666')
        .attr('stroke-width', 1.5)
        .attr('rx', 5)
        .attr('ry', 5);

      text.attr('x', 0).attr('y', 0);
    };

    // Initial Draw and Centering
    const { width, height } = containerRef.current.getBoundingClientRect();
    svgElement.attr('width', width).attr('height', height);
    drawChartContent();
    const margin = { top: 20, right: 90, bottom: 30, left: 90 };
    const initialTransform = d3.zoomIdentity.translate(width / 2, margin.top);
    svgElement.call(zoom.transform, initialTransform);

    // Resize Handling
    const resizeObserver = new ResizeObserver(entries => {
      if (!entries || entries.length === 0) return;
      const { width, height } = entries[0].contentRect;
      svgElement.attr('width', width).attr('height', height);
      // On resize, we only redraw the content. We DO NOT reset the zoom transform.
      drawChartContent();
    });

    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, [data, isDarkMode]);


  return (
    <div ref={containerRef} style={{ overflow: 'auto', width: '100%', height: '100%' }}>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default D3ParseTree;
