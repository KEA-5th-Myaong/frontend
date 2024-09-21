import { UseFormSetError, UseFormClearErrors } from 'react-hook-form';
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
    setError('userEMail', {
      type: 'manual',
      message: FORM_ERROR[8],
    });
    return false;
  }
  clearErrors('userEMail');
  return true;
};

// 아이디 유효성 검사
export const validateId = (id: string, setError: UseFormSetError<SignUpState>): boolean => {
  const validIdRegex = /^(?=.*[a-z])(?=.*\d)[a-z\d]+$/;
  if (!validIdRegex.test(id)) {
    setError('userId', {
      type: 'manual',
      message: FORM_ERROR[6],
    });
    return false;
  }
  return true;
};

// 비밀번호 유효성 검사
export const validatePwd = (
  pwd: string,
  setError: UseFormSetError<SignUpState>,
  clearErrors: UseFormClearErrors<SignUpState>,
): boolean => {
  const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}:;?~<>]).{10,}$/;
  if (!pwdRegex.test(pwd)) {
    setError('userPwd', {
      type: 'manual',
      message: FORM_ERROR[9],
    });
    return false;
  }
  clearErrors('userPwd');
  return true;
};

// 비밀번호 체크
export const validateCheckPwd = (
  checkPwd: string,
  userPwdValue: string,
  setError: UseFormSetError<SignUpState>,
  clearErrors: UseFormClearErrors<SignUpState>,
): boolean => {
  if (checkPwd !== userPwdValue) {
    setError('checkPwd', {
      type: 'manual',
      message: FORM_ERROR[11],
    });
    return false;
  }
  clearErrors('checkPwd');
  return true;
};
