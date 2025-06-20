import React, { useState, useEffect } from 'react';
import './App.css';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import EditorPanel from './components/EditorPanel';
import ParseTree from './components/ParseTree';

const App: React.FC = () => {
  // 示例语法（简单算术表达式）
  const exampleGrammar = `grammar Expr;
prog: expr EOF;
expr: expr ('*'|'/') expr
     | expr ('+'|'-') expr
     | INT
     | '(' expr ')'
     ;
INT: [0-9]+;
WS: [ \\t\\r\\n]+ -> skip;`;

  // 示例输入文本
  const exampleInput = '1+2*3';

  const [grammar, setGrammar] = useState<string>(exampleGrammar);
  const [input, setInput] = useState<string>(exampleInput);
  const [parseTree, setParseTree] = useState<any>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [worker, setWorker] = useState<Worker | null>(null);
  
  // 初始化Worker
  useEffect(() => {
    const newWorker = new Worker(new URL('@/workers/parserWorker', import.meta.url), {
      type: 'module'
    });
    
    newWorker.onmessage = (e) => {
      if (e.data.type === 'PARSE_RESULT') {
        setParseTree(e.data.tree);
        setErrors([]);
      } else if (e.data.type === 'PARSER_ERROR' || e.data.type === 'PARSE_ERROR') {
        setErrors([e.data.error]);
      }
    };
    
    setWorker(newWorker);
    
    return () => {
      newWorker.terminate();
    };
  }, []);
  
  const handleParse = () => {
    if (!worker) {
      setErrors(['Worker未初始化']);
      return;
    }
    
    if (!grammar.trim()) {
      setErrors(['请提供语法']);
      return;
    }
    
    // 先加载解析器
    worker.postMessage({
      type: 'LOAD_PARSER',
      grammar
    });
    
    setErrors(['正在加载解析器...']);
  };
  
  // 处理解析器加载完成
  useEffect(() => {
    if (!worker) return;
    
    const handleParserReady = () => {
      // 解析器加载完成后解析输入
      worker.postMessage({
        type: 'PARSE_INPUT',
        input
      });
    };
    
    worker.addEventListener('message', (e) => {
      if (e.data.type === 'PARSER_READY') {
        handleParserReady();
      }
    });
    
    return () => {
      worker.removeEventListener('message', handleParserReady);
    };
  }, [worker, input]);
  
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
              <button onClick={handleParse}>解析</button>
            </div>
            {errors.length > 0 && (
              <div className="error-panel">
                {errors.map((error, i) => (
                  <div key={i} className="error-message">{error}</div>
                ))}
              </div>
            )}
            <ParseTree data={parseTree} />
          </div>
        </Panel>
      </PanelGroup>
    </div>
  );
};

export default App;
