'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FORM_CATCH_ERROR, FORM_ERROR, FORM_PLACEHOLDER, FORM_TEXT, MODAL_TEXT } from '../../_constants/forms';
import FormInput from '../../_components/FormInput';
import Modal from '../../../../_components/Modal';
import { validateCheckPwd, validatePwd } from '../../_utils/validation';
import { ChangePwdProps } from '../../_types/forms';

export default function ChangePwdForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    watch,
  } = useForm<ChangePwdProps>({
    mode: 'onChange',
  });

  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const userPwdValue = watch('originPassword');

  const onSubmit = async (data: ChangePwdProps) => {
    console.log('비밀번호 데이터', data);

    return { success: true };
  };

  // 모달 확인 버튼 클릭 핸들러
  const handleModalConfirm = () => {
    setShowModal(false);
    router.push('/log-in');
  };

  const isFormValid = Object.keys(errors).length === 0;

  const handleFormSubmit = async (data: ChangePwdProps) => {
    try {
      const result = await onSubmit(data);
      if (result.success) {
        setShowModal(true);
      }
    } catch (error) {
      setErrorMessage(FORM_CATCH_ERROR[2]);
    }
  };
  return (
    <>
      <form className="flex flex-col gap-10 self-stretch" onSubmit={handleSubmit(handleFormSubmit)}>
        {/* 비밀번호 input */}
        <FormInput<ChangePwdProps>
          id="originPassword"
          label={FORM_TEXT[2]}
          placeholder={FORM_PLACEHOLDER[1]}
          register={register}
          required={FORM_ERROR[1]}
          onBlur={(e) => validatePwd(e.target.value, setError, clearErrors)}
          type="originPassword"
          error={errors.originPassword}
          minLength={10}
          infoText={FORM_TEXT[9]}
        />

        {/* 비밀번호 확인 input */}
        <FormInput<ChangePwdProps>
          id="newPassword"
          label={FORM_TEXT[3]}
          placeholder={FORM_PLACEHOLDER[1]}
          register={register}
          required={FORM_ERROR[10]}
          onBlur={(e) => validateCheckPwd(e.target.value, userPwdValue, setError, clearErrors, 'newPassword')}
          type="originPassword"
          error={errors.newPassword}
        />

        {/* 비밀번호 변경 button */}
        <div className="mt-[17px]">
          {errorMessage && <p className="form-error-text">{errorMessage}</p>}
          <button type="submit" className={`form-btn ${!isFormValid ? 'bg-gray-1' : ''}`} disabled={!isFormValid}>
            {FORM_TEXT[12]}
          </button>
        </div>
      </form>

      {showModal && <Modal topText={MODAL_TEXT[3]} btnText={MODAL_TEXT[0]} onBtnClick={handleModalConfirm} />}
    </>
  );
}
