import { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import { execSync } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';

const router = Router();

interface CompileBody {
  grammars: { name: string; content: string }[];
  mainGrammar: string;
  language?: string;
}

router.post(
  '/compile',
  asyncHandler(async (req: Request<{}, {}, CompileBody>, res: Response) => {
    const { grammars, mainGrammar, language = 'JavaScript' } = req.body;

    if (!grammars || !Array.isArray(grammars) || grammars.length === 0) {
      res.status(400).json({ error: 'Missing grammars array in request body' });
      return;
    }

    if (!mainGrammar) {
      res.status(400).json({ error: 'Missing mainGrammar in request body' });
      return;
    }

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'antlr-compile-'));

  try {
    grammars.forEach(g => {
      const filePath = path.join(tempDir, g.name);
      fs.writeFileSync(filePath, g.content);
    });

    const outputDir = path.join(tempDir, 'output');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const jarPath = path.resolve(__dirname, '../../resources/antlr-4.13.1-complete.jar');
    if (!fs.existsSync(jarPath)) {
      throw new Error(`ANTLR JAR file not found at: ${jarPath}`);
    }

    const grammarFileNames = grammars.map(g => g.name).join(' ');
    execSync(
      `java -jar "${jarPath}" -Dlanguage=${language} -o output ${grammarFileNames}`,
      {
        timeout: 30000,
        cwd: tempDir,
      }
    );

    const readFilesRecursively = (dir: string, baseDir: string = dir): Record<string, string> => {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      const files: Record<string, string> = {};

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        const relativePath = path.relative(baseDir, fullPath);

        if (entry.isDirectory()) {
          const nestedFiles = readFilesRecursively(fullPath, baseDir);
          Object.assign(files, nestedFiles);
        } else if (entry.isFile() && entry.name.endsWith('.js')) {
          files[relativePath] = fs.readFileSync(fullPath, 'utf-8');
        }
      }

      return files;
    };

    const generatedFiles = readFilesRecursively(outputDir);
    const outputArray = Object.entries(generatedFiles).map(([fileName, content]) => ({
      name: fileName,
      content: content
    }));

    res.status(200).json({ files: outputArray });
    return;
  } catch (error) {
    console.error('Compilation failed:', error);
    res.status(500).json({
      error: 'Compilation failed',
      details: error instanceof Error ? error.message : String(error)
    });
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}));

export default router;