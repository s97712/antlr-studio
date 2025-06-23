import { test, expect } from '@playwright/test';

test('验证解析树文本表示是否正确', async ({ page }) => {
  // 1. 导航到应用页面
  await page.goto('http://localhost:5175');
  
  // 2. 获取语法和输入内容
  const grammar = await page.locator('text="ANTLR 语法"').evaluate(el => {
    const editor = el.nextElementSibling?.querySelector('.view-lines');
    return editor?.textContent;
  });
  
  const input = await page.locator('text="输入文本"').evaluate(el => {
    const editor = el.nextElementSibling?.querySelector('.view-lines');
    return editor?.textContent;
  });
  
  // 3. 模拟解析过程
  await page.click('button:has-text("解析")');
  
  // 4. 检查隐藏文本层内容
  const hiddenText = await page.locator('[data-testid="parse-tree-text"]').textContent();
  
  // 验证文本内容不为空
  expect(hiddenText).toBeTruthy();
  
  // 打印文本内容用于验证
  console.log('解析树文本表示:', hiddenText);
});