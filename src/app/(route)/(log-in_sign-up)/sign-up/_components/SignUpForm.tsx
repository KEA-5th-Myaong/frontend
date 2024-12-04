'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FORM_CATCH_ERROR, FORM_ERROR, FORM_PLACEHOLDER, FORM_TEXT, MODAL_TEXT } from '../../_constants/forms';
import { SignUpState } from '../../_types/forms';
import FormInput from '../../_components/FormInput';
import { validateCheckPwd, validateEmail, validateId, validatePwd } from '../../_utils/validation';
import Modal from '../../../../_components/Modal';
import { fetchCheckEmail, fetchCheckUsername, postSignUp } from '@/app/_services/membersService';

export default function SignUpForm() {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    setError,
    clearErrors,
    watch,
  } = useForm<SignUpState>({
    mode: 'onChange',
  });
  const router = useRouter();
  const [isUsernameChecked, setIsUsernameChecked] = useState(false); // 아이디 중복 검사 진행 여부
  const [isEmailChecked, setIsEmailChecked] = useState(false); // 이메일 중복 검사 진행 여부
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // 에러 메시지들
  const [showSuccessModal, setShowSuccessModal] = useState(false); // 회원가입 성공 모달

  // 아이디 중복 검사
  const checkUsername = async (username: string) => {
    setIsUsernameChecked(false); // 검사 시작 시 false로 설정
    if (!validateId(username, setError)) {
      return;
    }

    const response = await fetchCheckUsername(username);
    if (response.data.usable === false) {
      setError('username', {
        type: 'manual',
        message: FORM_ERROR[5],
      });
    } else {
      clearErrors('username');
      setIsUsernameChecked(true); // 중복이 아닐 때만 true로 설정
    }
  };

  // 이메일 중복 검사
  const checkEMailDuplicate = async (email: string) => {
    setIsEmailChecked(false); // 검사 시작 시 false로 설정
    if (!validateEmail(email, setError, clearErrors)) {
      return;
    }
    try {
      const response = await fetchCheckEmail(email);
      if (response.data.usable === false) {
        setError('email', {
          type: 'manual',
          message: FORM_ERROR[7],
        });
      } else {
        clearErrors('email');
        setIsEmailChecked(true); // 중복이 아닐 때만 true로 설정
      }
    } catch (error) {
      console.log(error);
      setError('email', {
        type: 'manual',
        message: FORM_CATCH_ERROR[0],
      });
    }
  };

  // 비밀번호 체크
  const userPwdValue = watch('password');

  // 임시 회원 가입 API 호출 함수
  const onSubmit = async (data: SignUpState) => {
    try {
      const signupData = await postSignUp(data);
      // 수정 필요
      if (signupData.success) {
        return { success: true };
      }
      return { success: false };
    } catch (error) {
      console.error('회원가입 에러:', error);
      throw error;
    }
  };

  // Modal 확인 버튼 클릭 핸들러
  const handleModalConfirm = () => {
    setShowSuccessModal(false);
    router.push('/log-in');
  };

  // 에러 객체에 값이 있는지 검사
  const isFormValid =
    isValid &&
    isDirty && // 폼이 한번이라도 수정 되었는지
    isUsernameChecked && // 아이디 중복 검사 완료 확인
    isEmailChecked; // 이메일 중복 검사 완료 확인

  // 폼 제출
  const handleFormSubmit = async (data: SignUpState) => {
    try {
      const result = await onSubmit(data);
      if (result.success) {
        setShowSuccessModal(true);
        reset(); // 회원가입 완료 후 폼 초기화
      }
    } catch (error) {
      setErrorMessage(FORM_CATCH_ERROR[2]);
    }
  };
  return (
    <>
      <form className="flex flex-col gap-10 self-stretch pb-12" onSubmit={handleSubmit(handleFormSubmit)}>
        {/* 이름 input */}
        <FormInput<SignUpState>
          id="name"
          label={FORM_TEXT[6]}
          placeholder={FORM_PLACEHOLDER[2]}
          register={register}
          required={FORM_ERROR[3]}
          error={errors.name}
          maxLength={20}
        />
        {/* 닉네임 input */}
        <FormInput<SignUpState>
          id="nickname"
          label={FORM_TEXT[11]}
          placeholder={FORM_PLACEHOLDER[5]}
          register={register}
          required={FORM_ERROR[12]}
          error={errors.nickname}
          maxLength={10}
          infoText={FORM_TEXT[8]}
        />
        {/* 이메일 input */}
        <FormInput<SignUpState>
          id="email"
          label={FORM_TEXT[7]}
          placeholder={FORM_PLACEHOLDER[3]}
          register={register}
          onBlur={(e) => checkEMailDuplicate(e.target.value)}
          onChange={() => setIsEmailChecked(false)}
          type="email"
          error={errors.email}
          required={FORM_ERROR[4]}
        />
        {/* 아이디 input */}
        <FormInput<SignUpState>
          id="username"
          label={FORM_TEXT[1]}
          placeholder={FORM_PLACEHOLDER[0]}
          register={register}
          required={FORM_ERROR[0]}
          onBlur={(e) => checkUsername(e.target.value)}
          onChange={() => setIsUsernameChecked(false)}
          error={errors.username}
          minLength={6}
          maxLength={12}
          infoText={FORM_TEXT[8]}
        />
        {/* 비밀번호 input */}
        <FormInput<SignUpState>
          id="password"
          label={FORM_TEXT[2]}
          placeholder={FORM_PLACEHOLDER[1]}
          register={register}
          required={FORM_ERROR[1]}
          onBlur={(e) => validatePwd(e.target.value, setError, clearErrors)}
          type="password"
          error={errors.password}
          minLength={10}
          infoText={FORM_TEXT[9]}
        />
        {/* 비밀번호 확인 input */}
        <FormInput<SignUpState>
          id="confirmPassword"
          label={FORM_TEXT[3]}
          placeholder={FORM_PLACEHOLDER[4]}
          register={register}
          required={FORM_ERROR[10]}
          onBlur={(e) => validateCheckPwd(e.target.value, userPwdValue, setError, clearErrors)}
          type="password"
          error={errors.confirmPassword}
        />
        {/* 회원가입 button */}
        <div className="mt-[60px]">
          {errorMessage && <p className="form-error-text">{errorMessage}</p>}
          <button type="submit" className={`form-btn ${!isFormValid ? 'bg-gray-1' : ''}`} disabled={!isFormValid}>
            {FORM_TEXT[10]}
          </button>
        </div>
      </form>

      {showSuccessModal && (
        <Modal
          topText={MODAL_TEXT[1]}
          subText={MODAL_TEXT[2]}
          btnText={MODAL_TEXT[0]}
          onBtnClick={handleModalConfirm}
        />
      )}
    </>
  );
}
