import React, { useState, useEffect } from 'react';
import './App.css';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import EditorPanel from './components/EditorPanel';
import ParseTree from './grammar/components/ParseTree';
import D3ParseTree from './grammar/components/D3ParseTree';
import type { TreeNode } from './grammar/parser/treeConverter';

import { parseInput } from './grammar/parser/parser';
import { convertTree } from './grammar/parser/treeConverter';

interface GrammarInfo {
  name: string;
  lexer?: string;
  parser: string;
  input?: string;
  startRule?: string;
  mainGrammar?: string;
}

const App: React.FC = () => {
  const [lexerGrammar, setLexerGrammar] = useState<string>('');
  const [parserGrammar, setParserGrammar] = useState<string>('');
  const [input, setInput] = useState<string>('');
  const [visualTree, setVisualTree] = useState<TreeNode | null>(null);
  const [initialFocusNode, setInitialFocusNode] = useState<TreeNode | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [renderer, setRenderer] = useState<'original' | 'd3'>('d3');
  const [grammarsList, setGrammarsList] = useState<GrammarInfo[]>([]);
  const [selectedGrammar, setSelectedGrammar] = useState<string>('');

  const loadGrammarContents = async (grammarInfo: GrammarInfo) => {
    try {
      const { name, lexer, parser, input } = grammarInfo;
      const basePath = `/pre-filled-grammars/`;

      const fetchPromises = [
        parser ? fetch(`${basePath}${parser}`).then(res => res.text()) : Promise.resolve(''),
        lexer ? fetch(`${basePath}${lexer}`).then(res => res.text()) : Promise.resolve(''),
        input ? fetch(`${basePath}${input}`).then(res => res.text()) : Promise.resolve('')
      ];
      
      const [parserContent, lexerContent, inputContent] = await Promise.all(fetchPromises);
      
      setParserGrammar(parserContent);
      setLexerGrammar(lexerContent);
      setInput(inputContent);
      setSelectedGrammar(name);
      setVisualTree(null);
      setErrors([]);
    } catch (error) {
      console.error("加载预置语法失败:", error);
      setErrors([`加载预置语法 '${grammarInfo.name}' 失败`]);
    }
  };

  useEffect(() => {
    const fetchGrammarIndex = async () => {
      try {
        const response = await fetch('/pre-filled-grammars/index.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: GrammarInfo[] = await response.json();
        setGrammarsList(data);
        if (data.length > 0) {
          setSelectedGrammar(data[0].name);
          loadGrammarContents(data[0]);
        }
      } catch (error) {
        console.error("获取语法索引失败:", error);
        setErrors(["获取语法索引失败: " + (error instanceof Error ? error.message : String(error))]);
      }
    };
    fetchGrammarIndex();
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const handleParse = async () => {
    if (!parserGrammar.trim()) {
      setErrors(['Parser 语法不能为空']);
      return;
    }
    setVisualTree(null);
    setInitialFocusNode(null); // Reset focus node on each parse
    setErrors([]);
    
    try {
      const selectedGrammarInfo = grammarsList.find(g => g.name === selectedGrammar);
      if (!selectedGrammarInfo) {
        setErrors(['未找到选定的语法信息']);
        return;
      }

      if (!selectedGrammarInfo.startRule) {
        setErrors([`语法 "${selectedGrammarInfo.name}" 未定义入口规则 (startRule)。`]);
        return;
      }

      const grammars = [{ fileName: selectedGrammarInfo.parser.split('/').pop()!, content: parserGrammar }];
      if (lexerGrammar.trim() && selectedGrammarInfo.lexer) {
          grammars.push({ fileName: selectedGrammarInfo.lexer.split('/').pop()!, content: lexerGrammar });
      }

      if (!selectedGrammarInfo.mainGrammar) {
        setErrors([`语法 "${selectedGrammarInfo.name}" 未定义主语法文件 (mainGrammar)。`]);
        return;
      }

      const tree = await parseInput(grammars, input, selectedGrammarInfo.mainGrammar, selectedGrammarInfo.startRule);
      
      const vt = convertTree(tree.tree);
      setVisualTree(vt);
      setInitialFocusNode(vt); // Set the root of the new tree as the initial focus
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
            <Panel defaultSize={33.3} minSize={20}>
               <PanelGroup direction="horizontal">
                <Panel defaultSize={50} minSize={20}>
                  <div className="editor-container">
                    <h3>Lexer Grammar</h3>
                    <EditorPanel
                      value={lexerGrammar}
                      onChange={setLexerGrammar}
                      language="antlr"
                      isDarkMode={isDarkMode}
                    />
                  </div>
                </Panel>
              </PanelGroup>
            </Panel>
            
            <PanelResizeHandle className="resize-handle" />
            <Panel defaultSize={33.3} minSize={20}>
                  <div className="editor-container">
                    <h3>Parser Grammar</h3>
                    <EditorPanel
                      value={parserGrammar}
                      onChange={setParserGrammar}
                      language="antlr"
                      isDarkMode={isDarkMode}
                    />
                  </div>
                </Panel>
            <PanelResizeHandle className="resize-handle" />
            
            {/* 输入文本编辑器 */}
            <Panel defaultSize={33.3} minSize={20}>
              <div className="editor-container">
                <h3>Input Text</h3>
                <EditorPanel
                  value={input}
                  onChange={setInput}
                  language="text"
                  isDarkMode={isDarkMode}
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
              <select
                value={selectedGrammar}
                onChange={(e) => {
                  const selected = grammarsList.find(g => g.name === e.target.value);
                  if (selected) {
                    loadGrammarContents(selected);
                  }
                }}
              >
                {grammarsList.map(g => (
                  <option key={g.name} value={g.name}>{g.name}</option>
                ))}
              </select>
              <button onClick={handleParse} data-testid="parse-button">解析</button>
              <button onClick={toggleDarkMode}>
                切换到 {isDarkMode ? '亮色模式' : '暗色模式'}
              </button>
              <button onClick={() => setRenderer(renderer === 'original' ? 'd3' : 'original')}>
                切换到 {renderer === 'original' ? 'D3 树' : '原始树'}
              </button>
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
            <div data-testid="parse-tree-container" style={{ flex: 1, height: 0 }} >
              {visualTree ? (
                renderer === 'original' ? (
                  <ParseTree data={visualTree} />
                ) : (
                  <D3ParseTree data={visualTree} isDarkMode={isDarkMode} initialFocusNode={initialFocusNode} />
                )
              ) : (
                <div>解析树加载中...</div>
              )}
            </div>
          </div>
        </Panel>
      </PanelGroup>
    </div>
  );
};

export default App;
