'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import { FORM_CATCH_ERROR, FORM_ERROR, FORM_PLACEHOLDER, FORM_TEXT } from '../../_constants/forms';
import { SignUpState } from '../../_types/forms';
import FormInput from '../../_components/FormInput';
import { validateCheckPwd, validateEmail, validateId, validatePwd } from '../../_utils/validation';

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    watch,
  } = useForm<SignUpState>({
    mode: 'onBlur',
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 이메일 중복 검사
  const checkEMailDuplicate = async (email: string) => {
    if (!validateEmail(email, setError, clearErrors)) {
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

  // 아이디 중복 검사
  const checkIdDuplicate = async (id: string) => {
    if (!validateId(id, setError)) {
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

  // 비밀번호 체크
  const userPwdValue = watch('userPwd');

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
        onBlur={(e) => validatePwd(e.target.value, setError, clearErrors)}
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
        onBlur={(e) => validateCheckPwd(e.target.value, userPwdValue, setError, clearErrors)}
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
