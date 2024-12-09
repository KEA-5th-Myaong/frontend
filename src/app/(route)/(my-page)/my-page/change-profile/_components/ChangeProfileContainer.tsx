'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import FormInput from '../../../../(log-in_sign-up)/_components/FormInput';
import Modal from '../../../../../_components/Modal';
import ImageChange from './ImageChange';
import JobSelection from './JobSelection';
import { ProfileFormProps } from '../_types/myPage';
import useMe from '@/app/_hooks/useMe';
import { putChangeProfile } from '@/app/_services/membersService';
import useCustomQuery from '@/app/_hooks/useCustomQuery';
import { fetchProfile } from '@/app/(route)/(blog)/blog/[username]/_services/blogService';

export default function ChangeProfileContainer() {
  const { register, handleSubmit, setValue } = useForm<ProfileFormProps>({
    defaultValues: {
      name: '',
      blogIntro: '',
    },
  });
  const { data: userData } = useMe();
  const { data: blogData } = useCustomQuery(['user-profile', userData?.data.username], () =>
    fetchProfile(userData?.data.username as string),
  );

  const [showModal, setShowModal] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null); // 프로필 이미지
  const [isDisabled, setIsDisabled] = useState({
    name: true,
    blogIntro: true,
  });

  // userData가 변경될 때 폼 값 설정
  useEffect(() => {
    if (userData?.data && blogData?.data) {
      setValue('name', userData.data.username || '');
      setValue('blogIntro', blogData.data.blogIntro || '');
    }
  }, [userData, blogData, setValue]);

  const onSubmit = async (data: ProfileFormProps) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('blogIntro', data.blogIntro);
      if (profileImage) {
        formData.append('profileImage', profileImage);
      }
      await putChangeProfile(formData);
      setShowModal(true);
    } catch (error) {
      console.error('프로필 업데이트 실패:', error);
    }
  };

  // 닉네임, 이메일 활/비활
  const toggleDisabled = (field: 'name' | 'blogIntro') => {
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
          id="name"
          label="닉네임"
          placeholder="닉네임을 입력해주세요"
          register={register}
          required="닉네임을 입력해주세요"
          isEssential={false}
          isEdit
          isDisabled={isDisabled.name}
          onEditClick={() => toggleDisabled('name')}
        />
        <FormInput
          id="blogIntro"
          label="블로그 소개글"
          placeholder="블로그 소개글을 입력해주세요"
          register={register}
          required="블로그 소개글을 입력해주세요"
          isEssential={false}
          isEdit
          isDisabled={isDisabled.blogIntro}
          onEditClick={() => toggleDisabled('blogIntro')}
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
