'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import { FORM_CATCH_ERROR, FORM_ERROR, FORM_TEXT } from '../../_constants/forms';
import { SignUpState } from '../../_types/forms';

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
    const validIdRegex = /^[a-z0-9]+$/;
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
        message: FORM_ERROR[10],
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
        message: FORM_ERROR[12], // 비밀번호가 일치하지 않는 경우의 에러 메시지
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
    <form className="flex flex-col gap-4 self-stretch" onSubmit={handleSubmit(handleFormSubmit)}>
      {/* 이름 input */}
      <div>
        <label htmlFor="userName" className="form-label">
          <div className="flex items-center gap-2">
            {FORM_TEXT[6]} <p className="form-red-dot" />
          </div>
          <input id="userName" {...register('userName', { required: FORM_ERROR[3] })} className="mt-2 form-input" />
        </label>
        {errors.userName && <p className="form-error-text">{errors.userName.message}</p>}
      </div>

      {/* 이메일 input */}
      <div>
        <label htmlFor="userEMail" className="form-label">
          <div className="flex items-center gap-2">
            {FORM_TEXT[7]} <p className="form-red-dot" />
          </div>
          <input
            type="email"
            id="userEMail"
            {...register('userEMail', { required: FORM_ERROR[4], onBlur: (e) => checkEMailDuplicate(e.target.value) })}
            className="mt-2 form-input"
          />
        </label>
        {errors.userEMail && <p className="form-error-text">{errors.userEMail.message}</p>}
      </div>

      {/* 아이디 input */}
      <div>
        <label htmlFor="userId" className="form-label">
          <div className="flex items-center gap-2">
            {FORM_TEXT[1]} <p className="form-red-dot" />
          </div>
          <input
            maxLength={10}
            id="userId"
            {...register('userId', { required: FORM_ERROR[0], onBlur: (e) => checkIdDuplicate(e.target.value) })}
            className="mt-2 form-input"
          />
        </label>
        {errors.userId ? (
          <p className="form-error-text">{errors.userId.message}</p>
        ) : (
          <p className="mt-1 text-xs text-gray-3">{FORM_TEXT[9]}</p>
        )}
      </div>

      {/* 비밀번호 input */}
      <div>
        <label htmlFor="userPwd" className="form-label">
          <div className="flex items-center gap-2">
            {FORM_TEXT[2]} <p className="form-red-dot" />
          </div>
          <input
            type="password"
            minLength={10}
            id="userPwd"
            {...register('userPwd', { required: FORM_ERROR[9], onBlur: (e) => validatePwd(e.target.value) })}
            className="mt-2 form-input"
          />
        </label>
        {errors.userPwd ? (
          <p className="form-error-text">{errors.userPwd.message}</p>
        ) : (
          <p className="mt-1 text-xs text-gray-3">{FORM_TEXT[10]}</p>
        )}
      </div>

      {/* 비밀번호 확인 input */}
      <div>
        <label htmlFor="checkPwd" className="form-label">
          <div className="flex items-center gap-2">
            {FORM_TEXT[8]} <p className="form-red-dot" />
          </div>
          <input
            type="password"
            id="checkPwd"
            {...register('checkPwd', { required: FORM_ERROR[11], onBlur: (e) => validateCheckPwd(e.target.value) })}
            className="mt-2 form-input"
          />
        </label>
        {errors.checkPwd && <p className="form-error-text">{errors.checkPwd.message}</p>}
      </div>

      {/* 회원가입 button */}
      <div className="mt-8">
        {errorMessage && <p className="form-error-text">{errorMessage}</p>}
        <button type="submit" className={`form-btn ${!isFormValid ? 'bg-gray-2' : ''}`} disabled={!isFormValid}>
          {FORM_TEXT[0]}
        </button>
      </div>
    </form>
  );
}
