'use client';

import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import jobData from './jobTest.json';
import FormInput from '../../../../(Login_SignUp)/_components/FormInput';
import Modal from '../../../../../_components/Modal';
import ImageChange from './ImageChange';
import JobSelection from './JobSelection';
import { ProfileFormProps, JobCategory } from '../_types/myPage';

export default function ChangeProfileContainer() {
  const { register, handleSubmit } = useForm<ProfileFormProps>({});
  const [showModal, setShowModal] = useState(false);

  const [, setSelectJobCategory] = useState<JobCategory>('직군 전체'); // 선택 직업 카테고리
  const [selectJob, setSelectJob] = useState('전체'); // 선택 직업

  const [profileImage, setProfileImage] = useState<File | null>(null); // 프로필 이미지

  // 직업 선택 시 호출되는 콜백 함수, useCallback으로 함수를 메모이제이션
  const handleJobSelect = useCallback((category: JobCategory, job: string) => {
    setSelectJobCategory(category);
    setSelectJob(job);
  }, []); // 이 함수는 prop으로 전달됨

  const onSubmit = (data: ProfileFormProps) => {
    const formData = new FormData();
    formData.append('userName', data.userName);
    formData.append('userEmail', data.userEmail);
    formData.append('job', selectJob);
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }

    console.log(Object.fromEntries(formData));

    setShowModal(true);
  };

  return (
    <div className="flex flex-col justify-center pt-10 sm:pt-11 md:pt-14 px-4 w-full min-w-[360px] max-w-[687px] pb-12">
      <div className="flex flex-col sm:flex-row gap-7 sm:gap-6 md:gap-10">
        <ImageChange setProfileImage={setProfileImage} />

        <JobSelection jobData={jobData} onJobSelect={handleJobSelect} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10 pt-2 w-full max-w-[640px]">
        <FormInput
          id="userName"
          label="이름"
          placeholder=""
          register={register}
          required="이름을 입력해주세요"
          isEssential={false}
          isEdit
        />
        <FormInput
          id="userEmail"
          label="이메일"
          placeholder=""
          register={register}
          required="이메일을 입력해주세요"
          isEssential={false}
          isEdit
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
