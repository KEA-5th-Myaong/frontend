import Image from 'next/image';

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
    </div>
  );
}
