import React, { useRef, useEffect, useCallback } from 'react';
import * as d3 from 'd3';
import { flextree } from 'd3-flextree';
import type { FlextreeNode } from 'd3-flextree';
import type { TreeNode } from '../parser/treeConverter';

interface CanvasParseTreeProps {
  data: TreeNode;
  isDarkMode: boolean;
}

const CanvasParseTree: React.FC<CanvasParseTreeProps> = ({ data, isDarkMode }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const quadtreeRef = useRef<d3.Quadtree<FlextreeNode<TreeNode>> | null>(null);
  const zoomRef = useRef<d3.ZoomBehavior<HTMLDivElement, unknown> | null>(null);
  const hasFocusedRef = useRef(false);
  const lastTransformRef = useRef<d3.ZoomTransform>(d3.zoomIdentity);

  const draw = useCallback((transform: d3.ZoomTransform) => {
    if (!canvasRef.current || !data) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    const { width, height } = canvas.getBoundingClientRect();
    const devicePixelRatio = window.devicePixelRatio || 1;
    canvas.width = width * devicePixelRatio;
    canvas.height = height * devicePixelRatio;
    
    context.save();
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.scale(devicePixelRatio, devicePixelRatio);
    context.translate(transform.x, transform.y);
    context.scale(transform.k, transform.k);

    const hierarchy = d3.hierarchy(data);
    hierarchy.each(d => {
        context.font = 'bold 10px sans-serif'; // Smaller font
        const metrics = context.measureText(d.data.render);
        d.data.width = metrics.width + 10; // Less padding
        d.data.height = 16 + 4; // Smaller height
    });

    const treeLayout = flextree<TreeNode>({
      nodeSize: node => [node.data.width, node.data.height + 10], // Less spacing
      spacing: 20,
    })(hierarchy);
    
    const nodes = treeLayout.descendants();
    const links = treeLayout.links();

    quadtreeRef.current = d3.quadtree<FlextreeNode<TreeNode>>()
        .x(d => d.x)
        .y(d => d.y)
        .addAll(nodes);

    context.strokeStyle = isDarkMode ? '#4A5568' : '#A0AEC0';
    context.beginPath();
    links.forEach(link => {
        const source = link.source as FlextreeNode<TreeNode>;
        const target = link.target as FlextreeNode<TreeNode>;
        context.moveTo(source.x, source.y);
        context.lineTo(target.x, target.y);
    });
    context.stroke();

    nodes.forEach(node => {
        context.fillStyle = isDarkMode ? '#2D3748' : '#F7FAFC';
        if (node.data.type === 'Terminal') {
            context.fillStyle = isDarkMode ? '#4A5568' : '#E2E8F0';
        }
        context.strokeStyle = isDarkMode ? '#4A5568' : '#A0AEC0';
        
        const rectWidth = node.data.width;
        const rectHeight = node.data.height;
        const x = node.x - rectWidth / 2;
        const y = node.y - rectHeight / 2;

        context.beginPath();
        if (context.roundRect) {
            context.roundRect(x, y, rectWidth, rectHeight, 5);
        } else {
            const r = 5;
            context.moveTo(x + r, y);
            context.arcTo(x + rectWidth, y, x + rectWidth, y + rectHeight, r);
            context.arcTo(x + rectWidth, y + rectHeight, x, y + rectHeight, r);
            context.arcTo(x, y + rectHeight, x, y, r);
            context.arcTo(x, y, x + rectWidth, y, r);
            context.closePath();
        }
        context.fill();
        context.stroke();

        context.fillStyle = isDarkMode ? '#E2E8F0' : '#2D3748';
        context.font = 'bold 10px sans-serif'; // Smaller font
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(node.data.render, node.x, node.y);
    });

    context.restore();
  }, [data, isDarkMode]);

  useEffect(() => {
    if (!containerRef.current) return;

    const zoom = d3.zoom<HTMLDivElement, unknown>()
      .scaleExtent([0.1, 8])
      .on('zoom', (event) => {
        lastTransformRef.current = event.transform;
        draw(event.transform);
      });

    zoomRef.current = zoom;
    d3.select(containerRef.current).call(zoom);

    // Initial draw
    draw(lastTransformRef.current);

    return () => {
      d3.select(containerRef.current).on('.zoom', null);
    };
  }, [draw]);

  const focusOnNode = useCallback((nodeToFocus: FlextreeNode<TreeNode>) => {
    if (!containerRef.current || !zoomRef.current) return;
    const { width, height } = containerRef.current.getBoundingClientRect();
    
    const newTransform = d3.zoomIdentity
      .translate(width / 2, height * 0.2)
      .scale(1.2)
      .translate(-nodeToFocus.x, -nodeToFocus.y);

    d3.select(containerRef.current)
      .transition()
      .duration(250)
      .call(zoomRef.current.transform, newTransform);
  }, []);

  useEffect(() => {
    if (!data || hasFocusedRef.current) {
        draw(lastTransformRef.current);
        return;
    };
    const hierarchy = d3.hierarchy(data);
    const treeLayout = flextree<TreeNode>({
        nodeSize: node => [20, 30], // Placeholder size, won't be used for drawing
        spacing: 20,
    })(hierarchy);
    const rootNode = treeLayout.descendants()[0];
    if (rootNode) {
        focusOnNode(rootNode);
        hasFocusedRef.current = true;
    }
  }, [data, focusOnNode, draw]);

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100%', position: 'relative', background: isDarkMode ? '#1A202C' : '#FFFFFF' }}
      aria-label="解析树容器"
    >
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%" }}
        onClick={(event) => {
          if (!quadtreeRef.current || !lastTransformRef.current) return;
          const { left, top } = event.currentTarget.getBoundingClientRect();
          const mouseX = event.clientX - left;
          const mouseY = event.clientY - top;
          const [dataX, dataY] = lastTransformRef.current.invert([mouseX, mouseY]);
          const closest = quadtreeRef.current.find(dataX, dataY);
          if (closest) {
            const nodeWidth = closest.data.width;
            const nodeHeight = closest.data.height;
            const x0 = closest.x - nodeWidth / 2;
            const x1 = closest.x + nodeWidth / 2;
            const y0 = closest.y - nodeHeight / 2;
            const y1 = closest.y + nodeHeight / 2;

            if (dataX >= x0 && dataX <= x1 && dataY >= y0 && dataY <= y1) {
              focusOnNode(closest);
            }
          }
        }}
      />
    </div>
  );
};

export default CanvasParseTree;