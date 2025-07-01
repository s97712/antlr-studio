import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { flextree } from 'd3-flextree';
import type { FlextreeNode } from 'd3-flextree';
import type { TreeNode } from '../parser/treeConverter';

interface D3ParseTreeProps {
  data: TreeNode;
  initialFocusNode?: TreeNode | null;
  isDarkMode: boolean;
}

const D3ParseTree: React.FC<D3ParseTreeProps> = ({ data, isDarkMode, initialFocusNode }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const gRef = useRef<SVGGElement | null>(null);
  const zoomRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);
  // const width = 800;
  // const height = 600;

  // 1. Initialization Effect (runs only once)
  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    gRef.current = svg.append('g').node();
    const g = d3.select(gRef.current);

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 8])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);
    zoomRef.current = zoom;

    return () => {
      // Clean up D3 elements to prevent memory leaks
      if (gRef.current) {
        d3.select(gRef.current).selectAll('*').remove();
      }
      if (svgRef.current) {
        d3.select(svgRef.current).on('.zoom', null);
      }
    };
  }, []);

  // 2. Data Update Effect
  const hasFocusedRef = useRef(false);

  useEffect(() => {
    // Reset the focus flag whenever new data arrives
    hasFocusedRef.current = false;
    if (!data || !gRef.current || !svgRef.current || !zoomRef.current) return;

    const g = d3.select(gRef.current);
    g.selectAll('*').remove(); // Clear previous drawing

    // --- Create text elements to measure them ---
    const tempTextGroup = g.append('g').attr('class', 'temp-texts').style('opacity', 0);
    const hierarchy = d3.hierarchy(data);
    hierarchy.each(d => {
        const textNode = tempTextGroup.append('text')
            .text((d.data.render))
            .style('font-weight', 'bold')
            .style('font-size', '12px')
            .node();
            
        if (textNode) {
          const bbox = textNode.getBBox();
          d.data.width = bbox.width + 10;
          d.data.height = bbox.height + 10;
        }
    });
    tempTextGroup.remove(); // Clean up temporary elements

    // --- Use flextree for layout ---
    const treeLayout = flextree<TreeNode>({
      nodeSize: node => [node.data.width, node.data.height + 20],
      spacing: 20,
    });
    
    const root = treeLayout(hierarchy);
    const nodes = root.descendants();
    const links = root.links();

    // --- Draw links ---
    g.selectAll('.link')
      .data(links)
      .enter().append('path')
      .attr('class', 'link')
      .attr('fill', 'none')
      .attr('d', d3.linkVertical<d3.HierarchyLink<TreeNode>, FlextreeNode<TreeNode>>()
          .x(d => d.x)
          .y(d => d.y)
      );

    // --- Draw nodes ---
    const node = g.selectAll('.node')
      .data(nodes)
      .enter().append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x},${d.y})`)
      .style('cursor', 'pointer') // Add cursor style
      // --- Node Focus and Zoom Feature ---
      .on('click', (event, d) => {
        const svg = d3.select(svgRef.current);
        const zoom = zoomRef.current;
        if (!zoom) return;

        const { width, height } = svg.node()!.getBoundingClientRect();
        
        const newTransform = d3.zoomIdentity
          .translate(width / 2, height * 0.2) // Focus node towards the top (20% from the top)
          .scale(1.5)
          .translate(-d.x, -d.y);

        g.transition()
          .duration(300)
          .attr('transform', newTransform.toString());
      });
      // --- End of Node Focus and Zoom Feature ---

    node.append('rect')
      .attr('x', d => -(d.data.width) / 2)
      .attr('y', d => -(d.data.height) / 2)
      .attr('width', d => d.data.width)
      .attr('height', d => d.data.height)
      .attr('rx', 5)
      .attr('ry', 5);

    node.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .style('font-weight', 'bold')
      .style('font-size', '12px')
      .text(d => (d.data.render));

    // --- Apply colors based on theme ---
    g.selectAll('.link').attr('stroke', isDarkMode ? '#4A5568' : '#CBD5E0');
    node.selectAll('rect')
        .attr('fill', (d: any) => { // Explicitly type d to resolve TS error
            if (d.data.type === 'Terminal') {
                return isDarkMode ? '#4A5568' : '#E2E8F0'; // Lighter color for terminals
            }
            return isDarkMode ? '#2D3748' : '#F7FAFC'; // Original color for rules
        })
        .attr('stroke', isDarkMode ? '#4A5568' : '#E2E8F0');
    node.selectAll('text').attr('fill', isDarkMode ? '#E2E8F0' : '#2D3748');

    // --- Center the tree ---
    const { width, height } = svgRef.current.getBoundingClientRect();
    const bounds = g.node()?.getBBox();
    if (bounds) {
      // --- Initial Auto-focus Logic ---
      if (initialFocusNode && !hasFocusedRef.current) {
        // Find the focus node within the laid-out nodes array to ensure x/y are defined.
        const focusNode = nodes.find(node => node.data === initialFocusNode);
        if (focusNode) {
          const { width, height } = svgRef.current.getBoundingClientRect();
          const newTransform = d3.zoomIdentity
            .translate(width / 2, height * 0.2)
            .scale(1.5)
            .translate(-focusNode.x, -focusNode.y);
          
          const svg = d3.select(svgRef.current);
          svg.transition()
             .duration(300)
             .call(zoomRef.current.transform, newTransform);
          
          hasFocusedRef.current = true;
        }
      } else if (!hasFocusedRef.current) {
        // Fallback to centering the whole tree if no specific node is targeted
        const fullWidth = bounds.width;
        const fullHeight = bounds.height;
        const scale = Math.min(width / fullWidth, height / fullHeight) * 0.95;
        const initialTransform = d3.zoomIdentity
          .translate(width / 2 - (bounds.x + fullWidth / 2) * scale, height / 2 - (bounds.y + fullHeight / 2) * scale)
          .scale(scale);
        
        const svg = d3.select(svgRef.current);
        svg.call(zoomRef.current.transform, initialTransform);
      }
    }
  }, [data]);

  // 3. Theme Update Effect
  useEffect(() => {
    if (!gRef.current) return;
    const g = d3.select(gRef.current);

    // Only update colors, no re-layout
    g.selectAll('.link')
      .attr('stroke', isDarkMode ? '#4A5568' : '#CBD5E0');
      
    g.selectAll('.node rect')
      .attr('fill', isDarkMode ? '#2D3748' : '#F7FAFC')
      .attr('stroke', isDarkMode ? '#4A5568' : '#E2E8F0');
      
    g.selectAll('.node text')
      .attr('fill', isDarkMode ? '#E2E8F0' : '#2D3748');

  }, [isDarkMode]);

  return (
    <div style={{ width: '100%', height: '100%', background: isDarkMode ? '#1A202C' : '#FFFFFF' }}>
      <svg ref={svgRef} style={{ width: "100%", height: "100%" }}></svg>
    </div>
  );
};

export default D3ParseTree;

