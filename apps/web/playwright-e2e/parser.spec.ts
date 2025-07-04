import { test, expect } from '@playwright/test';

test.describe('ANTLR Playground E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.app-container')).toBeVisible();
  });

  test('should successfully trigger compilation with valid grammar', async ({ page }) => {
    // 监听浏览器控制台输出
    page.on('console', msg => console.log(`[Browser Console] ${msg.type()}: ${msg.text()}`));

    // 在编辑器中输入语法
    await page.locator('.editor-container .editor-panel .cm-content').first().fill(`grammar Hello;
    r  : 'hello' ID ;
    ID : [a-z]+ ;
    WS : [ \\t\\r\\n]+ -> skip;`);
    
    // 填充起始规则
    await page.locator('[aria-label="输入起始规则"]').fill('prog');

    // 点击解析按钮
    await page.getByRole('button', { name: '解析语法' }).click();

    // 断言解析树可见
    await expect(page.locator('[aria-label="解析树容器"]')).toBeVisible();
  });

  test('should show an error panel on compilation failure', async ({ page }) => {
    // 模拟 API 失败响应
    await page.route('/.netlify/functions/antlr-compiler', async route => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({
          error: 'Compilation failed',
          details: 'This is a mocked error from the test.',
        }),
      });
    });

    // 输入无效语法
    await page.locator('.editor-container .editor-panel .cm-content').first().fill('invalid grammar {');
    
    // 点击解析按钮
    await page.getByRole('button', { name: '解析语法' }).click();

    // 断言错误面板可见，且解析树不存在
    await expect(page.locator('.error-panel')).toBeVisible();
    await expect(page.locator('[aria-label="解析树容器"]')).not.toBeVisible();
  });
});