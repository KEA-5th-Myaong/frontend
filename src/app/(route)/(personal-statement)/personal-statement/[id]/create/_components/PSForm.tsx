import { UseFormRegister } from 'react-hook-form';
import { PSFormData } from '../_types/psCreate';

interface FormFieldProps {
  label: string;
  name: keyof PSFormData;
  register: UseFormRegister<PSFormData>;
  placeholder: string;
  isTextarea?: boolean;
  maxLength?: number;
  value?: string;
}

export default function PSForm({ name, label, isTextarea, value, maxLength, register, placeholder }: FormFieldProps) {
  return (
    <label htmlFor={name} className="ps-label">
      <div className="flex justify-between w-full">
        {label}
        {isTextarea && (
          <p>
            {value?.length || 0}/{maxLength}
          </p>
        )}
      </div>

      {!isTextarea ? (
        <input
          {...register(name, { required: true })}
          id={name}
          className="py-[10px] ps-input"
          placeholder={placeholder}
        />
      ) : (
        <textarea
          {...register(name, { required: true })}
          id={name}
          maxLength={maxLength}
          className={`resize-none ${name === 'reason' ? 'h-32' : 'h-64'}  py-4 whitespace-pre-wrap ps-input`}
          placeholder={placeholder}
        />
      )}
    </label>
  );
}
