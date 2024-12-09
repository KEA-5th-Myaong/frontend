'use client';

import Link from 'next/link';
import Icons from '../../../_components/ui/Icon';
import { PlusIcon } from '../../../_components/ui/iconPath';
import PortfolioCard from '../_components/PortfolioCard';
import PortfolioAddCard from '../_components/PortfolioAddCard';
import { PortfolioCardProps } from '../../../_types/portfolio';
import useCustomQuery from '@/app/_hooks/useCustomQuery';
import { fetchPortfolios } from '../_services/portfolioServices';

export default function PortfolioList() {
  // 포트폴리오 목록 조회
  const { data: portfolioList } = useCustomQuery(['portfolios'], () => fetchPortfolios());

  return (
    <div className="flex flex-col items-center px-[50px] min-w-[360px] w-full pt-14 md:pt-0">
      <div className="pt-[60px] flex justify-between items-center w-full max-w-[1000px] md:px-[60px] lg:px-[50px] ">
        <div className="flex flex-col justify-center w-full">
          <h1 className="font-semibold text-left">포트폴리오 관리</h1>
          <p className="text-left text-gray-0 text-[12px]">최대 5개까지 생성 가능합니다</p>
        </div>
        <Link href="/portfolio/1/write">
          <button
            type="button"
            className="flex items-center py-[13px] gap-2.5 md:py-[19px] px-5 md:px-7 rounded-[30px] primary-1-btn hover-animation"
          >
            <Icons name={{ ...PlusIcon, fill: '#fff', options: { ...PlusIcon.options, stroke: '#fff' } }} />
            포트폴리오 추가
          </button>
        </Link>
      </div>

      <div className="flex flex-col items-center mt-[30px] mb-[100px] px-[50px]">
        <div className="w-full lg:max-w-[1000px] grid justify-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-[25px] gap-4">
          {/* main 객체 렌더링 */}
          {portfolioList?.data?.main && portfolioList.data.main.portfolioId && (
            <PortfolioCard
              key={portfolioList.data.main.portfolioId}
              portfolioId={portfolioList.data.main.portfolioId}
              portfolioName={portfolioList.data.main.portfolioName}
              memo={portfolioList.data.main.memo}
              timestamp={portfolioList.data.main.timestamp}
            />
          )}
          {/* portfolios 배열 렌더링 */}
          {portfolioList?.data?.portfolios?.map((item: PortfolioCardProps) => (
            <PortfolioCard
              key={item.portfolioId}
              portfolioId={item.portfolioId}
              portfolioName={item.portfolioName}
              memo={item.memo}
              timestamp={item.timestamp}
            />
          ))}
          <PortfolioAddCard />
        </div>
      </div>
    </div>
  );
}
