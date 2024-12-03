import { FieldError, FieldValues, UseFormRegister } from 'react-hook-form';

export interface LoginState {
  username: string;
  password: string;
}

export interface SignUpState extends LoginState {
  name: string;
  nickname: string;
  confirmPassword: string;
  email: string;
}

export interface ChangePwdProps {
  userPwd: string;
  checkPwd: string;
}

export interface FormInputProps<T extends FieldValues> {
  id: keyof T;
  label: string;
  placeholder: string;
  register: UseFormRegister<T>;
  required: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  type?: string;
  error?: FieldError;
  isEssential?: boolean;
  maxLength?: number;
  minLength?: number;
  infoText?: string;
  value?: string | number | undefined;

  isEdit?: boolean; // 수정 아이콘
  isDisabled?: boolean;
  onEditClick?: () => void;
}
