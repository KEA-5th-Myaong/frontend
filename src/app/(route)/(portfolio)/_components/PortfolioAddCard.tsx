import Image from 'next/image';

export default function PortfolioAddCard() {
  return (
    <div className="flex flex-col items-center justify-center w-[320px] h-[200px] bg-white-0 border border-[1px] border-gray-5 rounded-[12px] hover-animation ">
      <Image src="/assets/add-button.svg" alt="포트폴리오 추가" width={50} height={50} />
      <p className="mt-[10px] text-gray-0 text-[16px] cursor-pointer">포트폴리오를 추가해보세요</p>
    </div>
  );
}
