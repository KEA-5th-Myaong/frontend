import React from 'react';
import { FieldValues, Path } from 'react-hook-form';
import { FormInputProps } from '../_types/forms';

export default function FormInput<T extends FieldValues>({
  id,
  label,
  placeholder,
  register,
  required,
  onBlur,
  type,
  error,
  isEssential,
  maxLength,
  minLength,
  infoText,
}: FormInputProps<T>) {
  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        {label} {isEssential && <p className="form-red-dot" />}
      </div>
      <input
        maxLength={maxLength}
        minLength={minLength}
        type={type}
        id={id as string}
        {...register(id as Path<T>, { required, onBlur })}
        className="mt-2 form-input"
        placeholder={placeholder}
      />

      {error ? (
        <p className="form-error-text">{error.message}</p>
      ) : (
        infoText && <p className="text-gray-1 font-normal form-error-text">{infoText}</p>
      )}
    </div>
  );
}

FormInput.defaultProps = {
  onBlur: undefined,
  type: undefined,
  error: undefined,
  isEssential: true,
  maxLength: undefined,
  minLength: 1,
  infoText: '',
};
