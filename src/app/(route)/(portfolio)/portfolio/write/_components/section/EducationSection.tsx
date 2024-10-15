import Image from 'next/image';
import Input from '../Input';

export default function EducationSection() {
  return (
    <div className="mt-5">
      <div className="flex justify-between items-center">
        <h1 className="pre-3xl-semibold">학력</h1>
        <button type="button" className="flex-center text-[16px] hover:text-primary-4 ">
          <Image
            src="/assets/add-button.svg"
            alt="학력 추가"
            width={30}
            height={30}
            className=" hover-animation mr-[10px] "
          />
          학력 추가
        </button>
      </div>
      <div className="h-[2px] w-full bg-gray-5 my-[20px]" />
      <section className="w-full py-[20px] px-[30px] bg-gray-4 rounded-[10px]">
        <div className="grid grid-flow-col justify-stretch gap-[20px]">
          <Input
            element="input"
            label="학교명"
            size="lg"
            type="text"
            color="white"
            placeholder="학교명을 입력해주세요"
            required
          />
          <Input
            element="input"
            label="학과"
            size="lg"
            type="text"
            color="white"
            placeholder="학과를 입력해주세요"
            required
          />
        </div>
        <Input element="input" label="졸업 일자" size="lg" type="date" color="white" required />
        {/* //학점 형식 추가 필요 */}
        <Input element="input" label="학점" size="lg" type="text" color="white" placeholder="학점/기준학점" />
      </section>
    </div>
  );
}
