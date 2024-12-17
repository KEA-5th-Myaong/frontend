import Image from 'next/image';
import Link from 'next/link';
import useMe from '@/app/_hooks/useMe';

export default function PortfolioBanner() {
  const { data: userData } = useMe();

  return (
    <div className="w-full h-52 flex-center px-2 mt-[40px] sm:pr-4 max-w-[1000px] min-w-[360px] bg-primary-4 border-[2px] border-gray-50 rounded-2xl">
      <div className="flex flex-col items-start text-left text-black-4 ml-7">
        <h1 className="text-[32px] font-bold">포트폴리오</h1>
        <p className="text-sm mt-2 font-semibold">합격률을 높이는 </p>
        <p className="text-sm font-semibold">나만의 포트폴리오를 작성해보세요</p>
      </div>
      <div className="flex gap-5 text-[11px] text-black-4 ml-6">
        <Link href="portfolio/write">
          <button type="button" className="hover-animation bg-white-0 rounded-xl px-2 py-2 font-bold flex items-center">
            <Image src="/assets/banner/banner-button-2.svg" alt="포트폴리오 작성 바로가기" width={60} height={60} />
            <div className="text-left ml-1">
              <p className="text-blue-400 font-semibold text-[10px]">아직 포트폴리오를 작성하지 않았다면?</p>
              <p className="text-sm">포트폴리오 작성 바로가기</p>
            </div>
          </button>
        </Link>

        <Link href={`/personal-statement/${userData?.data?.memberId}/create`}>
          <button type="button" className="hover-animation bg-white-0 rounded-xl px-2 py-2 font-bold flex items-center">
            <Image src="/assets/banner/banner-button-2.svg" alt="자기소개서 작성 바로가기" width={60} height={60} />
            <div className="text-left ml-1">
              <p className="text-blue-400 font-semibold text-[10px]">아직 자기소개서를 작성하지 않았다면?</p>
              <p className="text-sm">자기소개서 작성 바로가기</p>
            </div>
          </button>
        </Link>
      </div>

      <Image src="/assets/banner/banner-pf-img.svg" alt="포트폴리오 배너 이미지 " width={220} height={220} />
    </div>
  );
}
