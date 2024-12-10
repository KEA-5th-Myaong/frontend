import { UseFormRegister, FieldValues, Path } from 'react-hook-form';
import Icons from '@/app/_components/ui/Icon';
import { RequiredIcon } from '@/app/_components/ui/iconPath';

interface InputProps<T extends FieldValues> {
  element: 'input' | 'textarea';
  label: string;
  size: 'sm' | 'lg';
  color?: 'transparent' | 'white';
  type: React.HTMLInputTypeAttribute | 'date';
  pattern?: 'grade' | string;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  name: Path<T>;
  register: UseFormRegister<T>;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
}

export default function Input<T extends FieldValues>({
  element,
  label,
  size,
  color,
  type,
  pattern,
  placeholder,
  maxLength,
  name,
  register,
  onClick,
  required,
}: InputProps<T>) {
  const inputWidth = size === 'sm' ? 'w-[260px]' : 'w-full';
  const background = color === 'white' ? 'bg-white-0' : 'bg-transparent';

  // 학점 패턴 정의
  const gradePattern = '^\\d(\\.\\d{1,2})?/[0-4](\\.\\d{1,2})?$';

  return (
    <div className="my-2.5">
      <div className="flex items-center">
        {required && <Icons name={RequiredIcon} />}
        <label className="text-sm font-semibold ml-[5px]">{label}</label>
      </div>
      {element === 'input' ? (
        <input
          {...register(name, { required })}
          type={type}
          placeholder={placeholder}
          pattern={pattern === 'grade' ? gradePattern : pattern || undefined}
          maxLength={maxLength}
          onClick={(event: React.MouseEvent<HTMLInputElement>) => {
            if (onClick) onClick(event);
          }}
          required={required}
          className={`${inputWidth} ${background} mt-[8px] px-[20px] py-[12px] text-sm font-semibold text-black-0 border border-gray-5 rounded-[10px] focus:outline-none focus:border-primary-1 focus:border-[2px]`}
        />
      ) : (
        <textarea
          {...register(name, { required })}
          placeholder={placeholder}
          required={required}
          maxLength={maxLength}
          className={`${inputWidth} ${background}  resize-none h-[110px] mt-[8px] px-[20px] py-[12px] text-black-0 border border-gray-5 rounded-[10px] focus:outline-none focus:border-primary-1 focus:border-[2px]`}
        />
      )}
    </div>
  );
}