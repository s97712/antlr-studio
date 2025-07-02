import React, { useState, useEffect } from 'react';
import './App.css';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import EditorPanel from './components/EditorPanel';
import D3ParseTree from './grammar/components/D3ParseTree';
import type { TreeNode } from './grammar/parser/treeConverter';
import { useDarkMode } from './hooks/useDarkMode'; // 导入自定义 Hook
import {
  fetchGrammarList,
  loadGrammarContents,
  runParser,
  type GrammarInfo
} from './services/grammarService'; // 导入服务

const App: React.FC = () => {
  const [lexerGrammar, setLexerGrammar] = useState<string>('');
  const [parserGrammar, setParserGrammar] = useState<string>('');
  const [input, setInput] = useState<string>('');
  const [visualTree, setVisualTree] = useState<TreeNode | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [grammarsList, setGrammarsList] = useState<GrammarInfo[]>([]);
  const [selectedGrammar, setSelectedGrammar] = useState<string>('');
  const [isDarkMode, toggleDarkMode] = useDarkMode(); // 使用自定义 Hook

  const handleSelectGrammar = async (grammarName: string) => {
    const grammarInfo = grammarsList.find(g => g.name === grammarName);
    if (!grammarInfo) return;

    try {
      const { parserContent, lexerContent, inputContent } = await loadGrammarContents(grammarInfo);
      setParserGrammar(parserContent);
      setLexerGrammar(lexerContent);
      setInput(inputContent);
      setSelectedGrammar(grammarInfo.name);
      setVisualTree(null);
      setErrors([]);
    } catch (error) {
      console.error("加载预置语法失败:", error);
      setErrors([`加载预置语法 '${grammarInfo.name}' 失败`]);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const data = await fetchGrammarList();
        setGrammarsList(data);
        if (data.length > 0) {
          await handleSelectGrammar(data[0].name);
        }
      } catch (error) {
        console.error("获取语法索引失败:", error);
        setErrors(["获取语法索引失败: " + (error instanceof Error ? error.message : String(error))]);
      }
    };
    init();
  }, []); // 依赖项为空，仅在初次渲染时执行

  const handleParse = async () => {
    if (!parserGrammar.trim()) {
      setErrors(['Parser 语法不能为空']);
      return;
    }
    setVisualTree(null);
    setErrors([]);
    
    try {
      const selectedGrammarInfo = grammarsList.find(g => g.name === selectedGrammar);
      if (!selectedGrammarInfo?.startRule || !selectedGrammarInfo.mainGrammar) {
        setErrors([`语法 "${selectedGrammarInfo?.name}" 未定义入口规则或主语法文件。`]);
        return;
      }

      const grammars = [{ fileName: selectedGrammarInfo.parser.split('/').pop()!, content: parserGrammar }];
      if (lexerGrammar.trim() && selectedGrammarInfo.lexer) {
          grammars.push({ fileName: selectedGrammarInfo.lexer.split('/').pop()!, content: lexerGrammar });
      }

      const vt = await runParser(grammars, input, selectedGrammarInfo.mainGrammar, selectedGrammarInfo.startRule);
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
                onChange={(e) => handleSelectGrammar(e.target.value)}
              >
                {grammarsList.map(g => (
                  <option key={g.name} value={g.name}>{g.name}</option>
                ))}
              </select>
              <button onClick={handleParse} data-testid="parse-button">解析</button>
              <button onClick={toggleDarkMode}>
                切换到 {isDarkMode ? '亮色模式' : '暗色模式'}
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
                  <D3ParseTree data={visualTree} isDarkMode={isDarkMode} />
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
