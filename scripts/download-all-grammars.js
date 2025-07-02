const fs = require('fs');
const path = require('path');

const GRAMMAR_INDEX_URL = 'https://raw.githubusercontent.com/antlr/grammars-v4/master/grammars.json';
const OUTPUT_DIR = 'apps/web/public/pre-filled-grammars';

async function downloadFile(url, filePath) {
  try {
    console.log(`  Downloading ${url} to ${filePath}`);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ${response.statusText}`);
    }
    const content = await response.text();
    fs.writeFileSync(filePath, content);
    console.log(`  Saved: ${filePath}`);
    return true;
  } catch (error) {
    console.error(`  Failed to download or save ${url}:`, error.message);
    return false;
  }
}

function getGrammarName(content) {
    const match = content.match(/(?:parser|lexer)\s+grammar\s+([a-zA-Z_]\w*)\s*;/);
    return match ? match[1].trim() : null;
}

async function main() {
  try {
    console.log('Fetching main grammar index...');
    const indexResponse = await fetch(GRAMMAR_INDEX_URL);
    const allGrammars = await indexResponse.json();
    console.log('Successfully fetched main grammar index.');

    if (fs.existsSync(OUTPUT_DIR)) {
      console.log(`Cleaning old directory: ${OUTPUT_DIR}`);
      fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
    }
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });

    const finalIndex = [];

    for (const grammarInfo of allGrammars) {
      console.log(`\nProcessing grammar: "${grammarInfo.name}"`);
      const grammarOutputDir = path.join(OUTPUT_DIR, grammarInfo.name);
      if (!fs.existsSync(grammarOutputDir)) {
        fs.mkdirSync(grammarOutputDir, { recursive: true });
      }

      const finalGrammarData = {
        name: grammarInfo.name,
        startRule: grammarInfo.start,
      };

      let parserFileName, lexerFileName;

      if (grammarInfo.parser) {
        const tempPath = path.join(grammarOutputDir, 'temp_parser.g4');
        if (await downloadFile(grammarInfo.parser, tempPath)) {
            const content = fs.readFileSync(tempPath, 'utf-8');
            const grammarName = getGrammarName(content);
            parserFileName = grammarName ? `${grammarName}.g4` : grammarInfo.parser.split('/').pop();
            const finalPath = path.join(grammarOutputDir, parserFileName);
            fs.renameSync(tempPath, finalPath);
            finalGrammarData.parser = `${grammarInfo.name}/${parserFileName}`;
            finalGrammarData.mainGrammar = parserFileName;
            console.log(`    Parser grammar set to: "${parserFileName}"`);
        } else {
            continue; // Skip this grammar if parser download fails
        }
      }

      if (grammarInfo.lexer) {
        const tempPath = path.join(grammarOutputDir, 'temp_lexer.g4');
        if (await downloadFile(grammarInfo.lexer, tempPath)) {
            const content = fs.readFileSync(tempPath, 'utf-8');
            const grammarName = getGrammarName(content);
            lexerFileName = grammarName ? `${grammarName}.g4` : grammarInfo.lexer.split('/').pop();
            const finalPath = path.join(grammarOutputDir, lexerFileName);
            fs.renameSync(tempPath, finalPath);
            finalGrammarData.lexer = `${grammarInfo.name}/${lexerFileName}`;
            console.log(`    Lexer grammar set to: "${lexerFileName}"`);
        }
      }

      if (grammarInfo.example && grammarInfo.example.length > 0) {
        const exampleFileName = grammarInfo.example[0];
        const baseDir = grammarInfo.parser ? grammarInfo.parser.substring(0, grammarInfo.parser.lastIndexOf('/')) : (grammarInfo.lexer ? grammarInfo.lexer.substring(0, grammarInfo.lexer.lastIndexOf('/')) : '');
        if (baseDir) {
            let exampleUrl = `${baseDir}/examples/${exampleFileName}`.replace(/\/\//g, '/');
            const exampleFilePath = path.join(grammarOutputDir, exampleFileName);
            if (await downloadFile(exampleUrl, exampleFilePath)) {
                finalGrammarData.input = `${grammarInfo.name}/${exampleFileName}`;
            }
        }
      }
      
      finalIndex.push(finalGrammarData);
    }

    if (finalIndex.length > 0) {
      const indexPath = path.join(OUTPUT_DIR, 'index.json');
      fs.writeFileSync(indexPath, JSON.stringify(finalIndex, null, 2));
      console.log(`\nSuccessfully generated index file: ${indexPath}`);
    } else {
      console.warn('\nWarning: No grammars were successfully processed. Index file not generated.');
    }

    console.log('\nScript finished.');

  } catch (error) {
    console.error('\nA critical error occurred during script execution:', error.message);
  }
}

main();