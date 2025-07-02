import { useState, useEffect } from 'react';

/**
 * 一个自定义 React Hook，用于管理和切换应用的亮/暗主题模式。
 * 它会同步将当前模式应用到 `document.body` 的 class 上。
 * @param {boolean} [initialValue=true] - 初始的主题模式，`true` 为暗色模式，`false` 为亮色模式。
 * @returns {[boolean, () => void]} 返回一个元组，包含：
 * - `isDarkMode` (boolean): 当前是否为暗色模式。
 * - `toggleDarkMode` (function): 一个用于切换主题模式的函数。
 */
export const useDarkMode = (initialValue: boolean = true): [boolean, () => void] => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(initialValue);

  // 当 isDarkMode 状态变化时，同步更新 body 的 class
  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return [isDarkMode, toggleDarkMode];
};