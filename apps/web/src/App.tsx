import React, { useState } from 'react';
import './App.css';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import EditorPanel from './components/EditorPanel';
import ParseTree from './grammar/components/ParseTree';

import { parseInput } from './grammar/parser/parser';
import { convertTree } from './grammar/parser/treeConverter';
import { EXAMPLE_GRAMMAR, EXAMPLE_INPUT } from './constants';

const App: React.FC = () => {
  // 示例语法（简单算术表达式）
  const exampleGrammar = EXAMPLE_GRAMMAR;

  // 示例输入文本
  const exampleInput = EXAMPLE_INPUT;

  const [grammar, setGrammar] = useState<string>(exampleGrammar);
  const [input, setInput] = useState<string>(exampleInput);
  const [visualTree, setVisualTree] = useState<TreeNode | null>(null); // 新增状态：可视化树
  const [errors, setErrors] = useState<string[]>([]);
  const handleParse = async () => {
    if (!grammar.trim()) {
      setErrors(['请提供语法']);
      return;
    }
    setVisualTree(null); // 重置可视化树
    setErrors([]); // 清空错误
    
    try {
      const tree = await parseInput(grammar, input);
      
      // 转换解析树为可视化格式
      const vt = convertTree(tree.tree);
      setVisualTree(vt);
    } catch (error) {
      console.error('解析失败:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      setErrors([errorMessage]);
    }
  };
  
  return (
    <div className="app-container">
      <PanelGroup direction="vertical">
        {/* 顶部面板组：语法和输入编辑器 */}
        <Panel defaultSize={60} minSize={30}>
          <PanelGroup direction="horizontal">
            {/* 语法编辑器 */}
            <Panel defaultSize={50} minSize={20}>
              <div className="editor-container">
                <h3>ANTLR 语法</h3>
                <EditorPanel
                  value={grammar}
                  onChange={setGrammar}
                  language="antlr"
                />
              </div>
            </Panel>
            
            <PanelResizeHandle className="resize-handle" />
            
            {/* 输入文本编辑器 */}
            <Panel defaultSize={50} minSize={20}>
              <div className="editor-container">
                <h3>输入文本</h3>
                <EditorPanel
                  value={input}
                  onChange={setInput}
                  language="text"
                />
              </div>
            </Panel>
          </PanelGroup>
        </Panel>
        
        <PanelResizeHandle className="resize-handle" />
        
        {/* 底部面板：解析树可视化和错误信息 */}
        <Panel defaultSize={40} minSize={20}>
          <div className="visualization-container">
            <div className="toolbar">
              <button onClick={handleParse} data-testid="parse-button">解析</button>
            </div>
            {errors.length > 0 && (
              <div className="error-panel">
                {errors.map((error, i) => (
                  <div key={i} className="error-message">
                    {error}
                  </div>
                ))}
              </div>
            )}
            <div data-testid="parse-tree-container">
              {visualTree ? <ParseTree data={visualTree} /> : <div>解析树加载中...</div>}
            </div>
          </div>
        </Panel>
      </PanelGroup>
    </div>
  );
};

export default App;

