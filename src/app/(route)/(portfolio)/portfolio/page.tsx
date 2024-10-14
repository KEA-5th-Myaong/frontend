import Icons from '@/app/_components/ui/Icon';
import PortfolioCard from '../_components/PortfolioCard';
import { PlusIconWhite } from '@/app/_components/ui/iconPath';

export default function PortfolioList() {
  return (
    <div>
      <div className="mt-[60px] flex justify-between items-center w-full max-w-[1000px] mx-auto">
        <div className="flex flex-col">
          <h1 className="font-semibold text-left text-[16px]">포트폴리오 관리</h1>
          <p className="text-left text-gray-0 text-[12px]">최대 5개까지 생성 가능합니다</p>
        </div>
        <button
          type="button"
          className="flex items-center font-bold text-white-0 text-[16px] py-[19px] px-[28px] bg-primary-4 rounded-[30px] hover-animation"
        >
          <Icons name={PlusIconWhite} className="mr-[10px]" />
          포트폴리오 추가
        </button>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-full max-w-[1000px] grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[20px] gap-y-[25px] mt-[30px] mx-auto">
          <PortfolioCard />
          <PortfolioCard />
          <PortfolioCard />
          <PortfolioCard />
          <PortfolioCard />
        </div>
      </div>
    </div>
  );
}
