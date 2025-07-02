const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const GRAMMAR_SOURCE_DIR = 'temp-grammars';
const GRAMMAR_INDEX_PATH = path.join(GRAMMAR_SOURCE_DIR, 'grammars.json');
const OUTPUT_DIR = path.join('apps', 'web', 'public', 'pre-filled-grammars');
const REPO_URL = 'https://github.com/antlr/grammars-v4.git';

// This function was missing in some previous attempts. It's crucial for renaming files
// based on their content, which is a requirement for the app.
function getGrammarName(content) {
  const match = content.match(/(?:parser|lexer)\s+grammar\s+([a-zA-Z_]\w*)\s*;/);
  return match ? match[1].trim() : null;
}

function getRelativePathFromUrl(fileUrl) {
    if (!fileUrl) return null;
    try {
        const url = new URL(fileUrl);
        // Correctly extracts the path after "master/"
        return url.pathname.substring('/antlr/grammars-v4/master/'.length);
    } catch (e) {
        console.error(`Invalid URL: ${fileUrl}`);
        return null;
    }
}

async function main() {
  try {
    if (!fs.existsSync(GRAMMAR_SOURCE_DIR)) {
        console.log(`Cloning grammars repository from ${REPO_URL}...`);
        execSync(`git clone ${REPO_URL} ${GRAMMAR_SOURCE_DIR}`, { stdio: 'inherit' });
        console.log('Repository cloned successfully.');
    } else {
        console.log('Grammars repository already exists. Skipping clone.');
    }

    console.log('Reading main grammar index from local clone...');
    const grammarsIndex = JSON.parse(fs.readFileSync(GRAMMAR_INDEX_PATH, 'utf-8'));
    console.log('Successfully read main grammar index.');

    if (fs.existsSync(OUTPUT_DIR)) {
      console.log(`Cleaning old directory: ${OUTPUT_DIR}`);
      fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
    }
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });

    const finalIndex = [];

    for (const grammarInfo of grammarsIndex) {
      console.log(`\nProcessing grammar: "${grammarInfo.name}"`);
      const grammarOutputDir = path.join(OUTPUT_DIR, grammarInfo.name);
      fs.mkdirSync(grammarOutputDir, { recursive: true });

      const finalGrammarData = {
        name: grammarInfo.name,
        startRule: grammarInfo.start,
      };

      let grammarFileRelativeDir = null;

      const processGrammarFile = (fileUrl, type) => {
        const relativePath = getRelativePathFromUrl(fileUrl);
        if (!relativePath) return null;

        if (!grammarFileRelativeDir) {
            grammarFileRelativeDir = path.dirname(relativePath);
        }

        const sourcePath = path.join(GRAMMAR_SOURCE_DIR, relativePath);
        
        if (fs.existsSync(sourcePath)) {
          const content = fs.readFileSync(sourcePath, 'utf-8');
          const grammarNameInFile = getGrammarName(content);
          const fileName = grammarNameInFile ? `${grammarNameInFile}.g4` : path.basename(relativePath);
          const destPath = path.join(grammarOutputDir, fileName);
          
          fs.copyFileSync(sourcePath, destPath);
          console.log(`    Copied ${type}: ${fileName}`);
          return { fileName, relativePath: `${grammarInfo.name}/${fileName}` };
        } else {
          console.warn(`    ${type} file not found: ${sourcePath}`);
          return null;
        }
      };

      const parserResult = processGrammarFile(grammarInfo.parser, 'parser');
      if (parserResult) {
        finalGrammarData.parser = parserResult.relativePath;
        finalGrammarData.mainGrammar = parserResult.fileName;
      }

      const lexerResult = processGrammarFile(grammarInfo.lexer, 'lexer');
      if (lexerResult) {
        finalGrammarData.lexer = lexerResult.relativePath;
        if (!finalGrammarData.mainGrammar) {
            finalGrammarData.mainGrammar = lexerResult.fileName;
        }
      }

      if (!parserResult && !lexerResult) {
        console.warn(`    No parser or lexer found for ${grammarInfo.name}. Skipping.`);
        continue;
      }

      if (grammarInfo.example && grammarInfo.example.length > 0 && grammarFileRelativeDir) {
        for (const exampleFileName of grammarInfo.example) {
            // Examples can be in subdirectories, so we need to handle that.
            const exampleSourcePath = path.join(GRAMMAR_SOURCE_DIR, grammarFileRelativeDir, 'examples', exampleFileName);
            const exampleDestPath = path.join(grammarOutputDir, exampleFileName);

            if (fs.existsSync(exampleSourcePath)) {
                // Ensure destination subdirectory exists
                fs.mkdirSync(path.dirname(exampleDestPath), { recursive: true });
                fs.copyFileSync(exampleSourcePath, exampleDestPath);
                if (!finalGrammarData.input) { // Only take the first example
                    finalGrammarData.input = `${grammarInfo.name}/${exampleFileName}`;
                }
                console.log(`    Copied example: ${exampleFileName}`);
            } else {
                console.warn(`    Example file not found: ${exampleSourcePath}`);
            }
        }
      }
      
      finalIndex.push(finalGrammarData);
    }

    if (finalIndex.length > 0) {
      const finalIndexPath = path.join(OUTPUT_DIR, 'index.json');
      fs.writeFileSync(finalIndexPath, JSON.stringify(finalIndex, null, 2));
      console.log(`\nSuccessfully generated final index at: ${finalIndexPath}`);
    } else {
      console.warn('\nWarning: No grammars were successfully processed. Index file not generated.');
    }

  } catch (error) {
    console.error('An error occurred:', error);
    process.exit(1);
  } finally {
    console.log('Cleaning up temporary clone directory...');
    fs.rmSync(GRAMMAR_SOURCE_DIR, { recursive: true, force: true });
    console.log('Cleanup complete.');
  }
}

main();