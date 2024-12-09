'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchPortfolios } from '@/app/(route)/(portfolio)/_services/portfolioServices';
import useCustomQuery from '@/app/_hooks/useCustomQuery';
import { PortfolioCardProps } from '@/app/_types/portfolio';

export default function PortfolioHeader() {
  // 포트폴리오 목록 조회
  const { data: portfolioList } = useCustomQuery(['portfolios'], () => fetchPortfolios());

  // 현재 선택한 포트폴리오
  const params = useParams();
  const { portfolioId } = params;
  const [selectedTitle, setSelectedTitle] = useState<string | null>('title1');

  const handleTitleClick = (title: string) => {
    setSelectedTitle(title);
    //TODO: 해당 링크로 이동
  };

  return (
    <div className="flex flex-col gap-2 w-full mt-10 sm:w-[calc(100%-28px)] md:w-[calc(100%-64px)] lg:w-[calc(100%-80px)] xl:w-[calc(100%-96px)]">
      <div className="flex justify-between w-full text-sm font-semibold">
        {/* main 객체 렌더링 */}
        {portfolioList?.data?.main && portfolioList.data.main.portfolioId && (
          <button
            type="button"
            className={`cursor-pointer ${selectedTitle === 'title1' ? 'text-primary-1' : ''} hover-animation`}
            onClick={() => handleTitleClick('title1')}
          >
            {portfolioList.data.main.portfolioName}
            {selectedTitle === 'title1' && <div className="bg-primary-1 h-[2px] mt-1 w-full rounded-4" />}
          </button>
        )}
        {/* portfolios 배열 렌더링 */}
        {portfolioList?.data?.portfolios?.map((item: PortfolioCardProps) => (
          <button
            type="button"
            className={`cursor-pointer ${selectedTitle === 'title1' ? 'text-primary-1' : ''} hover-animation`}
            onClick={() => handleTitleClick('title1')}
          >
            {item.portfolioName}
            {selectedTitle === 'title1' && <div className="bg-primary-1 h-[2px] mt-1 w-full rounded-4" />}
          </button>
        ))}
      </div>
    </div>
  );
}
