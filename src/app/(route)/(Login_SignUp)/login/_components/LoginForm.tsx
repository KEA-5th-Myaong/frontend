'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import { FORM_ERROR, FORM_TEXT } from '../../_constants/forms';
import { LoginState } from '../../_types/forms';

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginState>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: LoginState) => {
    const response = await axios.post('/api/login', data); // 임시 api 주소
    console.log(response); // 콘솔로그는 나중에 제거
  };

  const handleFormSubmit = async (data: LoginState) => {
    try {
      await onSubmit(data);
    } catch (error) {
      setErrorMessage(FORM_ERROR[2]);
    }
  };

  return (
    <form className="flex flex-col gap-4 self-stretch" onSubmit={handleSubmit(handleFormSubmit)}>
      {/* 아이디 input */}
      <div>
        <label htmlFor="userId" className="form-label">
          {FORM_TEXT[1]}
          <input id="userId" {...register('userId', { required: FORM_ERROR[0] })} className="form-input" />
        </label>
        {errors.userId && <p className="form-error-text">{errors.userId.message}</p>}
      </div>
      {/* 비밀번호 input */}
      <div>
        <label htmlFor="userPwd" className="form-label">
          {FORM_TEXT[2]}
          <input
            id="userPwd"
            type="password"
            className="form-input"
            {...register('userPwd', { required: FORM_ERROR[1] })}
          />
        </label>
        {errors.userPwd && <p className="form-error-text">{errors.userPwd.message}</p>}
      </div>
      {/* 로그인 button */}
      <div className="mt-8">
        {errorMessage && <p className="form-error-text">{errorMessage}</p>}
        <button type="submit" className="form-btn">
          {FORM_TEXT[0]}
        </button>
      </div>
    </form>
  );
}
