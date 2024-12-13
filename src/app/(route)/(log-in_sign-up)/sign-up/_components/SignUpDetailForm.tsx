'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FORM_CATCH_ERROR, FORM_ERROR, FORM_PLACEHOLDER, FORM_TEXT, MODAL_TEXT } from '../../_constants/forms';
import { SignUpState } from '../../_types/forms';
import FormInput from '../../_components/FormInput';
import { validateId } from '../../_utils/validation';
import Modal from '../../../../_components/Modal';
import { fetchCheckUsername, postSignUpDetail } from '@/app/_services/membersService';

export default function SignUpDetailForm() {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    setError,
    clearErrors,
  } = useForm<SignUpState>({
    mode: 'onChange',
  });
  const router = useRouter();
  const [isUsernameChecked, setIsUsernameChecked] = useState(false); // 아이디 중복 검사 진행 여부
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

  // 회원 가입 API 호출 함수
  const onSubmit = async (data: SignUpState) => {
    try {
      const signupData = await postSignUpDetail(data);
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
    router.replace('/main');
  };

  // 에러 객체에 값이 있는지 검사
  const isFormValid =
    isValid &&
    isDirty && // 폼이 한번이라도 수정 되었는지
    isUsernameChecked; // 아이디 중복 검사 완료 확인

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
      <form className="flex flex-col gap-10 self-stretch pb-12  md:pt-0" onSubmit={handleSubmit(handleFormSubmit)}>
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
          placeholder={FORM_PLACEHOLDER[4]}
          register={register}
          required={FORM_ERROR[12]}
          error={errors.nickname}
          maxLength={10}
          infoText={FORM_TEXT[8]}
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

        {/* 회원가입 button */}
        <div className="relative mt-[60px]">
          {errorMessage && <p className="absolute bottom-20 form-error-text">{errorMessage}</p>}
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
