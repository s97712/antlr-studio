import React, { useEffect, useRef } from 'react';
import { basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { indentWithTab } from '@codemirror/commands';
import { antlrLanguage } from '@/grammar/components/antlrLanguage';
import { ViewUpdate } from '@codemirror/view';
import { oneDark } from '@codemirror/theme-one-dark'; // 导入暗色主题
import { EditorView as EditorViewTheme } from '@codemirror/view'; // 导入亮色主题

interface EditorPanelProps {
  value: string;
  onChange: (value: string) => void;
  language?: 'antlr' | 'text';
  readOnly?: boolean;
  isDarkMode: boolean; // 新增属性：是否为暗色模式
}

const EditorPanel: React.FC<EditorPanelProps> = ({
  value,
  onChange,
  language = 'antlr',
  readOnly = false,
  isDarkMode // 接收 isDarkMode 属性
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const editorViewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    if (!editorRef.current) return;

    // 根据语言选择高亮扩展
    const state = EditorState.create({
      doc: value,
      extensions: [
        basicSetup,
        keymap.of([indentWithTab]),
        language === 'antlr' ? [antlrLanguage] : [],
        EditorView.updateListener.of((update: ViewUpdate) => {
          if (update.docChanged) {
            const newValue = update.state.doc.toString();
            onChange(newValue);
          }
        }),
        EditorState.readOnly.of(readOnly),
        EditorView.editable.of(!readOnly),
        isDarkMode ? oneDark : EditorViewTheme.theme({}), // 根据 isDarkMode 应用主题
      ]
    });

    const view = new EditorView({
      state,
      parent: editorRef.current
    });

    editorViewRef.current = view;

    return () => {
      view.destroy();
      editorViewRef.current = null;
    };
  }, [language, readOnly, isDarkMode]); // 将 isDarkMode 添加到依赖项

  useEffect(() => {
    if (editorViewRef.current && editorViewRef.current.state.doc.toString() !== value) {
      editorViewRef.current.dispatch({
        changes: {
          from: 0,
          to: editorViewRef.current.state.doc.length,
          insert: value
        }
      });
    }
  }, [value]);

  return (
    <div className="editor-panel" ref={editorRef} />
  );
};

export default EditorPanel;