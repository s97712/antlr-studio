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

const BASE_URL = 'https://raw.githubusercontent.com/antlr/grammars-v4/master/';

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