import React, { useState, useEffect } from 'react';
import './App.css';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import EditorPanel from './components/EditorPanel';
import CanvasParseTree from './grammar/components/CanvasParseTree';
import type { TreeNode } from './grammar/parser/treeConverter';
import { useDarkMode } from './hooks/useDarkMode';
import SearchableSelect from './components/SearchableSelect';
import {
  fetchGrammarList,
  loadGrammarContents,
  runParser,
  type GrammarInfo,
  type GrammarFiles,
  saveCustomGrammar,
  renameCustomGrammar,
  deleteCustomGrammar,
  type CustomGrammar,
} from './services/grammarService';
import SunIcon from './components/icons/SunIcon';
import MoonIcon from './components/icons/MoonIcon';

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
  const [uiState, setUiState] = useState<UIState>('INITIAL_LOADING');
  const [startRule, setStartRule] = useState<string>('');
  const [currentGrammarFiles, setCurrentGrammarFiles] = useState<GrammarFiles | null>(null);
  const [originalGrammarContent, setOriginalGrammarContent] = useState({ parser: '', lexer: '' });

  const refreshGrammarList = async () => {
    try {
      const data = await fetchGrammarList();
      setGrammarsList(data);
      return data;
    } catch (error) {
      console.error("Failed to fetch grammar index:", error);
      setErrors(["Failed to fetch grammar index: " + (error instanceof Error ? error.message : String(error))]);
      return [];
    }
  };

  const handleSaveGrammar = async (grammar: CustomGrammar) => {
    await saveCustomGrammar(grammar);
    const updatedList = await refreshGrammarList();
    const newGrammar = updatedList.find(g => g.name === grammar.name);
    if (newGrammar) {
      handleSelectGrammar(newGrammar);
    }
  };

  const handleRenameGrammar = async () => {
    const oldGrammar = grammarsList.find(g => g.name === selectedGrammar);
    if (!oldGrammar || !oldGrammar.isCustom) return;

    const newName = prompt('Enter new name for the grammar:', oldGrammar.name);
    if (newName && newName !== oldGrammar.name) {
      await renameCustomGrammar(oldGrammar.name, newName);
      const updatedList = await refreshGrammarList();
      const renamedGrammar = updatedList.find(g => g.name === newName);
      if (renamedGrammar) {
        handleSelectGrammar(renamedGrammar);
      }
    }
  };

  const handleForkGrammar = async () => {
    if (!selectedGrammar || !currentGrammarFiles) return;
    const grammarToFork = grammarsList.find(g => g.name === selectedGrammar);
    if (!grammarToFork) return;

    // Find the base name (e.g., "JSON" from "JSON-1")
    const baseNameMatch = grammarToFork.name.match(/^(.*)-(\d+)$/);
    const baseName = baseNameMatch ? baseNameMatch[1] : grammarToFork.name;

    // Find the highest existing fork number for this base name
    let maxForkNum = 0;
    const forkRegex = new RegExp(`^${baseName}-(\\d+)$`);
    grammarsList.forEach(g => {
      const match = g.name.match(forkRegex);
      if (match) {
        const num = parseInt(match[1], 10);
        if (num > maxForkNum) {
          maxForkNum = num;
        }
      }
    });
    const newForkNum = maxForkNum + 1;
    const newName = `${baseName}-${newForkNum}`;

    const forkedGrammar: CustomGrammar = {
      ...grammarToFork,
      name: newName,
      url: `local:${newName}`,
      files: {
        parserContent: currentGrammarFiles.parserContent,
        lexerContent: currentGrammarFiles.lexerContent,
      },
      example: [currentGrammarFiles.inputContent],
      isCustom: true,
    };

    await saveCustomGrammar(forkedGrammar);
    const updatedList = await refreshGrammarList();
    const newGrammar = updatedList.find(g => g.name === forkedGrammar.name);
    if (newGrammar) {
      handleSelectGrammar(newGrammar);
    }
  };

  const handleDeleteGrammar = async () => {
    const grammarToDelete = grammarsList.find(g => g.name === selectedGrammar);
    if (!grammarToDelete || !grammarToDelete.isCustom) return;

    if (window.confirm(`Are you sure you want to delete "${grammarToDelete.name}"?`)) {
      await deleteCustomGrammar(grammarToDelete.name);
      const updatedList = await refreshGrammarList();
      const firstSelectable = updatedList.find(g => g.url !== 'separator');
      await handleSelectGrammar(firstSelectable);
    }
  };

  const handleSelectGrammar = async (grammarInfo: GrammarInfo | undefined) => {
    if (!grammarInfo || grammarInfo.url === 'separator') return;
  
    setSelectedGrammar(grammarInfo.name);
    setUiState('LOADING_GRAMMAR');

    // Clear previous content
    setParserGrammar('');
    setLexerGrammar('');
    setInput('');
    setVisualTree(null);
    setErrors([]);
  
    const startTime = Date.now();
  
    try {
      const files = await loadGrammarContents(grammarInfo);
      const elapsedTime = Date.now() - startTime;
      const remainingTime = 500 - elapsedTime;
  
      if (remainingTime > 0) {
        await new Promise(resolve => setTimeout(resolve, remainingTime));
      }
  
      setCurrentGrammarFiles(files);
      setParserGrammar(files.parserContent);
      setLexerGrammar(files.lexerContent);
      setInput(files.inputContent);
      setStartRule(grammarInfo.start || '');
      setVisualTree(null);
      setErrors([]);
      if (grammarInfo.isCustom) {
        setOriginalGrammarContent({ parser: files.parserContent, lexer: files.lexerContent });
      } else {
        setOriginalGrammarContent({ parser: '', lexer: '' });
      }
    } catch (error) {
      console.error("Failed to load preset grammar:", error);
      setErrors([`Failed to load preset grammar '${grammarInfo.name}'`]);
    } finally {
      setUiState('IDLE');
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const grammars = await refreshGrammarList();
        if (grammars.length > 0) {
          const firstSelectable = grammars.find(g => g.url !== 'separator');
          await handleSelectGrammar(firstSelectable);
        }
      } catch (error) {
        console.error("Initialization failed:", error);
        setErrors(["Failed to fetch grammar index: " + (error instanceof Error ? error.message : String(error))]);
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
      let filesToParse = currentGrammarFiles.allGrammars;
      const currentGrammar = grammarsList.find(g => g.name === selectedGrammar);

      if (currentGrammar?.isCustom) {
        filesToParse = [
          { fileName: currentGrammar.parser || 'parser.g4', content: parserGrammar },
          { fileName: currentGrammar.lexer || 'lexer.g4', content: lexerGrammar }
        ].filter(f => f.content); // Filter out empty lexer
      } else {
         filesToParse = currentGrammarFiles.allGrammars.map(g => {
          if (g.fileName === currentGrammarFiles.mainGrammar) {
            return { ...g, content: parserGrammar };
          }
          // This logic might be flawed for non-custom grammars if lexer name isn't standard
          if (g.fileName.endsWith('Lexer.g4')) {
            return { ...g, content: lexerGrammar };
          }
          return g;
        });
      }

      const mainGrammarFile = filesToParse.find(f => f.fileName === currentGrammarFiles.mainGrammar)?.fileName || filesToParse[0].fileName;

      // Ensure file names are just basenames, not full paths/URLs
      const sanitizedFilesToParse = filesToParse.map(f => ({
        ...f,
        fileName: f.fileName.split('/').pop()!
      }));
      const sanitizedMainGrammarFile = mainGrammarFile.split('/').pop()!;

      const result = await runParser(sanitizedFilesToParse, input, sanitizedMainGrammarFile, startRule);
      setVisualTree(result.tree);
      if (result.errors.length > 0) {
        setErrors(result.errors);
      }
    } catch (error) {
      console.error('Parse failed:', error);
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
              <button onClick={toggleDarkMode} aria-label="Toggle Color Mode" className="mode-toggle">
                {isDarkMode ? <SunIcon /> : <MoonIcon />}
              </button>
              <SearchableSelect
                options={grammarsList.map(g => ({ value: g.name, name: g.name, isSeparator: g.url === 'separator' }))}
                value={selectedGrammar}
                onChange={(value) => {
                  const selected = grammarsList.find(g => g.name === value);
                  handleSelectGrammar(selected);
                }}
                aria-label="Select Preset Grammar"
              />
              {selectedGrammar && <button onClick={handleForkGrammar}>Fork</button>}
              <button
                onClick={handleRenameGrammar}
                disabled={!grammarsList.find(g => g.name === selectedGrammar)?.isCustom}
              >
                Rename
              </button>
              <button
                onClick={handleDeleteGrammar}
                disabled={!grammarsList.find(g => g.name === selectedGrammar)?.isCustom}
              >
                Delete
              </button>
              <button
                onClick={async () => {
                  const currentGrammar = grammarsList.find(g => g.name === selectedGrammar) as CustomGrammar;
                  if (currentGrammar) {
                    const updatedGrammar = {
                      ...currentGrammar,
                      files: {
                        parserContent: parserGrammar,
                        lexerContent: lexerGrammar,
                      },
                      example: [input],
                    };
                    await saveCustomGrammar(updatedGrammar);
                    setOriginalGrammarContent({ parser: parserGrammar, lexer: lexerGrammar });
                  }
                }}
                disabled={
                  !grammarsList.find(g => g.name === selectedGrammar)?.isCustom ||
                  (parserGrammar === originalGrammarContent.parser && lexerGrammar === originalGrammarContent.lexer)
                }
              >
                Save
              </button>
              <div className="toolbar-spacer"></div>
              <div className="input-with-label">
                <label htmlFor="start-rule">Start Rule:</label>
                <input
                    id="start-rule"
                    type="text"
                    value={startRule}
                    onChange={(e) => setStartRule(e.target.value)}
                    placeholder="Start Rule"
                    className="start-rule-input"
                    aria-label="Enter start rule"
                />
              </div>
              <button
                onClick={handleParse}
                data-testid="parse-button"
                disabled={uiState !== 'IDLE'}
                aria-label="Parse Grammar"
              >
                Parse
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
              {uiState === 'INITIAL_LOADING' && <div className="loading-spinner" />}
              {uiState === 'LOADING_GRAMMAR' && <div className="loading-spinner" />}
              {uiState === 'PARSING' && <div className="loading-spinner" />}
              {uiState === 'IDLE' && visualTree && (
                  <CanvasParseTree data={visualTree} isDarkMode={isDarkMode} />
              )}
              {uiState === 'IDLE' && !visualTree && (
                <div className="parse-prompt">
                  <span role="img" aria-label="pointing up">☝️</span> Click "Parse" to generate the parse tree
                </div>
              )}
            </div>
          </div>
        </Panel>
      </PanelGroup>
    </main>
  );
};

export default App;
