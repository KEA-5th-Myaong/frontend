'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import FormInput from '../../../../(log-in_sign-up)/_components/FormInput';
import { ChangePwdProps } from '../../../../(log-in_sign-up)/_types/forms';
import { validateCheckPwd, validatePwd } from '../../../../(log-in_sign-up)/_utils/validation';
import Modal from '../../../../../_components/Modal';
import { putChangePassword } from '@/app/_services/membersService';

export default function ChangePwdContainer() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    setError,
    clearErrors,
    watch,
  } = useForm<ChangePwdProps>({
    mode: 'onChange',
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  // password 필드의 값을 감시
  const userPwdValue = watch('password');

  // API 호출 및 결과 처리
  const onSubmit = async ({ originPassword, newPassword }: ChangePwdProps) => {
    const payload = { originPassword, newPassword };

    await putChangePassword(payload);
    return { success: true };
  };

  // 모달 확인 버튼 클릭 핸들러
  const handleModalConfirm = () => {
    setShowModal(false);
  };

  // 모든 필드의 값을 감시
  const watchAllFields = watch(['originPassword', 'password', 'newPassword']);

  // 폼 유효성 검사
  const isFormValid =
    isValid && isDirty && watchAllFields.every((field) => field) && watchAllFields[1] === watchAllFields[2];

  // 폼 제출 핸들러
  const handleFormSubmit = async (data: ChangePwdProps) => {
    try {
      const result = await onSubmit(data);
      if (result.success) {
        setShowModal(true);
      }
    } catch (error) {
      setErrorMessage('폼 제출에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col justify-center gap-14 w-full min-w-[360px] max-w-[600px] pt-10 px-5"
      >
        <FormInput<ChangePwdProps>
          id="originPassword"
          label="기존 비밀번호"
          placeholder="기존 비밀번호를 입력해 주세요"
          register={register}
          required="기존 비밀번호를 입력해주세요"
          type="password"
          error={errors.originPassword}
          isEssential={false}
        />

        <FormInput<ChangePwdProps>
          id="password"
          label="새 비밀번호"
          placeholder="새 비밀번호를 입력해 주세요"
          register={register}
          required="새 비밀번호를 입력해주세요"
          onBlur={(e) => validatePwd(e.target.value, setError, clearErrors)}
          type="password"
          error={errors.password}
          minLength={8}
          isEssential={false}
        />

        <FormInput<ChangePwdProps>
          id="newPassword"
          label="새 비밀번호 확인"
          placeholder="새 비밀번호를 입력해 주세요"
          register={register}
          required="새 비밀번호를 확인해주세요"
          onBlur={(e) => validateCheckPwd(e.target.value, userPwdValue, setError, clearErrors, 'newPassword')}
          type="password"
          error={errors.newPassword}
          isEssential={false}
        />

        <div className="mt-1">
          {errorMessage && <p className="form-error-text">{errorMessage}</p>}
          <button type="submit" className={`form-btn ${!isFormValid ? 'bg-gray-1' : ''}`} disabled={!isFormValid}>
            비밀번호 변경
          </button>
        </div>
      </form>
      {showModal && <Modal topText="비밀번호가 변경되었습니다." btnText="확인" onBtnClick={handleModalConfirm} />}
    </>
  );
}
