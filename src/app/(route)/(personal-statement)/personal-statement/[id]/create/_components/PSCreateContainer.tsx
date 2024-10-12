'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import PSFooter from '../../_components/PSFooter';
import { PSFormData } from '../_types/psCreate';

export default function PSCreateContainer() {
  const router = useRouter();
  const { register, handleSubmit, watch } = useForm<PSFormData>();

  const onSubmit = (data: PSFormData) => {
    console.log(data);
  };

  const handleDoneClick = () => {
    handleSubmit(onSubmit)();
  };

  const reasonContent = watch('reason', ''); // 글자수 확인 위해
  const contentContent = watch('content', ''); // 글자수 확인 위해
  return (
    <>
      <div className="self-start w-full">
        <p className="w-full font-semibold text-[28px] pb-5 mb-9 border-b-2 border-gray-[#D9D9D9]">자기소개서</p>

        <div className="flex flex-col gap-[18px] bg-gray-4 pt-5 px-14 pb-10 rounded-[10px]">
          {/* 제목 */}
          <label htmlFor="title" className="ps-label">
            제목
            <input
              {...register('title', { required: true })}
              id="title"
              className="py-[10px] ps-input"
              placeholder="제목을 입력해주세요"
            />
          </label>

          {/* 지원직무 */}
          <label htmlFor="position" className="ps-label">
            지원직무
            <input
              {...register('position', { required: true })}
              id="position"
              className="py-[10px] ps-input"
              placeholder="지원 직무를 입력해주세요"
            />
          </label>

          {/* 지원사유 */}
          <label htmlFor="reason" className="ps-label">
            <div className="flex justify-between w-full">
              <p>지원사유</p>
              <p>{reasonContent.length}/500</p>
            </div>
            <textarea
              {...register('reason', { required: true })}
              id="reason"
              maxLength={500}
              className="resize-none h-32 py-4 ps-input"
              placeholder="지원 사유를 입력해주세요"
            />
          </label>

          {/* 자기소개 */}
          <label htmlFor="content" className="ps-label">
            <div className="flex justify-between w-full">
              <p>자기소개</p>
              <p>{contentContent.length}/2000</p>
            </div>
            <textarea
              {...register('content', { required: true })}
              id="content"
              maxLength={2000}
              className="resize-none h-64 py-4 ps-input"
              placeholder="자기소개서 내용을 입력해주세요"
            />
          </label>
        </div>

        {/* 안내문구 */}
        <div className="mt-4 mb-24 px-11 py-5 bg-[#F3F3F3] text-gray-0 text-xs flex gap-4">
          <p id="임시" className="text-white-0 bg-gray-0 rounded-full px-[6px]">
            !
          </p>
          자기소개서는 최대 2000자까지 입력 가능합니다.
        </div>
      </div>
      <PSFooter
        handlePdfClick={() => {}}
        handlePreviewClick={() => {
          router.push('/personal-statement/1/read');
        }}
        handleDoneClick={handleDoneClick}
      />
    </>
  );
}
