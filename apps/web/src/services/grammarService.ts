import type { TreeNode } from '../grammar/parser/treeConverter';
import { parseInput } from '../grammar/parser/parser';
import { convertTree } from '../grammar/parser/treeConverter';

/**
 * Defines the structure of grammar information from the original grammars.json.
 */
export interface GrammarInfo {
  name: string;
  description: string;
  url: string;
  parser?: string;
  lexer?: string;
  start?: string;
  example?: string[];
  imports?: string[];
  isCustom?: boolean;
  files?: {
    parserContent: string;
    lexerContent: string;
  };
}

export interface CustomGrammar extends GrammarInfo {
  isCustom: true;
  files: {
    parserContent: string;
    lexerContent: string;
  };
}

export interface GrammarFiles {
    parserContent: string;
    lexerContent: string;
    inputContent: string;
    mainGrammar: string;
    allGrammars: { fileName: string; content: string }[];
}

// --- Local Storage for Custom Grammars ---

const CUSTOM_GRAMMARS_KEY = 'customGrammars';

interface GrammarStorage {
  getCustomGrammars(): Promise<CustomGrammar[]>;
  saveCustomGrammar(grammar: CustomGrammar): Promise<void>;
  renameCustomGrammar(oldName: string, newName: string): Promise<void>;
  deleteCustomGrammar(grammarName: string): Promise<void>;
}

class LocalStorageGrammarStorage implements GrammarStorage {
  async getCustomGrammars(): Promise<CustomGrammar[]> {
    const stored = localStorage.getItem(CUSTOM_GRAMMARS_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  async saveCustomGrammar(grammar: CustomGrammar): Promise<void> {
    const grammars = await this.getCustomGrammars();
    const index = grammars.findIndex(g => g.name === grammar.name);
    if (index > -1) {
      grammars[index] = grammar;
    } else {
      grammars.unshift(grammar);
    }
    localStorage.setItem(CUSTOM_GRAMMARS_KEY, JSON.stringify(grammars));
  }

  async renameCustomGrammar(oldName: string, newName: string): Promise<void> {
    const grammars = await this.getCustomGrammars();
    const grammarToRename = grammars.find(g => g.name === oldName);
    if (grammarToRename) {
      const updatedGrammar = { ...grammarToRename, name: newName, url: `local:${newName}` };
      const filteredGrammars = grammars.filter(g => g.name !== oldName);
      filteredGrammars.unshift(updatedGrammar);
      localStorage.setItem(CUSTOM_GRAMMARS_KEY, JSON.stringify(filteredGrammars));
    }
  }

  async deleteCustomGrammar(grammarName: string): Promise<void> {
    const grammars = await this.getCustomGrammars();
    const filteredGrammars = grammars.filter(g => g.name !== grammarName);
    localStorage.setItem(CUSTOM_GRAMMARS_KEY, JSON.stringify(filteredGrammars));
  }
}

const grammarStorage = new LocalStorageGrammarStorage();

export const saveCustomGrammar = async (grammar: CustomGrammar) => {
  await grammarStorage.saveCustomGrammar(grammar);
};

export const renameCustomGrammar = async (oldName: string, newName: string) => {
  await grammarStorage.renameCustomGrammar(oldName, newName);
};

export const deleteCustomGrammar = async (grammarName: string) => {
  await grammarStorage.deleteCustomGrammar(grammarName);
};


const BASE_URL = 'https://raw.githubusercontent.com/antlr/grammars-v4/master/';

/**
 * Fetches the list of all available grammars, including custom ones.
 */
export const fetchGrammarList = async (): Promise<GrammarInfo[]> => {
  const customGrammars = await grammarStorage.getCustomGrammars();
  
  const response = await fetch(`${BASE_URL}grammars.json`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const remoteGrammars: GrammarInfo[] = await response.json();

  if (customGrammars.length > 0) {
    const separator: GrammarInfo = {
      name: '---',
      description: '',
      url: 'separator',
      isCustom: true, // Treat separator as a custom type for filtering/rendering
    };
    return [...customGrammars, separator, ...remoteGrammars];
  }

  return remoteGrammars;
};

function getRelativePathFromUrl(fileUrl: string | undefined): string | null {
    if (!fileUrl) return null;
    if (fileUrl.startsWith('local:')) return fileUrl;
    // The URLs in grammars.json are now full URLs, so we just return them.
    // We need to extract the path relative to the new BASE_URL for other logic to work.
    if (fileUrl.startsWith(BASE_URL)) {
        return fileUrl.substring(BASE_URL.length);
    }
    // This will handle cases where the URL might be different, though it's not expected.
    try {
        if (fileUrl.startsWith('http')) {
            const url = new URL(fileUrl);
            const path = url.pathname;
            const masterIndex = path.indexOf('/master/');
            if (masterIndex !== -1) {
                return path.substring(masterIndex + '/master/'.length);
            }
        }
        return fileUrl;
    } catch {
        console.error(`Invalid URL or path: ${fileUrl}`);
        return null;
    }
}

/**
 * Determines which grammar is the main one (parser vs. lexer).
 * A simple heuristic: the one that is not imported by the other.
 */
function determineMainGrammar(parserContent: string, lexerContent: string, parserPath: string, lexerPath: string): string {
    const parserName = path.basename(parserPath);
    const lexerName = path.basename(lexerPath);

    if (parserContent.includes(`import ${lexerName.replace('.g4', '')}`)) {
        return parserName;
    }
    if (lexerContent.includes(`import ${parserName.replace('.g4', '')}`)) {
        return lexerName;
    }
    // Default to parser if no import is found
    return parserName;
}

/**
 * Loads all necessary files for a given grammar.
 */
export const loadGrammarContents = async (grammarInfo: GrammarInfo): Promise<GrammarFiles> => {
  if (grammarInfo.isCustom && grammarInfo.files) {
    const { parserContent, lexerContent } = grammarInfo.files;
    const mainGrammar = determineMainGrammar(parserContent, lexerContent, grammarInfo.parser || '', grammarInfo.lexer || '');
    const allGrammars = [
        { fileName: grammarInfo.parser || 'parser.g4', content: parserContent },
        { fileName: grammarInfo.lexer || 'lexer.g4', content: lexerContent }
    ];
    return {
        parserContent,
        lexerContent,
        inputContent: grammarInfo.example?.[0] || '',
        mainGrammar,
        allGrammars
    };
  }
    
  const fetchPromises: Promise<[string, string]>[] = [];

  const parserPath = getRelativePathFromUrl(grammarInfo.parser);
  const lexerPath = getRelativePathFromUrl(grammarInfo.lexer);
  
  if (parserPath) {
    fetchPromises.push(fetch(`${grammarInfo.parser}`).then(res => res.text()).then(text => [parserPath, text]));
  }
  if (lexerPath) {
    fetchPromises.push(fetch(`${grammarInfo.lexer}`).then(res => res.text()).then(text => [lexerPath, text]));
  }
  if (grammarInfo.imports) {
      const grammarBaseUrl = path.dirname(grammarInfo.parser || grammarInfo.lexer || '');
      for (const imp of grammarInfo.imports) {
          const importUrl = new URL(imp, grammarBaseUrl + '/').toString();
          const importPath = getRelativePathFromUrl(importUrl);
          if (importPath) {
            fetchPromises.push(fetch(importUrl).then(res => res.text()).then(text => [importPath, text]));
          }
      }
  }

  const fileResults = await Promise.all(fetchPromises);
  
  const allGrammars: { fileName: string; content: string }[] = fileResults.map(([path, content]) => ({
      fileName: path.split('/').pop()!,
      content
  }));

  const parserContent = allGrammars.find(g => g.fileName === path.basename(parserPath || ''))?.content || '';
  const lexerContent = allGrammars.find(g => g.fileName === path.basename(lexerPath || ''))?.content || '';

  let inputContent = '';
  if (grammarInfo.example && grammarInfo.example.length > 0) {
      const examplePath = grammarInfo.example[0];
      const grammarBaseUrl = path.dirname(grammarInfo.parser || grammarInfo.lexer || '');
      // Examples in grammars.json are relative to the grammar file, not the root.
      // Construct the full URL for the example file.
      const fullExampleUrl = new URL(path.join('examples', examplePath), grammarBaseUrl + '/').toString();
      try {
        const res = await fetch(fullExampleUrl);
        if (res.ok) {
            inputContent = await res.text();
        } else {
            console.warn(`Could not fetch example file: ${fullExampleUrl}`);
        }
      } catch (e) {
        console.error(`Error fetching example file: ${e}`);
      }
  }

  const mainGrammar = determineMainGrammar(parserContent, lexerContent, parserPath || '', lexerPath || '');

  return { parserContent, lexerContent, inputContent, mainGrammar, allGrammars };
};

/**
 * Calls the core parsing engine.
 */
export const runParser = async (
  grammars: { fileName: string; content: string }[],
  input: string,
  mainGrammar: string,
  startRule: string
): Promise<{ tree: TreeNode | null; errors: string[] }> => {
  const result = await parseInput(grammars, input, mainGrammar, startRule);
  const tree = result.tree ? convertTree(result.tree) : null;
  return { tree, errors: result.errors };
};

// Helper to get path module functionality in the browser
const path = {
    basename: (p: string) => p.split('/').reverse()[0],
    dirname: (p: string) => p.substring(0, p.lastIndexOf('/')),
    join: (...parts: string[]) => parts.join('/').replace(/\/+/g, '/')
};