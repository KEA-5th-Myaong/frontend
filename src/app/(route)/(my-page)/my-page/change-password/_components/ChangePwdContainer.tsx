'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import FormInput from '../../../../(Login_SignUp)/_components/FormInput';
import { ChangePwdProps } from '../../../../(Login_SignUp)/_types/forms';
import { validateCheckPwd, validatePwd } from '../../../../(Login_SignUp)/_utils/validation';
import Modal from '../../../../../_components/Modal';

export default function ChangePwdContainer() {
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const userPwdValue = watch('userPwd');

  const onSubmit = async (data: ChangePwdProps) => {
    console.log('비밀번호 데이터', data);

    return { success: true };
  };

  // 모달 확인 버튼 클릭 핸들러
  const handleModalConfirm = () => {
    setShowModal(false);
  };

  const isFormValid = Object.keys(errors).length === 0;

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
          id="userPwd"
          label="새 비밀번호"
          placeholder="새 비밀번호를 입력해 주세요"
          register={register}
          required="새 비밀번호를 입력해주세요"
          onBlur={(e) => validatePwd(e.target.value, setError, clearErrors)}
          type="password"
          error={errors.userPwd}
          minLength={10}
          isEssential={false}
        />

        <FormInput<ChangePwdProps>
          id="checkPwd"
          label="새 비밀번호 확인"
          placeholder="새 비밀번호를 입력해 주세요"
          register={register}
          required="새 비밀번호를 확인해주세요"
          onBlur={(e) => validateCheckPwd(e.target.value, userPwdValue, setError, clearErrors)}
          type="password"
          error={errors.checkPwd}
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
