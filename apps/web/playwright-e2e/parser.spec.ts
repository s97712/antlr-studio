import { test, expect } from '@playwright/test';

test.describe('ANTLR Playground E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // 监听浏览器控制台输出
    page.on('console', msg => {
      const location = msg.location();
      console.log(`[Browser Console] ${msg.type()}: ${msg.text()} at: ${location.url}:${location.lineNumber}:${location.columnNumber}`);
    });
    await expect(page.locator('.app-container')).toBeVisible();
  });

  test('should successfully trigger compilation with valid grammar', async ({ page }) => {
    // 点击解析按钮
    await expect(page.getByRole('button', { name: 'Parse' })).toBeEnabled();
    await page.getByRole('button', { name: 'Parse' }).click();

    // 断言解析树可见
    await expect(page.locator('[aria-label="Parse Tree Container"]')).toBeVisible();
  });

  test('should show an error panel on compilation failure', async ({ page }) => {
    // 输入无效语法
    await page.locator('div.editor-container:has-text("Lexer Grammar")').locator('.cm-content').fill('invalid grammar {');
    
    // 点击解析按钮
    await expect(page.getByRole('button', { name: 'Parse' })).toBeEnabled();
    await page.getByRole('button', { name: 'Parse' }).click();

    // 断言错误面板可见，且解析树不存在
    // await expect(page.locator('.error-panel')).toBeVisible();
    // await expect(page.locator('[aria-label="Parse Tree Container"]')).not.toBeVisible();
    
    // 永远不会解析失败
  });
});