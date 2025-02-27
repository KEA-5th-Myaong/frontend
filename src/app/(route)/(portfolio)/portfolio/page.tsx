'use client';

import Link from 'next/link';
import { useQueryClient } from '@tanstack/react-query';
import Icons from '../../../_components/ui/Icon';
import { PlusIcon } from '../../../_components/ui/iconPath';
import PortfolioCard from '../_components/PortfolioCard';
import PortfolioAddCard from '../_components/PortfolioAddCard';
import { PortfolioCardProps } from '../../../_types/portfolio';
import useCustomQuery from '@/app/_hooks/useCustomQuery';
import { fetchPortfolios, putPortfoliosMain } from '../_services/portfolioServices';
import PortfolioBanner from '../_components/PortfolioBanner';

export default function PortfolioList() {
  // 포트폴리오 목록 조회
  const queryClient = useQueryClient();
  const { data: portfolioList } = useCustomQuery(['portfolios'], () => fetchPortfolios());

  // API: 대표 포트폴리오 설정
  const handleSetMainPortfolio = async (portfolioId: string) => {
    try {
      await putPortfoliosMain(portfolioId);
      queryClient.invalidateQueries({ queryKey: ['portfolios'] });
    } catch (error) {
      console.error(`Failed to set portfolio ${portfolioId} as main:`, error);
    }
  };
  return (
    <div className="flex flex-col items-center px-[50px] min-w-[360px] w-full min-h-screen pt-14  md:pt-0 bg-gray-4 dark:bg-black-8">
      <PortfolioBanner />
      <div className="pt-[40px] flex justify-between items-center w-full max-w-[1000px] md:pr-[60px] lg:pr-[50px]">
        <div className="flex items-center">
          <div className="flex flex-col justify-center w-full border-l-4 pl-6 border-black-0">
            <h1 className="font-semibold text-left">포트폴리오 관리</h1>
            <p className="text-left text-gray-0 dark:text-gray-3 text-xs">최대 5개까지 생성 가능합니다</p>
          </div>
        </div>
        <Link href="/portfolio/write">
          <button
            type="button"
            className="flex items-center py-[13px] gap-2.5 md:py-[19px] px-5 md:px-7 rounded-[30px] primary-1-btn hover-animation"
          >
            <Icons name={{ ...PlusIcon, fill: '#fff', options: { ...PlusIcon.options, stroke: '#fff' } }} />
            <div className="flex">
              <p className="hidden sm:block">포트폴리오</p>&nbsp; 추가
            </div>
          </button>
        </Link>
      </div>

      <div className="flex-center flex-col mt-[30px] mb-[100px] w-full">
        <div className="w-full lg:max-w-[1000px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* main 객체 렌더링 */}
          {portfolioList?.data?.main && portfolioList.data.main.portfolioId && (
            <PortfolioCard
              key={portfolioList.data.main.portfolioId}
              portfolioId={portfolioList.data.main.portfolioId}
              portfolioName={portfolioList.data.main.portfolioName}
              memo={portfolioList.data.main.memo}
              timestamp={portfolioList.data.main.timestamp}
              isMain
              onSetMain={handleSetMainPortfolio}
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
              onSetMain={handleSetMainPortfolio}
            />
          ))}
          <PortfolioAddCard />
        </div>
      </div>
    </div>
  );
}
