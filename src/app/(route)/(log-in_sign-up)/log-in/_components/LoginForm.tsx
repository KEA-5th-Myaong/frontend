'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { FORM_ERROR, FORM_PLACEHOLDER, FORM_TEXT } from '../../_constants/forms';
import { LoginState } from '../../_types/forms';
import FormInput from '../../_components/FormInput';
import { postLogin } from '@/app/_services/membersService';

export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginState>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: LoginState) => {
    const response = await postLogin(data);
    // 쿠키에 토큰 저장
    Cookies.set('accessToken', response.data.accessToken, {
      path: '/', // 모든 경로에서 접근 가능
      secure: process.env.NODE_ENV === 'production', // HTTPS에서만 작동 (프로덕션 환경에서)
      sameSite: 'strict', // CSRF 공격 방지
    });
    return response;
  };

  const handleFormSubmit = async (data: LoginState) => {
    try {
      await onSubmit(data);
      router.push('/main');
    } catch (error) {
      setErrorMessage(FORM_ERROR[2]);
      console.log('에러 메시지', errorMessage); // api 연결 후, 모달로 수정
    }
  };

  return (
    <form className="flex flex-col gap-10 self-stretch" onSubmit={handleSubmit(handleFormSubmit)}>
      {/* 아이디 input */}
      <FormInput<LoginState>
        id="username"
        label={FORM_TEXT[1]}
        placeholder={FORM_PLACEHOLDER[0]}
        register={register}
        required={FORM_ERROR[0]}
        error={errors.username}
        isEssential={false}
      />

      {/* 비밀번호 input */}
      <FormInput<LoginState>
        id="password"
        label={FORM_TEXT[2]}
        placeholder={FORM_PLACEHOLDER[1]}
        register={register}
        type="password"
        required={FORM_ERROR[1]}
        error={errors.password}
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
