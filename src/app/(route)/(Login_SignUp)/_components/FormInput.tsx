import React, { useState } from 'react';
import { FieldValues, Path } from 'react-hook-form';
import { FormInputProps } from '../_types/forms';
import Icons from '../../../_components/ui/Icon';
import { EditIcon, EyeIcon, EyeSlashIcon } from '../../../_components/ui/iconPath';

export default function FormInput<T extends FieldValues>({
  id,
  label,
  placeholder,
  register,
  required,
  onBlur = undefined,
  type = undefined,
  error = undefined,
  isEssential = true,
  maxLength = undefined,
  minLength = 1,
  infoText = '',
  isEdit,
}: FormInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        {label} {isEssential && <p className="form-red-dot" />}
      </div>
      <input
        maxLength={maxLength}
        minLength={minLength}
        type={isPassword ? (showPassword ? 'text' : 'password') : type}
        id={id as string}
        {...register(id as Path<T>, { required, onBlur })}
        className="mt-2 form-input"
        placeholder={placeholder}
      />
      {isPassword && (
        <button
          type="button"
          tabIndex={-1} // 눈 아이콘에 focus가 생기지 않도록
          onClick={togglePasswordVisibility}
          className="absolute right-4 top-[62px] transform -translate-y-1/2"
        >
          <Icons name={showPassword ? EyeIcon : EyeSlashIcon} />
        </button>
      )}

      {isEdit && <Icons className="absolute right-4 top-[62px] transform -translate-y-1/2" name={EditIcon} />}
      {error ? (
        <p className="form-error-text">{error.message}</p>
      ) : (
        infoText && <p className="text-gray-1 font-normal form-error-text">{infoText}</p>
      )}
    </div>
  );
}
