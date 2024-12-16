import { v4 } from 'uuid';

interface PSEditingBoxProps {
  label: string;
  content: string;
  isEditing?: boolean;
}

export default function PSEditingBox({ label, content, isEditing }: PSEditingBoxProps) {
  const formatContent = (text: string) => {
    const parts = text?.split(/(\*\*.*?\*\*)/); // 정규 표현식을 사용하여 **로 둘러싸인 부분을 찾음
    return parts?.map((part) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <span key={v4()} className="text-[#FFBF84]">
            {part.slice(2, -2)}
          </span>
        );
      }
      return <span key={v4()}>{part}</span>;
    });
  };

  return (
    <div
      className={`w-full bg-primary-0 dark:bg-black-4 dark:border-black-5 rounded-[10px] pt-10 sm:pt-12 pb-9 sm:pb-28 px-5 border ${isEditing ? 'border-[#58E0FF]' : 'border-primary-0'}`}
    >
      <p className="font-semibold pb-[18px]">{label}</p>
      <div className="bg-white-0 dark:text-black-0 px-4 pt-5 pb-8 sm:p-7 h-72 sm:h-[412px] overflow-scroll hide-scrollbar leading-[25px]">
        {formatContent(content)}
      </div>
    </div>
  );
}
