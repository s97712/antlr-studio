const fs = require('fs');
const path = require('path');

const GRAMMAR_INDEX_URL = 'https://raw.githubusercontent.com/antlr/grammars-v4/master/grammars.json';
const BASE_URL = 'https://raw.githubusercontent.com/antlr/grammars-v4/master/';
const OUTPUT_DIR = 'apps/web/public/pre-filled-grammars';

async function downloadFile(url, filePath) {
  try {
    console.log(`  Downloading ${url}`);
    const response = await fetch(url);
    if (!response.ok) {
      // 404 is a common case for examples, so we'll just log it and continue
      if (response.status === 404) {
        console.warn(`  File not found (404): ${url}`);
        return false;
      }
      throw new Error(`HTTP ${response.status} ${response.statusText}`);
    }
    const content = await response.text();
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, content);
    console.log(`  Saved: ${filePath}`);
    return true;
  } catch (error) {
    console.error(`  Failed to download or save ${url}:`, error.message);
    return false;
  }
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

    // Save the original grammars.json
    const originalIndexPath = path.join(OUTPUT_DIR, 'grammars.json');
    fs.writeFileSync(originalIndexPath, JSON.stringify(allGrammars, null, 2));
    console.log(`Saved original grammar index to: ${originalIndexPath}`);


    for (const grammarInfo of allGrammars) {
      console.log(`\nProcessing grammar: "${grammarInfo.name}"`);

      const urlsToDownload = [];
      const grammarBaseUrl = grammarInfo.parser ? grammarInfo.parser.substring(0, grammarInfo.parser.lastIndexOf('/')) : (grammarInfo.lexer ? grammarInfo.lexer.substring(0, grammarInfo.lexer.lastIndexOf('/')) : null);

      if (grammarInfo.parser) {
        urlsToDownload.push(grammarInfo.parser);
      }
      if (grammarInfo.lexer) {
        urlsToDownload.push(grammarInfo.lexer);
      }
      
      if (grammarBaseUrl) {
        if (grammarInfo.imports) {
          for (const imp of grammarInfo.imports) {
            urlsToDownload.push(`${grammarBaseUrl}/${imp}`);
          }
        }
        if (grammarInfo.example) {
          for (const ex of grammarInfo.example) {
            urlsToDownload.push(`${grammarBaseUrl}/examples/${ex}`);
          }
        }
      }

      for (const url of urlsToDownload) {
        if (!url) continue;

        // Some entries in grammars.json are full URLs, some are relative paths
        const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
        
        if (!fullUrl.startsWith(BASE_URL)) {
          console.warn(`  Skipping URL with unexpected format: ${fullUrl}`);
          continue;
        }

        const relativePath = fullUrl.substring(BASE_URL.length);
        const filePath = path.join(OUTPUT_DIR, relativePath);
        await downloadFile(fullUrl, filePath);
      }
    }

    console.log('\nScript finished.');

  } catch (error) {
    console.error('\nA critical error occurred during script execution:', error);
  }
}

main();