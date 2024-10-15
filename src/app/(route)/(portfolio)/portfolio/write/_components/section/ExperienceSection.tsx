import Image from 'next/image';
import Input from '../Input';

export default function ExperienceSection() {
  return (
    <div className="mt-5">
      <div className="flex justify-between items-center">
        <h1 className="pre-3xl-semibold">경력</h1>
        <button type="button" className="flex-center text-[16px] hover:text-primary-4 ">
          <Image
            src="/assets/add-button.svg"
            alt="경력 추가"
            width={30}
            height={30}
            className=" hover-animation mr-[10px] "
          />
          경력 추가
        </button>
      </div>
      <div className="h-[2px] w-full bg-gray-5 my-[20px]" />
      <section className="w-full py-[20px] px-[30px] bg-gray-4 rounded-[10px]">
        <div className="grid grid-flow-col justify-stretch gap-[20px]">
          <Input
            element="input"
            label="회사명"
            size="lg"
            type="text"
            color="white"
            placeholder="회사명을 입력해주세요"
            required
          />
          <Input
            element="input"
            label="직책"
            size="lg"
            type="text"
            color="white"
            placeholder="직책을 입력해주세요"
            required
          />
        </div>
        <Input element="input" label="시작 일자" size="lg" type="date" color="white" />
        <Input element="input" label="종료 일자" size="lg" type="date" color="white" />
        <Input
          element="textarea"
          label="주요 업무/성과"
          size="lg"
          type="text"
          color="white"
          placeholder="주요 업무/성과를 입력해주세요"
        />
      </section>
    </div>
  );
}
