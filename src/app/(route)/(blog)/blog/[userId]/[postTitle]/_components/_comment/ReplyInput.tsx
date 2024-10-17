import { useState } from 'react';

interface ReplyInputProps {
  onSubmit: (content: string) => void;
}

export default function ReplyInput({ onSubmit }: ReplyInputProps) {
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(content);
      setContent('');
    }
  };

  return (
    <div className="flex flex-col mt-4 gap-[10px] ml-10">
      <textarea
        className="resize-none px-[18px] py-[10px] w-full border min-h-[104px] rounded-lg placeholder:text-gray-3"
        placeholder="답글을 작성해주세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="button" className="self-end px-[21.5px] py-[7.5px] primary-1-btn" onClick={handleSubmit}>
        답글 등록
      </button>
    </div>
  );
}
