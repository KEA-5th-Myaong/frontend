'use client';

import { useRef, useEffect } from 'react';
import { Editor } from '@toast-ui/react-editor'; // Toast UI Editor의 React 래퍼 컴포넌트

interface ToastEditorProps {
  initialValue: string;
  onChange: (value: string) => void;
  height: string;
  handleImage: (blob: File, callback: (url: string) => void) => Promise<void>;
}

export default function ToastEditor({ initialValue = '', onChange, height, handleImage }: ToastEditorProps) {
  const editorRef = useRef<Editor>(null);

  // 컴포넌트가 마운트된 후 에디터의 change 이벤트 리스너를 설정
  useEffect(() => {
    const instance = editorRef.current?.getInstance();
    if (instance) {
      // change 이벤트 리스너 등록
      instance.on('change', () => {
        // 변경된 내용을 HTML 형식으로 가져옴
        const content = instance.getHTML();
        // 상위 컴포넌트로 변경된 내용을 전달
        onChange?.(content);
      });
    }
    // 클린업 함수(메모리 누수 방지)
    return () => {
      instance?.off('change');
    };
  }, [onChange]);

  return (
    <Editor
      ref={editorRef}
      initialValue={initialValue}
      initialEditType="wysiwyg" // 기본 모드를 위지윅으로 지정
      hideModeSwitch // 마크다운으로 전환하지 못하게
      height={height}
      useCommandShortcut // 키보드 단축키 사용 활성화
      hooks={{ addImageBlobHook: handleImage }}
    />
  );
}
