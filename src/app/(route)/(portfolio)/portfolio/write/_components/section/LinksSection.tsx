import Image from 'next/image';

export default function LinksSection() {
  return (
    <div className="mt-5">
      <div className="flex justify-between items-center">
        <h1 className="pre-3xl-semibold">링크</h1>
      </div>
      <div className="h-[2px] w-full bg-gray-5 my-[20px]" />
      <Image
        src="/assets/add-button.svg"
        alt="링크 추가"
        width={30}
        height={30}
        className=" hover-animation mr-[10px] "
      />
    </div>
  );
}
