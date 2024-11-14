import { useRef, useEffect } from 'react';

interface UseContainerHeightResult {
  chatContainerRef: React.RefObject<HTMLDivElement>;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
}

export default function useContainerHeight(editMessageId?: string | null): UseContainerHeightResult {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // 채팅 컨테이너의 높이를 조정
    const adjustHeight = () => {
      // 컴포넌트가 마운트되었는지 확인
      if (chatContainerRef.current) {
        const viewportHeight = window.innerHeight; // 현재 뷰포트의 높이를 가져옴
        const containerTop = chatContainerRef.current.offsetTop; // 채팅 컨테이너의 상단 위치를 가져옴
        // 채팅 컨테이너의 높이를 설정
        // 뷰포트 높이에서 컨테이너 상단 위치를 빼고, 추가로 20px를 빼기(하단 여백용)
        const newHeight = viewportHeight - containerTop - 20;
        chatContainerRef.current.style.height = `${newHeight}px`;
      }
    };

    window.addEventListener('resize', adjustHeight); // 화면 크기가 변경될 때마다 높이 조정
    adjustHeight();

    return () => window.removeEventListener('resize', adjustHeight); // 이벤트 리스너를 제거하여 메모리 누수 방지
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [editMessageId]);

  return { chatContainerRef, textareaRef };
}
