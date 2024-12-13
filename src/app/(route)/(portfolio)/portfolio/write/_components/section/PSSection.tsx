'use client';

import Image from 'next/image';
import { Path, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { useState } from 'react';
import Input from '../Input';
import { PortfolioFormProps } from '@/app/_types/portfolio';
import LoadPSModal from '../LoadPSModal';
import { fetchPS } from '@/app/(route)/(personal-statement)/_services/psServices';

interface PSSectionProps {
  setValue?: UseFormSetValue<PortfolioFormProps>;
  register: UseFormRegister<PortfolioFormProps>;
}

export default function PSSection({ register, setValue }: PSSectionProps) {
  const [showModal, setShowModal] = useState(false);

  // 자기소개서를 조회 및 폼에 설정하는 함수
  const handleSelectPS = async (id: string) => {
    try {
      const response = await fetchPS(id as unknown as number); // API 호출
      const psData = response?.data;

      if (psData && setValue) {
        setValue('ps.title', psData.title || '');
        setValue('ps.position', psData.position || '');
        setValue('ps.reason', psData.reason || '');
        setValue('ps.content', psData.content || '');
      }
      setShowModal(false); // 모달 닫기
    } catch (error) {
      console.error('Failed to fetch personal statement:', error);
    }
  };
  return (
    <div className="mt-10">
      <div className="flex justify-between items-center">
        <h1 className="pre-3xl-semibold">자기소개서</h1>
        <button type="button" onClick={() => setShowModal(true)} className="flex-center hover:text-primary-1 ">
          <Image
            src="/assets/add-button.svg"
            alt="자기소개서 추가"
            width={30}
            height={30}
            className=" hover-animation mr-2.5 "
          />
          불러오기
        </button>
        {showModal && (
          <LoadPSModal
            onSelect={handleSelectPS}
            onOverlayClick={() => {
              setShowModal(false);
            }}
          />
        )}
      </div>
      <div className="h-[2px] w-full bg-gray-5 my-[20px]" />
      <section className="w-full py-[20px] px-[30px] bg-gray-4 rounded-[10px]">
        <Input
          register={register}
          name={`ps.title` as Path<PortfolioFormProps>}
          element="input"
          label="제목"
          size="lg"
          type="text"
          color="white"
          placeholder="제목을 입력해주세요"
        />
        <Input
          register={register}
          name={`ps.position` as Path<PortfolioFormProps>}
          element="input"
          label="지원 직무"
          size="lg"
          type="text"
          color="white"
          placeholder="지원 직무를 입력해주세요"
        />
        <Input
          register={register}
          name={`ps.reason` as Path<PortfolioFormProps>}
          element="textarea"
          label="지원 사유"
          size="lg"
          type="text"
          color="white"
          placeholder="지원 사유를 입력해주세요"
        />
        <Input
          register={register}
          name={`ps.content` as Path<PortfolioFormProps>}
          element="textarea"
          label="자기소개서 내용"
          size="lg"
          type="text"
          color="white"
          placeholder="자기소개서 내용을 입력해주세요"
        />
      </section>
    </div>
  );
}
