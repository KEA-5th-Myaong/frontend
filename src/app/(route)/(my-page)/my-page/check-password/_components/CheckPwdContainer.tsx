'use client';

import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, FieldValues } from 'react-hook-form';
import FormInput from '../../../../(log-in_sign-up)/_components/FormInput';
import { FORM_TEXT, FORM_PLACEHOLDER, FORM_ERROR } from '../../../../(log-in_sign-up)/_constants/forms';
import Modal from '../../../../../_components/Modal';

export default function CheckPwdContainer() {
  const router = useRouter();
  const { register, handleSubmit } = useForm({});
  const [showModal, setShowModal] = useState(false);

  const onSubmit = async (data: FieldValues) => {
    const response = await axios.post('/api/check-pwd', data); // 임시 api 주소
    console.log(response); // 콘솔로그는 나중에 제거
  };

  const handleFormSubmit = async (data: FieldValues) => {
    try {
      await onSubmit(data);
    } catch (error) {
      setShowModal(true);
      router.push('/my-page/change-profile');
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col justify-center gap-14 w-full min-w-[360px] max-w-[600px] px-5 mt-40 sm:mt-60"
      >
        <p className="font-medium text-base sm:text-2xl text-gray-0 text-center">
          개인정보 보호를 위해 비밀번호를 재확인합니다.
        </p>
        <FormInput
          id="userPwd"
          label={FORM_TEXT[3]}
          isEssential={false}
          placeholder={FORM_PLACEHOLDER[1]}
          register={register}
          required={FORM_ERROR[1]}
          type="password"
        />

        <button type="submit" className="w-full py-5 primary-1-btn">
          확인
        </button>
      </form>
      {showModal && (
        <Modal
          topText="비밀번호가 일치하지 않습니다."
          btnText="확인"
          onBtnClick={() => {
            setShowModal(false);
          }}
        />
      )}
    </>
  );
}
