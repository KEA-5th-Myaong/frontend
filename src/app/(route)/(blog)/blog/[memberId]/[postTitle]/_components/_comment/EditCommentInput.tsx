import { useState } from 'react';

interface EditCommentInputProps {
  initialContent: string;
  onSubmit: (content: string) => void;
}

export default function EditCommentInput({ initialContent, onSubmit }: EditCommentInputProps) {
  const [content, setContent] = useState(initialContent);

  const handleSubmit = () => {
    // 사용자가 공백만 입력하고 제출하는 것을 방지
    if (content.trim()) {
      onSubmit(content);
    }
  };

  return (
    <div className="flex flex-col mt-4 gap-2.5 ml-10">
      <textarea
        className="resize-none px-[18px] py-2.5 w-full border min-h-[104px] rounded-[15px] placeholder:text-gray-3 focus:outline-none"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        maxLength={255}
      />
      <button type="button" className="self-end px-[21.5px] py-[7.5px] primary-1-btn" onClick={handleSubmit}>
        수정 완료
      </button>
    </div>
  );
}
