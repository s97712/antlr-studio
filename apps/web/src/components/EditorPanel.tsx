import React, { useEffect, useRef } from 'react';
import { basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { indentWithTab } from '@codemirror/commands';
import { antlrLanguage } from '@/grammar/components/antlrLanguage';
import { ViewUpdate } from '@codemirror/view';
import { oneDark } from '@codemirror/theme-one-dark'; // Import dark theme
import { EditorView as EditorViewTheme } from '@codemirror/view'; // Import light theme

interface EditorPanelProps {
  value: string;
  onChange: (value: string) => void;
  language?: 'antlr' | 'text';
  readOnly?: boolean;
  isDarkMode: boolean; // New property: whether it is dark mode
}

const EditorPanel: React.FC<EditorPanelProps> = ({
  value,
  onChange,
  language = 'antlr',
  readOnly = false,
  isDarkMode // Receive isDarkMode property
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const editorViewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    if (!editorRef.current) return;

    // Select highlight extension based on language
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
        isDarkMode ? oneDark : EditorViewTheme.theme({}), // Apply theme based on isDarkMode
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
  }, [language, readOnly, isDarkMode]); // Add isDarkMode to dependencies

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