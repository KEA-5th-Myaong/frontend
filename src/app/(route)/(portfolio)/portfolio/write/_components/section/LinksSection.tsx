import Image from 'next/image';
import Input from '../Input';

export default function LinksSection() {
  return (
    <div className="mt-5">
      <div className="flex justify-between items-center">
        <h1 className="pre-3xl-semibold">링크</h1>
      </div>
      <div className="h-[2px] w-full bg-gray-5 my-[20px]" />
      <div className="flex flex-col items-center">
        <section className="w-full py-[20px] px-[30px] bg-gray-4 rounded-[10px]">
          <div className="grid grid-flow-col justify-stretch gap-[20px]">
            <Input
              element="input"
              label="링크명"
              size="lg"
              type="text"
              color="white"
              placeholder="링크명을 입력해주세요"
            />
            <Input element="input" label="URL" size="lg" type="text" color="white" placeholder="URL을 입력해주세요" />
          </div>
        </section>
        <Image
          src="/assets/add-button.svg"
          alt="링크 추가"
          width={40}
          height={40}
          className=" hover-animation mr-[10px] mt-[20px]"
        />
      </div>
    </div>
  );
}
