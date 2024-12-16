import Image from 'next/image';
import { Path, UseFormRegister } from 'react-hook-form';
import Input from '../Input';
import MotionWrapper from '@/app/_components/MotionWrapper';
import { PortfolioFormProps } from '@/app/_types/portfolio';

interface ExperienceItemProps {
  id: number;
  onDelete: (id: number) => void;
  register: UseFormRegister<PortfolioFormProps>;
}

function ExperienceItem({ id, onDelete, register }: ExperienceItemProps) {
  return (
    <MotionWrapper>
      <section className="relative w-full py-[20px] px-[30px] bg-gray-4 dark:bg-black-4  rounded-[10px] mb-4">
        <div className="grid grid-flow-col justify-stretch gap-[20px]">
          <Input
            register={register}
            name={`experiences.${id}.name` as Path<PortfolioFormProps>}
            element="input"
            label="회사명"
            size="lg"
            type="text"
            color="white"
            maxLength={50}
            placeholder="회사명을 입력해주세요"
            required
          />
          <Input
            register={register}
            name={`experiences.${id}.position` as Path<PortfolioFormProps>}
            element="input"
            label="직책"
            size="lg"
            type="text"
            color="white"
            maxLength={50}
            placeholder="직책을 입력해주세요"
            required
          />
        </div>
        <Input
          register={register}
          name={`experiences.${id}.start` as Path<PortfolioFormProps>}
          element="input"
          label="시작 일자"
          size="lg"
          type="date"
          color="white"
        />
        <Input
          register={register}
          name={`experiences.${id}.end` as Path<PortfolioFormProps>}
          element="input"
          label="종료 일자"
          size="lg"
          type="date"
          color="white"
        />
        <Input
          register={register}
          name={`experiences.${id}.achievement` as Path<PortfolioFormProps>}
          element="textarea"
          label="주요 업무/성과"
          size="lg"
          type="text"
          color="white"
          maxLength={2000}
          placeholder="주요 업무/성과를 입력해주세요"
        />
        <button type="button" onClick={() => onDelete(id)} className="absolute top-[20px] right-10">
          <Image src="/assets/ic-delete.svg" alt="삭제" width={25} height={25} />
        </button>
      </section>
    </MotionWrapper>
  );
}

export default ExperienceItem;
