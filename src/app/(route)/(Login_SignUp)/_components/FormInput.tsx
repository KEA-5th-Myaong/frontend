import React, { useState } from 'react';
import { FieldValues, Path } from 'react-hook-form';
import { FormInputProps } from '../_types/forms';
import Icons from '../../../_components/ui/Icon';
import { EyeIcon, EyeSlashIcon } from '../../../_components/ui/iconPath';

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
          onClick={togglePasswordVisibility}
          className="absolute right-4 top-[62px] transform -translate-y-1/2"
        >
          <Icons name={showPassword ? EyeIcon : EyeSlashIcon} />
        </button>
      )}
      {error ? (
        <p className="form-error-text">{error.message}</p>
      ) : (
        infoText && <p className="text-gray-1 font-normal form-error-text">{infoText}</p>
      )}
    </div>
  );
}