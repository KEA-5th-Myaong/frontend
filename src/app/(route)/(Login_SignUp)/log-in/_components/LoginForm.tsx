'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import { FORM_ERROR, FORM_PLACEHOLDER, FORM_TEXT } from '../../_constants/forms';
import { LoginState } from '../../_types/forms';
import FormInput from '../../_components/FormInput';

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
      console.log(errorMessage); // api 연결 후, 모달로 수정
    }
  };

  return (
    <form className="flex flex-col gap-10 self-stretch" onSubmit={handleSubmit(handleFormSubmit)}>
      {/* 아이디 input */}
      <FormInput<LoginState>
        id="userId"
        label={FORM_TEXT[1]}
        placeholder={FORM_PLACEHOLDER[0]}
        register={register}
        required={FORM_ERROR[0]}
        error={errors.userId}
        isEssential={false}
      />

      {/* 비밀번호 input */}
      <FormInput<LoginState>
        id="userPwd"
        label={FORM_TEXT[2]}
        placeholder={FORM_PLACEHOLDER[1]}
        register={register}
        type="password"
        required={FORM_ERROR[1]}
        error={errors.userPwd}
        isEssential={false}
      />

      {/* 로그인 button */}
      <div className="pt-5">
        <button type="submit" className="form-btn">
          {FORM_TEXT[0]}
        </button>
      </div>
    </form>
  );
}
