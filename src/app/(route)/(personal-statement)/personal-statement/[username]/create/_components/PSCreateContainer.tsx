'use client';

import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import Modal, { initailModalState } from '../../../../../../_components/Modal';
import PSFooter from '../../../../_components/PSFooter';
import PSHeader from '../../../../_components/PSHeader';
import usePSStore from '../../../../_store/psStore';
import BackButton from '../../../../../../_components/BackButton';
import { PSFormData } from '../_types/psCreate';
import PSForm from './PSForm';
import { postPS } from '@/app/(route)/(personal-statement)/_services/psServices';
import useMe from '@/app/_hooks/useMe';

export default function PSCreateContainer() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { psData, setPSData, resetPSData } = usePSStore();
  const { data: userData } = useMe();
  const [modalState, setModalState] = useState(initailModalState);

  const { register, handleSubmit, control, setValue, getValues } = useForm<PSFormData>({
    defaultValues: psData, // Zustand 스토어의 데이터로 폼 초기화
  });

  // 필드의 값 변화에 실시간으로 접근
  const watchedReason = useWatch({
    control, // react-hook-form의 내부상태와 메서드에 접근
    name: 'reason',
    defaultValue: psData.reason || '',
  });

  const watchedContent = useWatch({
    control,
    name: 'content',
    defaultValue: psData.content || '',
  });

  // 컴포넌트 마운트 시 스토어의 데이터로 폼 필드 설정
  useEffect(() => {
    // psData 객체의 모든 키-값 쌍을 순회
    Object.entries(psData).forEach(([key, value]) => {
      setValue(key as keyof PSFormData, value); // setValue를 사용하여 각 폼 필드의 값을 설정
    });
  }, [psData, setValue]);

  // 완료시 완료 모달
  const createDone = () => {
    setModalState((prev) => ({
      ...prev,
      open: true,
      hasSubBtn: true,
      topText: '자기소개서가 작성되었습니다',
      btnText: '확인',
      onBtnClick: () => {
        resetPSData();
        router.push(`/personal-statement/${userData?.data.memberId}/list`);
      },
    }));
  };

  // 폼 제출
  const onSubmit = async (data: PSFormData) => {
    await postPS(data);
    await queryClient.invalidateQueries({ queryKey: ['ps'] }); // 캐시 무효화
    createDone();
  };

  const handleDoneClick = () => {
    handleSubmit(onSubmit)();
  };

  const handlePreviewClick = () => {
    const data = getValues(); // 인자 없이 getValues()를 호출하면, 폼의 모든 등록된 필드의 현재 값을 포함하는 객체를 반환
    setPSData(data);
    router.push(`/personal-statement/${userData?.data.memberId}/preview`);
  };
  return (
    <>
      <BackButton className="self-start pb-4" />
      <PSHeader title="" mode="create" onButtonClick={handleDoneClick} />

      <div className="self-start w-full mt-0 sm:mt-12">
        <p className="w-full pre-2xl-semibold sm:text-[28px] pb-5 mb-9 border-b-2 border-gray-5">자기소개서</p>

        <div className="flex flex-col gap-[18px] bg-gray-4 pt-5 px-4 sm:px-14 pb-10 rounded-[10px]">
          {/* 제목 */}
          <PSForm name="title" label="제목" maxLength={20} register={register} placeholder="제목을 입력해주세요" />

          {/* 지원직무 */}
          <PSForm
            name="position"
            label="지원직무"
            maxLength={20}
            register={register}
            placeholder="지원 직무를 입력해주세요"
          />

          {/* 지원사유 */}
          <PSForm
            name="reason"
            label="지원사유"
            isTextarea
            maxLength={500}
            register={register}
            placeholder="지원 사유를 입력해주세요"
            value={watchedReason}
          />

          {/* 자기소개 */}
          <PSForm
            name="content"
            label="자기소개"
            isTextarea
            maxLength={2000}
            register={register}
            placeholder="자기소개서 내용을 입력해주세요"
            value={watchedContent}
          />
        </div>

        {/* 안내문구 */}
        <div className="mt-4 mb-24 px-11 py-5 bg-[#F3F3F3] text-gray-0 text-xs flex gap-4">
          <p id="임시" className="text-white-0 bg-gray-0 rounded-full px-1.5">
            !
          </p>
          자기소개서는 최대 2000자까지 입력 가능합니다.
        </div>
      </div>
      <PSFooter showPreview showDone handlePreviewClick={handlePreviewClick} handleDoneClick={handleDoneClick} />
      {modalState.open && (
        <Modal topText={modalState.topText} btnText={modalState.btnText} onBtnClick={modalState.onBtnClick} />
      )}
    </>
  );
}
