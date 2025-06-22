import React, { useEffect, useRef } from 'react';
import { basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { indentWithTab } from '@codemirror/commands';
import { syntaxHighlighting } from '@codemirror/language';
import { antlrGrammarSyntax } from '@/components/antlrSyntax';
import { ViewUpdate } from '@codemirror/view';

interface EditorPanelProps {
  value: string;
  onChange: (value: string) => void;
  language?: 'antlr' | 'text';
  readOnly?: boolean;
}

const EditorPanel: React.FC<EditorPanelProps> = ({ 
  value, 
  onChange,
  language = 'antlr',
  readOnly = false
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
        language === 'antlr' ? syntaxHighlighting(antlrGrammarSyntax) : [],
        EditorView.updateListener.of((update: ViewUpdate) => {
          if (update.docChanged) {
            const newValue = update.state.doc.toString();
            onChange(newValue);
          }
        }),
        EditorState.readOnly.of(readOnly),
        EditorView.editable.of(!readOnly)
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
  }, [language, readOnly, value, onChange]);

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