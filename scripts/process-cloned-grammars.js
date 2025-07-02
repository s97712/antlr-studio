const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const GRAMMAR_SOURCE_DIR = 'temp-grammars';
const OUTPUT_DIR = path.join('apps', 'web', 'public', 'pre-filled-grammars');
const REPO_URL = 'https://github.com/antlr/grammars-v4.git';

async function main() {
  try {
    if (fs.existsSync(GRAMMAR_SOURCE_DIR)) {
        console.log('Removing old temporary clone directory...');
        fs.rmSync(GRAMMAR_SOURCE_DIR, { recursive: true, force: true });
    }

    console.log(`Cloning grammars repository from ${REPO_URL}...`);
    execSync(`git clone --depth 1 ${REPO_URL} ${GRAMMAR_SOURCE_DIR}`, { stdio: 'inherit' });
    console.log('Repository cloned successfully.');

    if (fs.existsSync(OUTPUT_DIR)) {
      console.log(`Cleaning old output directory: ${OUTPUT_DIR}`);
      fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
    }
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });

    const sourceGrammarsDir = path.join(GRAMMAR_SOURCE_DIR);
    
    console.log(`Copying files from ${sourceGrammarsDir} to ${OUTPUT_DIR}...`);
    
    // Copy all contents from the cloned repo's root to the output directory
    fs.cpSync(sourceGrammarsDir, OUTPUT_DIR, { recursive: true });

    console.log('Successfully copied all grammar files and the index.');

  } catch (error) {
    console.error('An error occurred:', error);
    process.exit(1);
  } finally {
    if (fs.existsSync(GRAMMAR_SOURCE_DIR)) {
        console.log('Cleaning up temporary clone directory...');
        fs.rmSync(GRAMMAR_SOURCE_DIR, { recursive: true, force: true });
        console.log('Cleanup complete.');
    }
  }
}

main();