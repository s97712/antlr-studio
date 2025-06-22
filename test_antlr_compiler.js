
const grammar = `
grammar Hello;
r  : 'hello' ID ;
ID : [a-z]+ ;
WS : [ \\t\\r\\n]+ -> skip ;
`;

async function testCompiler() {
  const grammarName = grammar.match(/grammar\s+(\w+);/)[1];
  const url = 'http://localhost:8888/.netlify/functions/antlr-compiler';
  
  let response;
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grammar,
        language: 'JavaScript',
        grammarName
      }),
      timeout: 30000 // 30秒超时
    });
  } catch (error) {
    console.error(`请求失败: ${error.message}`);
    return;
  }

  console.log('Status:', response.status);
  console.log('Headers:', Object.fromEntries(response.headers));
  
  if (response.ok) {
    const data = await response.json();
    
    // 过滤掉调试文件，只显示生成的语法文件
    const generatedFiles = data
      .filter(file =>
        !file.fileName.startsWith('_') &&
        (file.fileName.endsWith('.ts') || file.fileName.endsWith('.js'))
      )
      .map(file => file.fileName);
    
    console.log('Generated Files:', generatedFiles);
    console.log('生成文件总数:', generatedFiles.length);
    
    // 打印所有文件的内容预览
    data.forEach(file => {
      console.log(`\n文件: ${file.fileName}`);
      console.log(`完整内容:\n${file.content}`);
    });
  } else {
    const error = await response.text();
    console.error('错误详情:', error);
  }
}

testCompiler().catch(console.error);