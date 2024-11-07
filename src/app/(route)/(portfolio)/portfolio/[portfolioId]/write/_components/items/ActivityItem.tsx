import Image from 'next/image';
import React from 'react';
import { Path, UseFormRegister } from 'react-hook-form';
import Input from '../Input';
import MotionWrapper from '@/app/_components/MotionWrapper';
import { PortfolioProps } from '@/app/_types/portfolio';

interface ActivityItemProps {
  id: number;
  onDelete: (id: number) => void;
  register: UseFormRegister<PortfolioProps>;
}

function ActivityItem({ id, onDelete, register }: ActivityItemProps) {
  return (
    <MotionWrapper>
      <section className="relative w-full py-[20px] px-[30px] bg-gray-4 rounded-[10px] mb-4">
        <div className="grid grid-flow-col justify-stretch gap-[20px]">
          <Input
            register={register}
            name={`experiences.${id}.name` as Path<PortfolioProps>}
            element="input"
            label="이름"
            size="lg"
            type="text"
            color="white"
            maxLength={50}
            placeholder="활동 및 교육명을 입력해주세요"
          />
          <Input
            register={register}
            name={`experiences.${id}.institution` as Path<PortfolioProps>}
            element="input"
            label="교육기관"
            size="lg"
            type="text"
            color="white"
            maxLength={50}
            placeholder="교육기관명을 입력해주세요"
          />
        </div>
        <Input
          register={register}
          name={`experiences.${id}.start` as Path<PortfolioProps>}
          element="input"
          label="시작 일자"
          size="lg"
          type="date"
          color="white"
        />
        <Input
          register={register}
          name={`experiences.${id}.end` as Path<PortfolioProps>}
          element="input"
          label="종료 일자"
          size="lg"
          type="date"
          color="white"
        />
        <Input
          register={register}
          name={`experiences.${id}.description` as Path<PortfolioProps>}
          element="textarea"
          label="활동 상세 내용"
          size="lg"
          type="text"
          color="white"
          maxLength={2000}
          placeholder="활동 상세 내용을 입력해주세요"
        />

        <button type="button" onClick={() => onDelete(id)} className="absolute top-[20px] right-10">
          <Image src="/assets/ic-delete.svg" alt="삭제" width={25} height={25} />
        </button>
      </section>
    </MotionWrapper>
  );
}

export default ActivityItem;
