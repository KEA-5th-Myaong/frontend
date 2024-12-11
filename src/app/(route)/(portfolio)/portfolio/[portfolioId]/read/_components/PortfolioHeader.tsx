'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { fetchPortfolios } from '@/app/(route)/(portfolio)/_services/portfolioServices';
import useCustomQuery from '@/app/_hooks/useCustomQuery';
import { PortfolioCardProps } from '@/app/_types/portfolio';

export default function PortfolioHeader() {
  // 포트폴리오 목록 조회
  const { data: portfolioList, refetch } = useCustomQuery(['portfolios'], () => fetchPortfolios());

  const params = useParams();
  const currentPortfolioId = params.portfolioId;

  const router = useRouter();
  const handleTitleClick = (id: string) => {
    router.push(`/portfolio/${id}/read`);
  };

  useEffect(() => {
    // 포트폴리오 목록 갱신 로직 실행
    const intervalId = setInterval(() => {
      refetch(); // 주기적으로 데이터를 다시 가져옴
    }, 5000); // 5초 간격으로 갱신

    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 인터벌 클리어
  }, [refetch]);

  return (
    <div className="flex flex-col gap-2 w-full mt-10 sm:w-[calc(100%-28px)] md:w-[calc(100%-64px)] lg:w-[calc(100%-80px)] xl:w-[calc(100%-96px)]">
      <div className="flex justify-between w-full text-sm font-semibold">
        {/* main 객체 렌더링 */}
        {portfolioList?.data?.main && portfolioList.data.main.portfolioId && (
          <button
            type="button"
            className={`cursor-pointer hover-animation ${String(currentPortfolioId) === String(portfolioList.data.main.portfolioId) ? 'text-primary-1' : ''}`}
            onClick={() => handleTitleClick(portfolioList.data.main.portfolioId)}
          >
            {portfolioList.data.main.portfolioName}
            {String(currentPortfolioId) === String(portfolioList.data.main.portfolioId) && (
              <div className="bg-primary-1 h-[2px] mt-1 w-full rounded-4" />
            )}
          </button>
        )}
        {/* portfolios 배열 렌더링 */}
        {portfolioList?.data?.portfolios?.map((item: PortfolioCardProps) => (
          <button
            type="button"
            className={`cursor-pointer hover-animation ${String(currentPortfolioId) === String(item.portfolioId) ? 'text-primary-1' : ''}`}
            onClick={() => handleTitleClick(item.portfolioId)}
          >
            {item.portfolioName}
            {String(currentPortfolioId) === String(item.portfolioId) && (
              <div className="bg-primary-1 h-[2px] mt-1 w-full rounded-4" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
