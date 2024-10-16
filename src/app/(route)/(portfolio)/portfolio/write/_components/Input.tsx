import Icons from '@/app/_components/ui/Icon';
import { RequiredIcon } from '@/app/_components/ui/iconPath';

interface InputProps {
  element: 'input' | 'textarea';
  label: string;
  size: 'sm' | 'lg';
  color?: 'transparent' | 'white';
  type: React.HTMLInputTypeAttribute | 'date';
  pattern?: 'grade' | string;
  placeholder?: string;
  required?: boolean;
  maxLength?: number; // maxLength 추가
}

export default function Input({
  element,
  label,
  size,
  color,
  type,
  pattern,
  placeholder,
  maxLength,
  required,
}: InputProps) {
  const inputWidth = size === 'sm' ? 'w-[260px]' : 'w-full';
  const background = color === 'white' ? 'bg-white-0' : 'bg-transparent';

  // 학점 패턴 정의
  const gradePattern = '^\\d(\\.\\d{1,2})?/[0-4](\\.\\d{1,2})?$';

  return (
    <div className="my-[10px]">
      <div className="flex items-center">
        {required && <Icons name={RequiredIcon} />}
        <label className="text-[14px] font-semibold ml-[5px]">{label}</label>
      </div>
      {element === 'input' ? (
        <input
          type={type}
          placeholder={placeholder}
          pattern={pattern === 'grade' ? gradePattern : pattern || undefined}
          maxLength={maxLength}
          required={required}
          className={`${inputWidth} ${background} mt-[8px] px-[20px] py-[12px] text-[14px] font-semibold text-black-0 border border-[1px] border-gray-5 rounded-[10px] focus:outline-none focus:border-primary-4 focus:border-[2px]`}
        />
      ) : (
        <textarea
          placeholder={placeholder}
          required={required}
          maxLength={maxLength}
          className={`${inputWidth} ${background} h-[110px] mt-[8px] px-[20px] py-[12px] text-black-0 border border-[1px] border-gray-5 rounded-[10px] focus:outline-none focus:border-primary-4 focus:border-[2px]`}
        />
      )}
    </div>
  );
}
