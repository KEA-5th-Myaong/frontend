'use client';

import dynamic from 'next/dynamic';
import { useRef, useEffect } from 'react';
import { Editor as EditorType } from '@toast-ui/react-editor';

const Editor = dynamic(() => import('@toast-ui/react-editor').then((mod) => mod.Editor), {
  ssr: false,
  loading: () => <div className="w-full h-60 bg-gray-200 rounded-md animate-pulse" />,
});

interface ToastEditorProps {
  initialValue?: string;
  onChange?: (value: string) => void;
  className?: string;
}

function ToastEditor({ initialValue = '', onChange, className }: ToastEditorProps) {
  const editorRef = useRef<EditorType>(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.getInstance().setMarkdown(initialValue);
    }
  }, [initialValue]);

  const handleChange = () => {
    if (onChange && editorRef.current) {
      const instance = editorRef.current.getInstance();
      onChange(instance.getMarkdown());
    }
  };

  return (
    <Editor
      className={className}
      ref={editorRef}
      initialValue={initialValue}
      previewStyle="vertical"
      initialEditType="wysiwyg"
      useCommandShortcut
      onChange={handleChange}
    />
  );
}

export default ToastEditor;
