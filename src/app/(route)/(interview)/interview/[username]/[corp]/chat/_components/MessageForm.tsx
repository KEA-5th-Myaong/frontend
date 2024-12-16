import { useEffect, useRef, useState } from 'react';
import Icons from '../../../../../../../_components/ui/Icon';
import { ArrowIcon } from '../../../../../../../_components/ui/iconPath';

interface MessageFormProps {
  onSubmit: (message: string) => void;
  disabled: boolean;
}

export default function MessageForm({ onSubmit, disabled }: MessageFormProps) {
  const [newMessage, setNewMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // 이전 설정 높이 리셋
      // Math.min 함수를 사용하여 scrollHeight와 160px 중 작은 값을 선택
      // scrollHeight는 textarea의 내용을 모두 표시하는 데 필요한 높이
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  }, [newMessage]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (newMessage.trim()) {
      onSubmit(newMessage);
      setNewMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // e.nativeEvent.isComposing은 입력한 한글이 조합중인지 검사
    // Enter를 누르는 순간 한글 조합은 false가 됨, && 연산자는 왼쪽부터 실행
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault(); // 새 줄 입력 방지
      handleSubmit();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex items-center py-2 w-full border text-black-0 dark:border-gray-5 border-primary-1 rounded-xl mt-auto ${disabled ? 'bg-gray-4' : 'bg-white-0'}`}
    >
      <textarea
        ref={textareaRef}
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className="flex-grow pl-5 md:pl-8 pr-2 py-2 focus:outline-none rounded-xl resize-none hide-scrollbar
         max-h-[160px] overflow-y-auto"
        placeholder={disabled ? '다음 질문을 생성해주세요' : '답변을 입력해주세요'}
      />
      <button type="submit" tabIndex={-1} className="pr-2 sm:pr-3 md:pr-4 cursor-pointer">
        <Icons className="rotate-180 border rounded-full" name={ArrowIcon} />
      </button>
    </form>
  );
}
