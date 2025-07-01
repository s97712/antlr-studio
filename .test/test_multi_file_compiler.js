// ESM-only `node-fetch` needs to be dynamically imported in a CJS file.
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// 1. 定义多文件语法
const grammars = [
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
];

// 2. 修改请求体
async function test() {
    try {
        const response = await fetch('http://localhost:8888/.netlify/functions/antlr-compiler', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                grammars: grammars,
                mainGrammar: 'MyParser.g4'
            })
        });

        const result = await response.json();

        if (response.ok) {
            console.log('Successfully generated files:');
            result.files.forEach(file => {
                console.log(`- ${file.name}`);
                // console.log(file.content); // 取消注释以查看文件内容
            });
        } else {
            console.error('Error:', result.error);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

test();