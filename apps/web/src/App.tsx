import React, { useState, useEffect } from 'react';
import './App.css';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import EditorPanel from './components/EditorPanel';
import D3ParseTree from './grammar/components/D3ParseTree';
import CanvasParseTree from './grammar/components/CanvasParseTree';
import type { TreeNode } from './grammar/parser/treeConverter';
import { useDarkMode } from './hooks/useDarkMode';
import SearchableSelect from './components/SearchableSelect';
import {
  fetchGrammarList,
  loadGrammarContents,
  runParser,
  type GrammarInfo,
  type GrammarFiles
} from './services/grammarService';

type UIState = 'INITIAL_LOADING' | 'IDLE' | 'PARSING' | 'LOADING_GRAMMAR';

const App: React.FC = () => {
  const [lexerGrammar, setLexerGrammar] = useState<string>('');
  const [parserGrammar, setParserGrammar] = useState<string>('');
  const [input, setInput] = useState<string>('');
  const [visualTree, setVisualTree] = useState<TreeNode | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [grammarsList, setGrammarsList] = useState<GrammarInfo[]>([]);
  const [selectedGrammar, setSelectedGrammar] = useState<string>('');
  const [isDarkMode, toggleDarkMode] = useDarkMode();
  const [renderMode, setRenderMode] = useState<'svg' | 'canvas'>('canvas');
  const [uiState, setUiState] = useState<UIState>('INITIAL_LOADING');
  const [startRule, setStartRule] = useState<string>('');
  const [currentGrammarFiles, setCurrentGrammarFiles] = useState<GrammarFiles | null>(null);

  const handleSelectGrammar = (grammarInfo: GrammarInfo | undefined) => {
    if (!grammarInfo) return;

    // Immediately update the selected grammar to reflect in the UI
    setSelectedGrammar(grammarInfo.name);
    setUiState('LOADING_GRAMMAR');

    // Fetch and update the rest of the state asynchronously
    loadGrammarContents(grammarInfo).then(files => {
      setCurrentGrammarFiles(files);
      setParserGrammar(files.parserContent);
      setLexerGrammar(files.lexerContent);
      setInput(files.inputContent);
      setStartRule(grammarInfo.start || '');
      setVisualTree(null);
      setErrors([]);
      setUiState('IDLE');
    }).catch(error => {
      console.error("加载预置语法失败:", error);
      setErrors([`加载预置语法 '${grammarInfo.name}' 失败`]);
      setUiState('IDLE');
    });
  };

  useEffect(() => {
    const init = async () => {
      try {
        const data = await fetchGrammarList();
        setGrammarsList(data);
        if (data.length > 0) {
          await handleSelectGrammar(data[0]);
        }
      } catch (error) {
        console.error("获取语法索引失败:", error);
        setErrors(["获取语法索引失败: " + (error instanceof Error ? error.message : String(error))]);
      } finally {
        setUiState('IDLE');
      }
    };
    init();
  }, []);

  const handleParse = async () => {
    if (!parserGrammar.trim() && !lexerGrammar.trim()) {
      setErrors(['Parser and Lexer grammars cannot both be empty.']);
      return;
    }
    if (!startRule.trim()) {
        setErrors(['Start rule cannot be empty.']);
        return;
    }
    if (!currentGrammarFiles) {
        setErrors(['Grammar files not loaded.']);
        return;
    }

    setVisualTree(null);
    setErrors([]);
    setUiState('PARSING');
    
    try {
      const updatedGrammarFiles: GrammarFiles = {
        ...currentGrammarFiles,
        lexerContent: lexerGrammar,
        parserContent: parserGrammar,
        allGrammars: currentGrammarFiles.allGrammars.map(g => {
          if (g.fileName === currentGrammarFiles.mainGrammar) {
            return { ...g, content: parserGrammar };
          }
          if (g.fileName.endsWith('Lexer.g4')) {
            return { ...g, content: lexerGrammar };
          }
          return g;
        })
      };
      const result = await runParser(updatedGrammarFiles.allGrammars, input, updatedGrammarFiles.mainGrammar, startRule);
      setVisualTree(result.tree);
      if (result.errors.length > 0) {
        setErrors(result.errors);
      }
    } catch (error) {
      console.error('解析失败:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      setErrors([errorMessage]);
    } finally {
      setUiState('IDLE');
    }
  };
  
  return (
    <main className="app-container">
      <PanelGroup direction="vertical">
        <Panel defaultSize={60} minSize={30}>
          <PanelGroup direction="horizontal">
            <Panel defaultSize={33.3} minSize={20}>
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
            
            <Panel minSize={20}>
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
        
        <Panel defaultSize={40} minSize={20}>
          <div className="visualization-container">
            <div className="toolbar" role="toolbar">
              <SearchableSelect
                options={grammarsList.map(g => ({ value: g.name, name: g.name }))}
                value={selectedGrammar}
                onChange={(value) => {
                  const selected = grammarsList.find(g => g.name === value);
                  handleSelectGrammar(selected);
                }}
                aria-label="选择预置语法"
              />
              <input
                  type="text"
                  value={startRule}
                  onChange={(e) => setStartRule(e.target.value)}
                  placeholder="Start Rule"
                  className="start-rule-input"
                  aria-label="输入起始规则"
              />
              <button
                onClick={handleParse}
                data-testid="parse-button"
                disabled={uiState !== 'IDLE'}
                aria-label="解析语法"
              >
                解析
              </button>
              <button onClick={toggleDarkMode} aria-label="切换颜色模式">
                切换到 {isDarkMode ? '亮色模式' : '暗色模式'}
              </button>
              <button
                onClick={() => setRenderMode(renderMode === 'svg' ? 'canvas' : 'svg')}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ml-2"
                aria-label="切换解析树渲染引擎"
              >
                切换到 {renderMode === 'svg' ? 'Canvas' : 'SVG'} 渲染
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
            <div style={{ flex: 1, height: 0 }} >
              {uiState === 'INITIAL_LOADING' && <div>应用加载中...</div>}
              {uiState === 'LOADING_GRAMMAR' && <div>加载语法中...</div>}
              {uiState === 'PARSING' && <div>解析树加载中...</div>}
              {uiState === 'IDLE' && visualTree && (
                renderMode === 'svg' ? (
                  <D3ParseTree data={visualTree} isDarkMode={isDarkMode} />
                ) : (
                  <CanvasParseTree data={visualTree} isDarkMode={isDarkMode} />
                )
              )}
              {uiState === 'IDLE' && !visualTree && <div>点击“解析”以生成解析树</div>}
            </div>
          </div>
        </Panel>
      </PanelGroup>
    </main>
  );
};

export default App;
