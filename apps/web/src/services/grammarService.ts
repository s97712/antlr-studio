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
}

export interface GrammarFiles {
    parserContent: string;
    lexerContent: string;
    inputContent: string;
    mainGrammar: string;
    allGrammars: { fileName: string; content: string }[];
}

const BASE_URL = '/pre-filled-grammars/';

/**
 * Fetches the list of all available grammars.
 */
export const fetchGrammarList = async (): Promise<GrammarInfo[]> => {
  const response = await fetch(`${BASE_URL}grammars.json`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

function getRelativePathFromUrl(fileUrl: string | undefined): string | null {
    if (!fileUrl) return null;
    try {
        // Handles both full URLs and relative paths from the grammars.json
        if (fileUrl.startsWith('http')) {
            const url = new URL(fileUrl);
            const path = url.pathname;
            const masterIndex = path.indexOf('/master/');
            if (masterIndex !== -1) {
                return path.substring(masterIndex + '/master/'.length);
            }
        }
        return fileUrl; // It's already a relative path
    } catch (e) {
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
  const fetchPromises: Promise<[string, string]>[] = [];

  const parserPath = getRelativePathFromUrl(grammarInfo.parser);
  const lexerPath = getRelativePathFromUrl(grammarInfo.lexer);
  
  if (parserPath) {
    fetchPromises.push(fetch(`${BASE_URL}${parserPath}`).then(res => res.text()).then(text => [parserPath, text]));
  }
  if (lexerPath) {
    fetchPromises.push(fetch(`${BASE_URL}${lexerPath}`).then(res => res.text()).then(text => [lexerPath, text]));
  }
  if (grammarInfo.imports) {
      const grammarBaseDir = path.dirname(parserPath || lexerPath || '');
      for (const imp of grammarInfo.imports) {
          const importPath = path.join(grammarBaseDir, imp);
          fetchPromises.push(fetch(`${BASE_URL}${importPath}`).then(res => res.text()).then(text => [importPath, text]));
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
      const examplePath = getRelativePathFromUrl(grammarInfo.example[0]);
      if (examplePath) {
          const grammarBaseDir = path.dirname(parserPath || lexerPath || '');
          const fullExamplePath = path.join(grammarBaseDir, 'examples', examplePath);
          try {
            const res = await fetch(`${BASE_URL}${fullExamplePath}`);
            if (res.ok) {
                inputContent = await res.text();
            } else {
                console.warn(`Could not fetch example file: ${fullExamplePath}`);
            }
          } catch (e) {
            console.error(`Error fetching example file: ${e}`);
          }
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
): Promise<TreeNode | null> => {
  const tree = await parseInput(grammars, input, mainGrammar, startRule);
  return convertTree(tree.tree);
};

// Helper to get path module functionality in the browser
const path = {
    basename: (p: string) => p.split('/').reverse()[0],
    dirname: (p: string) => p.substring(0, p.lastIndexOf('/')),
    join: (...parts: string[]) => parts.join('/').replace(/\/+/g, '/')
};