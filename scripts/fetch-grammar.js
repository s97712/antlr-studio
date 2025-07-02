const fs = require('fs');
const path = require('path');

const GRAMMAR_INDEX_URL = 'https://raw.githubusercontent.com/antlr/grammars-v4/master/grammars.json';
const OUTPUT_DIR = 'apps/web/public/pre-filled-grammars';

function getGrammarName(content) {
  const match = content.match(/(?:parser|lexer)\s+grammar\s+([a-zA-Z_]\w*)\s*;/);
  return match ? match[1].trim() : null;
}

async function processGrammar(grammarInfo) {
  console.log(`\n开始处理语法: "${grammarInfo.name}"`);
  const grammarOutputDir = path.join(OUTPUT_DIR, grammarInfo.name);
  if (!fs.existsSync(grammarOutputDir)) {
    fs.mkdirSync(grammarOutputDir, { recursive: true });
  }

  const finalGrammarData = { 
    name: grammarInfo.name,
    startRule: grammarInfo.start
  };
  console.log(`    找到入口规则: "${grammarInfo.start}"`);

  const filesToDownload = [];
  if (grammarInfo.parser) filesToDownload.push({ type: 'parser', url: grammarInfo.parser });
  if (grammarInfo.lexer) filesToDownload.push({ type: 'lexer', url: grammarInfo.lexer });
  if (grammarInfo.example && grammarInfo.example.length > 0) {
    const exampleFileName = grammarInfo.example[0];
    const baseDir = grammarInfo.parser.substring(0, grammarInfo.parser.lastIndexOf('/'));
    const exampleUrl = `${baseDir}/examples/${exampleFileName}`;
    filesToDownload.push({ type: 'input', url: exampleUrl, originalName: exampleFileName });
  }

  for (const file of filesToDownload) {
    try {
      console.log(`  正在获取: ${file.url}`);
      const response = await fetch(file.url);
      if (!response.ok) throw new Error(`HTTP ${response.status} ${response.statusText}`);
      const content = await response.text();
      
      let fileName;
      if (file.type === 'parser' || file.type === 'lexer') {
        const grammarNameInFile = getGrammarName(content);
        fileName = grammarNameInFile ? `${grammarNameInFile}.g4` : file.url.split('/').pop();
        
        if(grammarNameInFile) console.log(`    检测到语法名: "${grammarNameInFile}", 文件将保存为: "${fileName}"`);
        else console.warn(`    警告: 未能在文件中找到语法声明。使用原始文件名: "${fileName}"`);

        finalGrammarData[file.type] = `${grammarInfo.name}/${fileName}`;
        if (file.type === 'parser') {
            finalGrammarData.mainGrammar = fileName; // 将修正后的解析器文件名设为 mainGrammar
            console.log(`    设置主语法文件: "${fileName}"`);
        }
      } else { // input file
        fileName = file.originalName;
        finalGrammarData[file.type] = `${grammarInfo.name}/${fileName}`;
      }

      const filePath = path.join(grammarOutputDir, fileName);
      fs.writeFileSync(filePath, content);
      console.log(`  已保存: ${filePath}`);

    } catch (error) {
      console.error(`  获取或保存文件 ${file.url} 失败:`, error.message);
      return null; 
    }
  }
  return finalGrammarData;
}

async function main() {
  try {
    console.log('正在获取主语法索引...');
    const indexResponse = await fetch(GRAMMAR_INDEX_URL);
    const allGrammars = await indexResponse.json();
    console.log('主语法索引获取成功。');

    if (fs.existsSync(OUTPUT_DIR)) {
        console.log(`正在清理旧目录: ${OUTPUT_DIR}`);
        fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
    }
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });

    const finalIndex = [];
    const grammarsToProcess = allGrammars;

    for (const grammar of grammarsToProcess) {
      const result = await processGrammar(grammar);
      if (result) {
        finalIndex.push(result);
      }
    }

    if (finalIndex.length > 0) {
      const indexPath = path.join(OUTPUT_DIR, 'index.json');
      fs.writeFileSync(indexPath, JSON.stringify(finalIndex, null, 2));
      console.log(`\n成功生成索引文件: ${indexPath}`);
    } else {
      console.warn('\n警告: 未能成功处理任何语法，未生成索引文件。');
    }

    console.log('\n脚本执行完毕。');

  } catch (error) {
    console.error('\n脚本执行过程中发生严重错误:', error.message);
  }
}

main();