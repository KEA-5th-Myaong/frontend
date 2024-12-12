import { UseFormSetError, UseFormClearErrors, FieldPath, Path } from 'react-hook-form';
import { SignUpState } from '../_types/forms';
import { FORM_ERROR } from '../_constants/forms';

// 이메일 유효성 검사
export const validateEmail = (
  email: string,
  setError: UseFormSetError<SignUpState>,
  clearErrors: UseFormClearErrors<SignUpState>,
): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    setError('email', {
      type: 'manual',
      message: FORM_ERROR[8],
    });
    return false;
  }
  clearErrors('email');
  return true;
};

// 아이디 유효성 검사
export const validateId = (id: string, setError: UseFormSetError<SignUpState>): boolean => {
  const validIdRegex = /^(?=.*[a-z])(?=.*\d)[a-z\d]{6,}$/;
  if (!validIdRegex.test(id)) {
    setError('username', {
      type: 'manual',
      message: FORM_ERROR[6],
    });
    return false;
  }
  return true;
};

// 비밀번호 유효성 검사, 제네릭 타입 T에 대해 필요한 속성을 extends로 명시
// 제네릭을 사용하여 T 자리에 모든 인터페이스가 들어갈 수 있음
export const validatePwd = <T extends { password: string }>(
  pwd: string,
  setError: UseFormSetError<T>,
  clearErrors: UseFormClearErrors<T>,
): boolean => {
  const pwdRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?])[A-Za-z\d!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?]{8,20}$/;
  if (!pwdRegex.test(pwd)) {
    setError('password' as FieldPath<T>, {
      type: 'manual',
      message: FORM_ERROR[9],
    });
    return false;
  }
  clearErrors('password' as FieldPath<T>);
  return true;
};

interface PasswordFormFields {
  password?: string;
  confirmPassword?: string;
  newPassword?: string;
  originPassword?: string;
}

// 비밀번호 체크, 제네릭 타입 T에 대해 필요한 속성을 extends로 명시
// 제네릭을 사용하여 T 자리에 모든 인터페이스가 들어갈 수 있음
export const validateCheckPwd = <T extends PasswordFormFields>(
  confirmPassword: string,
  userPwdValue: string,
  setError: UseFormSetError<T>,
  clearErrors: UseFormClearErrors<T>,
  checkPasswordField: Path<T>,
): boolean => {
  if (confirmPassword !== userPwdValue) {
    setError(checkPasswordField, {
      type: 'manual',
      message: FORM_ERROR[11],
    });
    return false;
  }
  clearErrors(checkPasswordField);
  return true;
};
