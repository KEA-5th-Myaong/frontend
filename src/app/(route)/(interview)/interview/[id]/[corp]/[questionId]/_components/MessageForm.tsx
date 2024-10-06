import { useState } from 'react';
import Icons from '../../../../../../../_components/ui/Icon';
import { ArrowIcon } from '../../../../../../../_components/ui/iconPath';

interface MessageFormProps {
  onSubmit: (message: string) => void;
}

export default function MessageForm({ onSubmit }: MessageFormProps) {
  const [newMessage, setNewMessage] = useState('');

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (newMessage.trim()) {
      onSubmit(newMessage);
      setNewMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // 새 줄 입력 방지
      handleSubmit();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center py-2 h-[90px] w-full border border-primary-1 rounded-xl mt-auto bg-white-0"
    >
      <textarea
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-grow pl-5 md:pl-8 pr-2 focus:outline-none rounded-xl resize-none hide-scrollbar"
        placeholder="답변을 입력해주세요"
      />
      <button type="submit" tabIndex={-1} className="pr-2 sm:pr-3 md:pr-4 cursor-pointer">
        <Icons className="rotate-180 border rounded-full" name={ArrowIcon} />
      </button>
    </form>
  );
}
