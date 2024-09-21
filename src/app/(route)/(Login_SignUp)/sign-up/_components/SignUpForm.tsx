'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import { FORM_CATCH_ERROR, FORM_ERROR, FORM_PLACEHOLDER, FORM_TEXT } from '../../_constants/forms';
import { SignUpState } from '../../_types/forms';
import FormInput from '../../_components/FormInput';

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    watch,
  } = useForm<SignUpState>({
    mode: 'onChange',
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 이메일 유효성 검사
  const validateEmail = (email: string): boolean => {
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

  // 이메일 중복 검사
  const checkEMailDuplicate = async (email: string) => {
    if (!validateEmail(email)) {
      return; // 유효성 검사를 통과하지 않으면 중복검사를 실행하지 않음
    }

    try {
      const response = await axios.get(`/api/check/mail?main=${email}`);
      if (response.data.isDuplicate) {
        setError('userEMail', {
          type: 'manual',
          message: FORM_ERROR[7],
        });
      } else {
        clearErrors('userEMail');
      }
    } catch {
      setError('userEMail', {
        type: 'manual',
        message: FORM_CATCH_ERROR[0],
      });
    }
  };

  // 아이디 유효성 검사
  const validateId = (id: string): boolean => {
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

  // 아이디 중복 검사
  const checkIdDuplicate = async (id: string) => {
    if (!validateId(id)) {
      return; // 유효성 검사를 통과하지 않으면 중복검사를 실행하지 않음
    }
    try {
      const response = await axios.get(`/api/check?id=${id}`);
      if (response.data.isDuplicate) {
        setError('userId', {
          type: 'manual',
          message: FORM_ERROR[5],
        });
      } else {
        clearErrors('userId'); // 중복 아니면 에러메시지 지움
      }
    } catch (error) {
      setError('userId', {
        type: 'manual',
        message: FORM_CATCH_ERROR[1],
      });
    }
  };

  // 비밀번호 유효성 검사
  const validatePwd = (pwd: string): boolean => {
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
  const userPwdValue = watch('userPwd');

  const validateCheckPwd = (checkPwd: string): boolean => {
    if (checkPwd !== userPwdValue) {
      setError('checkPwd', {
        type: 'manual',
        message: FORM_ERROR[11], // 비밀번호가 일치하지 않는 경우의 에러 메시지
      });
      return false;
    }
    clearErrors('checkPwd');
    return true;
  };

  // 회원 가입 api 호출
  const onSubmit = async (data: SignUpState) => {
    const response = await axios.post('/api/signup', data);
    console.log(response);
  };

  // 에러 객체에 값이 있는지 검사
  const isFormValid = Object.keys(errors).length === 0;

  // 폼 제출
  const handleFormSubmit = async (data: SignUpState) => {
    try {
      await onSubmit(data);
    } catch (error) {
      setErrorMessage(FORM_CATCH_ERROR[2]);
    }
  };

  return (
    <form className="flex flex-col gap-10 self-stretch" onSubmit={handleSubmit(handleFormSubmit)}>
      {/* 이름 input */}
      <FormInput<SignUpState>
        id="userName"
        label={FORM_TEXT[6]}
        placeholder={FORM_PLACEHOLDER[2]}
        register={register}
        required={FORM_ERROR[3]}
        error={errors.userName}
      />

      {/* 이메일 input */}
      <FormInput<SignUpState>
        id="userEMail"
        label={FORM_TEXT[7]}
        placeholder={FORM_PLACEHOLDER[3]}
        register={register}
        onBlur={(e) => checkEMailDuplicate(e.target.value)}
        type="email"
        error={errors.userEMail}
        required={FORM_ERROR[4]}
      />

      {/* 아이디 input */}
      <FormInput<SignUpState>
        id="userId"
        label={FORM_TEXT[1]}
        placeholder={FORM_PLACEHOLDER[0]}
        register={register}
        required={FORM_ERROR[0]}
        onBlur={(e) => checkIdDuplicate(e.target.value)}
        error={errors.userId}
        maxLength={10}
        infoText={FORM_TEXT[8]}
      />

      {/* 비밀번호 input */}
      <FormInput<SignUpState>
        id="userPwd"
        label={FORM_TEXT[2]}
        placeholder={FORM_PLACEHOLDER[1]}
        register={register}
        required={FORM_ERROR[1]}
        onBlur={(e) => validatePwd(e.target.value)}
        type="password"
        error={errors.userPwd}
        minLength={10}
        infoText={FORM_TEXT[9]}
      />

      {/* 비밀번호 확인 input */}
      <FormInput<SignUpState>
        id="checkPwd"
        label={FORM_TEXT[3]}
        placeholder={FORM_PLACEHOLDER[4]}
        register={register}
        required={FORM_ERROR[10]}
        onBlur={(e) => validateCheckPwd(e.target.value)}
        type="password"
        error={errors.checkPwd}
      />

      {/* 회원가입 button */}
      <div className="mt-[60px]">
        {errorMessage && <p className="form-error-text">{errorMessage}</p>}
        <button type="submit" className={`form-btn ${!isFormValid ? 'bg-gray-1' : ''}`} disabled={!isFormValid}>
          {FORM_TEXT[10]}
        </button>
      </div>
    </form>
  );
}
