import { Handler } from '@netlify/functions';
import { execSync } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';

export const handler: Handler = async (event) => {
  // 解析请求体
  const body = JSON.parse(event.body || '{}');
  const { grammars, mainGrammar, language = 'JavaScript' } = body;

  if (!grammars || !Array.isArray(grammars) || grammars.length === 0) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing grammars array in request body' })
    };
  }

  if (!mainGrammar) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing mainGrammar in request body' })
    };
  }

  // 创建临时目录
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'antlr-compile-'));
  
  try {
    // 写入所有语法文件
    grammars.forEach(g => {
      const filePath = path.join(tempDir, g.name);
      fs.writeFileSync(filePath, g.content);
    });

    // 确保输出目录存在
    const outputDir = path.join(tempDir, 'output');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // 初始化outputFiles对象
    const outputFiles: Record<string, string> = {};
    
    // 获取JAR文件路径
    const jarPath = path.join(__dirname, 'antlr-4.13.1-complete.jar');
    if (!fs.existsSync(jarPath)) {
      throw new Error(`ANTLR JAR文件不存在: ${jarPath}`);
    }
    
    // 执行编译命令
    const grammarFileNames = grammars.map(g => g.name).join(' ');
    console.log('开始执行ANTLR编译...');
    const compileResult = execSync(
      `java -jar "${jarPath}" -Dlanguage=${language} -o output ${grammarFileNames}`,
      {
        timeout: 30000,
        cwd: tempDir, // 在临时目录内执行
        // stdio: "inherit"
      }
    );
    console.log('ANTLR编译完成');
    console.log('ANTLR编译输出:', compileResult.toString());
    
    // 递归读取目录中的所有文件
    const readFilesRecursively = (dir: string, baseDir: string = dir) => {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      const files: Record<string, string> = {};
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        const relativePath = path.relative(baseDir, fullPath);
        
        if (entry.isDirectory()) {
          const nestedFiles = readFilesRecursively(fullPath, baseDir);
          Object.assign(files, nestedFiles);
        } else if (entry.isFile() && entry.name.endsWith('.js')) { // 只读取 .js 文件
          files[relativePath] = fs.readFileSync(fullPath, 'utf-8');
        }
      }
      
      return files;
    };
    
    // 读取所有生成的文件
    const generatedFiles = readFilesRecursively(outputDir);
    Object.assign(outputFiles, generatedFiles);
    
    console.log(`成功生成 ${Object.keys(outputFiles).length} 个文件`);
    
    // 打印每个生成文件的内容
    for (const [fileName, content] of Object.entries(outputFiles)) {
      console.log(`文件: ${fileName}\n内容: ${content.substring(0, 500)}...\n---`);
    }

    console.log(`成功读取 ${Object.keys(outputFiles).length} 个文件`);
    
    // 将输出文件对象转换为数组格式
    const outputArray = Object.entries(generatedFiles).map(([fileName, content]) => ({
      name: fileName,
      content: content
    }));
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ files: outputArray })
    };
  } catch (error) {
    console.error('Compilation failed:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: 'Compilation failed',
        details: error instanceof Error ? error.message : String(error)
      })
    };
  } finally {
    // 清理临时文件
    try {
      fs.rmSync(tempDir, { recursive: true, force: true });
    } catch (cleanupError) {
      console.error('Cleanup failed:', cleanupError);
    }
  }
};