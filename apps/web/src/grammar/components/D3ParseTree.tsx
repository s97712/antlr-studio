import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { flextree } from 'd3-flextree';
import type { FlextreeNode } from 'd3-flextree';
import type { TreeNode } from '../parser/treeConverter';

interface D3ParseTreeProps {
  data: TreeNode;
  isDarkMode: boolean;
}

const D3ParseTree: React.FC<D3ParseTreeProps> = ({ data, isDarkMode }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const gRef = useRef<SVGGElement | null>(null);
  const zoomRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);
  // 1. Initialization Effect (runs only once)
  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    gRef.current = svg.append('g').node();
    const g = d3.select(gRef.current);

    // Setup the zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 8])
      .on('zoom', (event) => {
        // Apply the zoom transform to the <g> element
        g.attr('transform', event.transform);
      });

    // Attach the zoom behavior to the SVG
    svg.call(zoom);
    // Store the zoom behavior in a ref so we can call it programmatically
    zoomRef.current = zoom;

    return () => {
      // Clean up D3 elements to prevent memory leaks
      if (gRef.current) {
        d3.select(gRef.current).selectAll('*').remove();
      }
      if (svgRef.current) {
        // Remove the zoom event listener
        d3.select(svgRef.current).on('.zoom', null);
      }
    };
  }, []);

  // 2. Data Update and Rendering Effect
  const hasFocusedRef = useRef(false);

  useEffect(() => {
    // Reset the focus flag whenever new data arrives
    hasFocusedRef.current = false;
    if (!data || !gRef.current || !svgRef.current || !zoomRef.current) return;

    const svg = d3.select(svgRef.current);
    const g = d3.select(gRef.current);
    const zoom = zoomRef.current;
    g.selectAll('*').remove(); // Clear previous drawing

    /**
     * Programmatically focuses and zooms on a specific node.
     * This function triggers a zoom transition on the main SVG element.
     * By calling `zoom.transform`, we ensure that D3's internal zoom state
     * is updated along with the visual transition. This prevents the "jump"
     * effect that occurs when manually setting the transform on the <g> element.
     * @param d The flextree node to focus on.
     */
    const focusOnNode = (d: FlextreeNode<TreeNode>) => {
      if (!svg.node() || !zoom) return;

      const { width, height } = svg.node()!.getBoundingClientRect();
      
      const newTransform = d3.zoomIdentity
        .translate(width / 2, height * 0.2) // Center horizontally, position at 20% from top
        .scale(1) // Zoom in
        .translate(-d.x, -d.y); // Pan to the node's coordinates

      // Apply the transform via a smooth transition.
      // This is the key change: we call `zoom.transform` on the SVG selection
      // within a transition, which keeps the zoom behavior's state synchronized.
      svg.transition()
        .duration(200)
        .call(zoom.transform, newTransform);
    };

    // --- Create text elements to measure their size for the layout ---
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

    // --- Use flextree for layout calculation ---
    const treeLayout = flextree<TreeNode>({
      nodeSize: node => [node.data.width, node.data.height + 20],
      spacing: 20,
    });
    
    const root = treeLayout(hierarchy);
    const nodes = root.descendants();
    const links = root.links();

    // --- Draw links (the lines between nodes) ---
    g.selectAll('.link')
      .data(links)
      .enter().append('path')
      .attr('class', 'link')
      .attr('fill', 'none')
      .attr('d', d3.linkVertical<d3.HierarchyLink<TreeNode>, FlextreeNode<TreeNode>>()
          .x(d => d.x)
          .y(d => d.y)
      );

    // --- Draw nodes (the rectangles and text) ---
    const node = g.selectAll('.node')
      .data(nodes)
      .enter().append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x},${d.y})`)
      .style('cursor', 'pointer')
      .on('click', (event, d) => {
        // On click, focus on the clicked node
        focusOnNode(d);
      });

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
    g.selectAll('.link').attr('stroke', isDarkMode ? '#4A5568' : '#A0AEC0');
    node.selectAll('rect')
        .attr('fill', (d: any) => {
            if (d.data.type === 'Terminal') {
                return isDarkMode ? '#4A5568' : '#E2E8F0'; // Lighter color for terminals
            }
            return isDarkMode ? '#2D3748' : '#F7FAFC'; // Original color for rules
        })
        .attr('stroke', isDarkMode ? '#4A5568' : '#A0AEC0');
    node.selectAll('text').attr('fill', isDarkMode ? '#E2E8F0' : '#2D3748');

    // --- Initial View: Auto-focus or Centering ---
    const { width, height } = svgRef.current.getBoundingClientRect();
    const bounds = g.node()?.getBBox();
    if (bounds) {
      // --- Initial Auto-focus on Root Node ---
      if (data && !hasFocusedRef.current) {
        const rootNode = nodes.find(node => node.data === data);
        if (rootNode) {
          focusOnNode(rootNode);
          hasFocusedRef.current = true;
        }
      } else if (!hasFocusedRef.current) {
        // --- Fallback to Centering the Whole Tree ---
        const fullWidth = bounds.width;
        const fullHeight = bounds.height;
        const scale = Math.min(width / fullWidth, height / fullHeight) * 0.95;
        const initialTransform = d3.zoomIdentity
          .translate(width / 2 - (bounds.x + fullWidth / 2) * scale, height / 2 - (bounds.y + fullHeight / 2) * scale)
          .scale(scale);
        
        // Use call to set the initial transform without transition
        svg.call(zoom.transform, initialTransform);
      }
    }
  }, [data]);

  // 3. Theme Update Effect
  useEffect(() => {
    if (!gRef.current) return;
    const g = d3.select(gRef.current);

    // Only update colors, no re-layout
    g.selectAll('.link')
      .attr('stroke', isDarkMode ? '#4A5568' : '#A0AEC0');
      
    g.selectAll('.node rect')
      .attr('fill', (d: any) => { // Correctly update fill based on node type
          if (d.data.type === 'Terminal') {
              return isDarkMode ? '#4A5568' : '#E2E8F0';
          }
          return isDarkMode ? '#2D3748' : '#F7FAFC';
      })
      .attr('stroke', isDarkMode ? '#4A5568' : '#A0AEC0');
      
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

