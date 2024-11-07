import Image from 'next/image';
import { Path, UseFormRegister } from 'react-hook-form';
import Input from '../Input';
import { PortfolioProps } from '@/app/_types/portfolio';

interface PSSectionProps {
  register: UseFormRegister<PortfolioProps>;
}

export default function PSSection({ register }: PSSectionProps) {
  return (
    <div className="mt-10">
      <div className="flex justify-between items-center">
        <h1 className="pre-3xl-semibold">자기소개서</h1>
        <button type="button" className="flex-center hover:text-primary-1 ">
          <Image
            src="/assets/add-button.svg"
            alt="자기소개서 추가"
            width={30}
            height={30}
            className=" hover-animation mr-2.5 "
          />
          불러오기
        </button>
      </div>
      <div className="h-[2px] w-full bg-gray-5 my-[20px]" />
      <section className="w-full py-[20px] px-[30px] bg-gray-4 rounded-[10px]">
        {/* <Input
          register={register}
          name={`experiences.${id}.name` as Path<PortfolioProps>}
          element="input"
          label="제목"
          size="lg"
          type="text"
          color="white"
          placeholder="제목을 입력해주세요"
        />
        <Input
          register={register}
          name={`experiences.${id}.name` as Path<PortfolioProps>}
          element="input"
          label="지원 직무"
          size="lg"
          type="text"
          color="white"
          placeholder="지원 직무를 입력해주세요"
        /> */}
        <Input
          register={register}
          name={`ps.reason` as Path<PortfolioProps>}
          element="textarea"
          label="지원 사유"
          size="lg"
          type="text"
          color="white"
          placeholder="지원 사유를 입력해주세요"
        />
        <Input
          register={register}
          name={`ps.content` as Path<PortfolioProps>}
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
