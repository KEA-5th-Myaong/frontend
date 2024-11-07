import Image from 'next/image';
import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import Input from '../Input';
import MotionWrapper from '@/app/_components/MotionWrapper';

interface ActivityItemProps<T extends FieldValues> {
  id: number;
  onDelete: (id: number) => void;
  register: UseFormRegister<T>;
}

function ActivityItem<T extends FieldValues>({ id, onDelete, register }: ActivityItemProps) {
  return (
    <MotionWrapper>
      <section className="relative w-full py-[20px] px-[30px] bg-gray-4 rounded-[10px] mb-4">
        <div className="grid grid-flow-col justify-stretch gap-[20px]">
          <Input
            {...register(`extraActivities.${id}.name`)}
            name="extraActivities"
            element="input"
            label="이름"
            size="lg"
            type="text"
            color="white"
            maxLength={50}
            placeholder="활동 및 교육명을 입력해주세요"
          />
          <Input
            {...register(`extraActivities.${id}.institution`)}
            name="extraActivities"
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
          {...register(`extraActivities.${id}.start`)}
          name="extraActivities"
          element="input"
          label="시작 일자"
          size="lg"
          type="date"
          color="white"
          onClick={(event: React.MouseEvent<HTMLInputElement>) => console.log('Input clicked', event)}
        />
        <Input
          {...register(`extraActivities.${id}.end`)}
          name="extraActivities"
          element="input"
          label="종료 일자"
          size="lg"
          type="date"
          color="white"
        />
        <Input
          {...register(`extraActivities.${id}.description`)}
          name="extraActivities"
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
