import Image from 'next/image';
import { UseFormRegister } from 'react-hook-form';
import Input from '../Input';
import MotionWrapper from '@/app/_components/MotionWrapper';
import { PortfolioFormProps } from '@/app/_types/portfolio';

interface EducationItemProps {
  id: number;
  register: UseFormRegister<PortfolioFormProps>;
  onDelete: (id: number) => void;
}

export default function EducationItem({ id, register, onDelete }: EducationItemProps) {
  return (
    <MotionWrapper>
      <section className="relative w-full py-[20px] px-[30px] bg-gray-4  dark:bg-black-4 rounded-[10px] mb-4">
        <div className="grid grid-flow-col justify-stretch gap-[20px]">
          <Input
            register={register}
            name={`educations.${id}.name`}
            element="input"
            label="학교명"
            size="lg"
            type="text"
            color="white"
            maxLength={50}
            placeholder="학교명을 입력해주세요"
            required
          />
          <Input
            register={register}
            name={`educations.${id}.major`}
            element="input"
            label="학과"
            size="lg"
            type="text"
            color="white"
            maxLength={50}
            placeholder="학과를 입력해주세요"
            required
          />
        </div>
        <Input
          register={register}
          name={`educations.${id}.graduation`}
          element="input"
          label="졸업 일자"
          size="lg"
          type="month"
          color="white"
          required
        />
        <Input
          register={register}
          name={`educations.${id}.gpa`}
          element="input"
          label="학점"
          size="lg"
          type="number"
          color="white"
          placeholder="학점/기준학점"
        />
        <button type="button" onClick={() => onDelete(id)} className="absolute top-[20px] right-10">
          <Image src="/assets/ic-delete.svg" alt="삭제" width={25} height={25} />
        </button>
      </section>
    </MotionWrapper>
  );
}
