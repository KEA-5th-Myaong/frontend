'use client';

import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import PSFooter from '../../../../_components/PSFooter';
import PSHeader from '../../../../_components/PSHeader';
import usePSStore from '../../../../_store/psStore';
import BackButton from '../../../../../../_components/BackButton';
import { PSFormData } from '../_types/psCreate';
import PSForm from './PSForm';

export default function PSCreateContainer() {
  const router = useRouter();
  const { psData, setPSData, resetPSData } = usePSStore();

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

  // 폼 제출
  const onSubmit = (data: PSFormData) => {
    console.log(data);
    resetPSData();
  };

  const handleDoneClick = () => {
    handleSubmit(onSubmit)();
  };

  const handlePreviewClick = () => {
    const data = getValues(); // 인자 없이 getValues()를 호출하면, 폼의 모든 등록된 필드의 현재 값을 포함하는 객체를 반환

    setPSData(data);
    router.push('/personal-statement/1/preview');
  };

  return (
    <>
      <BackButton className="self-start pb-4" />
      <PSHeader title="" mode="create" onButtonClick={handleDoneClick} />

      <div className="self-start w-full mt-0 sm:mt-12">
        <p className="w-full font-semibold text-xl sm:text-[28px] pb-5 mb-9 border-b-2 border-gray-[#D9D9D9]">
          자기소개서
        </p>

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
          <p id="임시" className="text-white-0 bg-gray-0 rounded-full px-[6px]">
            !
          </p>
          자기소개서는 최대 2000자까지 입력 가능합니다.
        </div>
      </div>
      <PSFooter showPreview showDone handlePreviewClick={handlePreviewClick} handleDoneClick={handleDoneClick} />
    </>
  );
}
