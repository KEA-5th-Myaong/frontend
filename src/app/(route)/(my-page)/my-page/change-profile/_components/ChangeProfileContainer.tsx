'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import FormInput from '../../../../(log-in_sign-up)/_components/FormInput';
import Modal from '../../../../../_components/Modal';
import ImageChange from './ImageChange';
import JobSelection from './JobSelection';
import { ProfileFormProps } from '../_types/myPage';
import useMe from '@/app/_hooks/useMe';

export default function ChangeProfileContainer() {
  const { register, handleSubmit, setValue } = useForm<ProfileFormProps>({
    defaultValues: {
      userName: '',
      userEmail: '',
    },
  });
  const { data: userData } = useMe();

  const [showModal, setShowModal] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null); // 프로필 이미지
  const [isDisabled, setIsDisabled] = useState({
    userName: true,
    userEmail: true,
  });

  // userData가 변경될 때 폼 값 설정
  useEffect(() => {
    if (userData?.data) {
      setValue('userName', userData.data.username || '');
      setValue('userEmail', userData.data.email || '');
    }
  }, [userData, setValue]);

  const onSubmit = (data: ProfileFormProps) => {
    try {
      const formData = new FormData();
      formData.append('userName', data.userName);
      formData.append('userEmail', data.userEmail);
      // formData.append('job', preJob);
      if (profileImage) {
        formData.append('profileImage', profileImage);
      }

      console.log(Object.fromEntries(formData));

      setShowModal(true);
    } catch (error) {
      console.error('프로필 업데이트 실패:', error);
    }
  };

  // 이름, 이메일 활/비활
  const toggleDisabled = (field: 'userName' | 'userEmail') => {
    setIsDisabled((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="flex flex-col justify-center pt-10 sm:pt-11 md:pt-14 px-4 w-full min-w-[360px] max-w-[687px] pb-12">
      <div className="flex flex-col sm:flex-row gap-7 sm:gap-6 md:gap-10">
        <ImageChange defaultPicUrl={userData?.data.profilePicUrl} setProfileImage={setProfileImage} />
        <JobSelection />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10 pt-2 w-full max-w-[640px]">
        <FormInput
          id="userName"
          label="이름"
          placeholder="이름을 입력해주세요"
          register={register}
          required="이름을 입력해주세요"
          isEssential={false}
          isEdit
          isDisabled={isDisabled.userName}
          onEditClick={() => toggleDisabled('userName')}
        />
        <FormInput
          id="userEmail"
          label="이메일"
          placeholder="이메일을 입력해주세요"
          register={register}
          required="이메일을 입력해주세요"
          isEssential={false}
          isEdit
          isDisabled={isDisabled.userEmail}
          onEditClick={() => toggleDisabled('userEmail')}
        />

        <button type="submit" className="mt-5 primary-1-btn py-5">
          저장
        </button>
      </form>

      {showModal && (
        <Modal
          topText="성공적으로 변경되었습니다."
          btnText="확인"
          onBtnClick={() => {
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}
