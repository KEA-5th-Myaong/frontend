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
  onChange,
  onBlur = undefined,
  type = undefined,
  error = undefined,
  isEssential = true,
  maxLength = undefined,
  minLength = 1,
  infoText = '',
  isEdit = false,
  isDisabled = false,
  onEditClick,
  value,
}: FormInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const isPassword = type === 'password';

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleBlur = React.useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      if (onBlur) {
        onBlur(e);
      }
    },
    [onBlur],
  );

  const handleFocus = React.useCallback(() => {
    setIsFocused(true);
  }, []);

  // register에서 반환되는 ref, onChange, onBlur 등을 보존하면서 추가 핸들러를 적용
  const customRegister = {
    ...register(id as Path<T>, {
      required,
      onBlur: handleBlur,
    }),
    onFocus: handleFocus,
  };
  // value prop이 존재할 때만 value 속성을 포함시키는 inputProps 객체 생성
  const inputProps = {
    maxLength,
    minLength,
    type: isPassword ? (showPassword ? 'text' : 'password') : type,
    id: id as string,
    className: `mt-2 form-input  ${isFocused && 'focused'}`,
    onChange,
    placeholder,
    disabled: isDisabled,
    ...(value !== undefined && { value }), // value가 undefined가 아닐 때만 포함
  };
  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        {label} {isEssential && <p className="form-red-dot" />}
      </div>
      <input {...inputProps} {...customRegister} />
      {isPassword && (
        <div
          tabIndex={-1} // 눈 아이콘에 focus가 생기지 않도록
          onClick={togglePasswordVisibility}
          className="absolute right-4 top-[62px] transform -translate-y-1/2"
        >
          <Icons name={showPassword ? EyeIcon : EyeSlashIcon} />
        </div>
      )}

      {isEdit && (
        <Icons
          onClick={onEditClick}
          className="absolute right-4 top-[62px] transform -translate-y-1/2"
          name={EditIcon}
        />
      )}
      {error ? (
        <p className="form-error-text">{error.message}</p>
      ) : (
        infoText && <p className="text-gray-1 font-normal form-error-text">{infoText}</p>
      )}
    </div>
  );
}
