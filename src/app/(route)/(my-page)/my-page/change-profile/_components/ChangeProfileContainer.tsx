'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import FormInput from '../../../../(log-in_sign-up)/_components/FormInput';
import Modal from '../../../../../_components/Modal';
import ImageChange from './ImageChange';
import JobSelection from './JobSelection';
import { ProfileFormProps } from '../_types/myPage';
import useMe from '@/app/_hooks/useMe';
import { putChangeProfile } from '@/app/_services/membersService';
import useCustomQuery from '@/app/_hooks/useCustomQuery';
import { fetchProfile } from '@/app/(route)/(blog)/blog/[username]/_services/blogService';
import { fetchPreJobs, postPreJobs } from '@/app/(route)/(main-page)/main/_services/mainService';
import { JobProps } from '@/app/(route)/(main-page)/main/_types/main-page';

export default function ChangeProfileContainer() {
  const { register, handleSubmit, setValue } = useForm<ProfileFormProps>({
    defaultValues: {
      nickname: '',
      blogIntro: '',
    },
  });
  const queryClient = useQueryClient();

  const { data: userData } = useMe();
  const { data: blogData } = useCustomQuery(['user-profile', userData?.data.username], () =>
    fetchProfile(userData?.data.username as string),
  );

  const [showModal, setShowModal] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null); // 프로필 이미지
  const [isDisabled, setIsDisabled] = useState({
    nickname: true,
    blogIntro: true,
  });
  // 관심 직군
  const [selectedJobs, setSelectedJobs] = useState<number[]>([]);
  const handleJobsChange = (jobs: number[]) => {
    setSelectedJobs(jobs);
  };

  const [initialJobs, setInitialJobs] = useState<number[]>([]);

  const { data: preJobsData } = useCustomQuery(['pre-job'], () => fetchPreJobs());
  useEffect(() => {
    if (preJobsData?.success && preJobsData.data) {
      const initialSelectedJobs = preJobsData.data.map((job: JobProps) => job.jobId);
      setInitialJobs(initialSelectedJobs);
      setSelectedJobs(initialSelectedJobs);
    }
  }, [preJobsData]);

  // 직군이 변경되었는지 확인하는 함수
  const hasJobsChanged = () => {
    if (initialJobs.length !== selectedJobs.length) return true;
    return !initialJobs.every((job) => selectedJobs.includes(job));
  };

  // userData가 변경될 때 폼 값 설정
  useEffect(() => {
    if (userData?.data && blogData?.data) {
      setValue('nickname', userData.data.nickname || '');
      setValue('blogIntro', blogData.data.blogIntro || '');
    }
  }, [userData, blogData, setValue]);

  const onSubmit = async (data: ProfileFormProps) => {
    try {
      const formData = new FormData();
      formData.append('nickname', data.nickname);
      formData.append('blogIntro', data.blogIntro);
      if (profileImage) {
        formData.append('profileImage', profileImage);
      }
      await putChangeProfile(formData);
      // 직군이 변경되었을 때만 관심직군 업데이트 요청
      if (hasJobsChanged()) {
        await postPreJobs({ preJob: selectedJobs });
      }
      queryClient.invalidateQueries({ queryKey: ['me'] });
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
      queryClient.clear(); // 모든 쿼리 캐시를 제거

      setShowModal(true);
    } catch (error) {
      console.error('프로필 업데이트 실패:', error);
    }
  };

  // 닉네임, 이메일 활/비활
  const toggleDisabled = (field: 'nickname' | 'blogIntro') => {
    setIsDisabled((prev) => ({ ...prev, [field]: !prev[field] }));
  };
  return (
    <div className="flex flex-col justify-center pt-10 sm:pt-11 md:pt-14 px-4 w-full min-w-[360px] max-w-[687px] pb-12">
      <div className="flex flex-col sm:flex-row gap-7 sm:gap-6 md:gap-10">
        <ImageChange defaultPicUrl={userData?.data.profilePicUrl} setProfileImage={setProfileImage} />
        <JobSelection onJobsChange={handleJobsChange} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10 pt-2 w-full max-w-[640px]">
        <FormInput
          id="nickname"
          label="닉네임"
          placeholder="닉네임을 입력해주세요"
          register={register}
          required="닉네임을 입력해주세요"
          isEssential={false}
          isEdit
          isDisabled={isDisabled.nickname}
          onEditClick={() => toggleDisabled('nickname')}
          maxLength={10}
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
          maxLength={20}
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
            window.location.reload();
          }}
        />
      )}
    </div>
  );
}
