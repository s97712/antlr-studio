import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * @file This script makes a real API call to the local antlr-compiler function
 * and saves the response to a file. This provides high-fidelity mock data
 * for frontend testing.
 *
 * @pre-requisite The local development server must be running.
 */

// Data based on cypress/integration/antlr-compiler.spec.js
const requestBody = {
  grammars: [
    {
      name: 'MyLexer.g4',
      content: `lexer grammar MyLexer;

ID : [a-zA-Z]+ ;
INT : [0-9]+ ;
WS : [ \\t\\r\\n]+ -> skip ;`
    },
    {
      name: 'MyParser.g4',
      content: `parser grammar MyParser;

options { tokenVocab=MyLexer; }

prog: stat+;
stat: ID INT;`
    }
  ],
  mainGrammar: 'MyParser.g4'
};

const apiUrl = 'http://localhost:8888/.netlify/functions/antlr-compiler';

async function fetchAndSaveResponse() {
  console.log(`Sending request to ${apiUrl}...`);

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status} ${response.statusText}`);
    }

    const responseData = await response.json();
    console.log('Successfully received response from API.');

    const outputDir = path.resolve(__dirname, '..', 'apps', 'web', 'mocks');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, 'real-compiler-response.json');
    fs.writeFileSync(outputPath, JSON.stringify(responseData, null, 2));

    console.log(`Real response data saved to: ${outputPath}`);

  } catch (error) {
    console.error('Error fetching or saving API response:', error);
    console.error('\\nPlease ensure the local development server is running at http://localhost:5175.');
  }
}

fetchAndSaveResponse();