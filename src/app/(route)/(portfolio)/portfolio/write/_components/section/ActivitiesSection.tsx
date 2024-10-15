import Image from 'next/image';
import Input from '../Input';

export default function ActivitiesSection() {
  return (
    <div className="mt-5">
      <div className="flex justify-between items-center">
        <h1 className="pre-3xl-semibold">교육 | 대외활동</h1>
        <button type="button" className="flex-center text-[16px] hover:text-primary-4 ">
          <Image
            src="/assets/add-button.svg"
            alt="교육 및 대외활동 추가"
            width={30}
            height={30}
            className=" hover-animation mr-[10px] "
          />
          활동 추가
        </button>
      </div>
      <div className="h-[2px] w-full bg-gray-5 my-[20px]" />
      <section className="w-full py-[20px] px-[30px] bg-gray-4 rounded-[10px]">
        <div className="grid grid-flow-col justify-stretch gap-[20px]">
          <Input
            element="input"
            label="이름"
            size="lg"
            type="text"
            color="white"
            placeholder="활동 및 교육명을 입력해주세요"
          />
          <Input
            element="input"
            label="교육기관"
            size="lg"
            type="text"
            color="white"
            placeholder="교육기관명을 입력해주세요"
          />
        </div>
        <Input element="input" label="시작 일자" size="lg" type="date" color="white" />
        <Input element="input" label="종료 일자" size="lg" type="date" color="white" />
        <Input
          element="textarea"
          label="활동 상세 내용"
          size="lg"
          type="text"
          color="white"
          placeholder="활동 상세 내용을 입력해주세요"
        />
      </section>
    </div>
  );
}
