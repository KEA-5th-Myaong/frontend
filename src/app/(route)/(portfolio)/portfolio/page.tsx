'use client';

import Link from 'next/link';
import Icons from '../../../_components/ui/Icon';
import { PlusIcon } from '../../../_components/ui/iconPath';
import PortfolioCard from '../_components/PortfolioCard';
import PortfolioAddCard from '../_components/PortfolioAddCard';
import usePortfolioStore from '../../../_store/portfolio';
import { PortfolioCardProps } from '../../../_types/portfolio';

export default function PortfolioList() {
  const { portfolio } = usePortfolioStore();

  return (
    <div className="px-[50px] md:px-0">
      <div className="mt-[60px] flex justify-between items-center w-full max-w-[1000px] md:px-[60px] lg:px-0 lg:mx-auto">
        <div className="flex flex-col">
          <h1 className="font-semibold text-left">포트폴리오 관리</h1>
          <p className="text-left text-gray-0 text-[12px]">최대 5개까지 생성 가능합니다</p>
        </div>
        <Link href="/portfolio/write">
          <button
            type="button"
            className="flex items-center font-bold text-white-0 py-[13px] md:py-[19px] px-[20px] md:px-[28px] bg-primary-1 rounded-[30px] hover-animation"
          >
            <Icons
              className="mr-[10px]"
              name={{ ...PlusIcon, fill: '#fff', options: { ...PlusIcon.options, stroke: '#fff' } }}
            />
            포트폴리오 추가
          </button>
        </Link>
      </div>
      <div className="flex flex-col items-center mt-[30px] mb-[100px] px-[50px]">
        <div className="w-full lg:max-w-[1000px] grid justify-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[20px] gap-y-[25px] gap-4">
          {portfolio.map((item: PortfolioCardProps) => (
            <PortfolioCard key={item.id} id={item.id} title={item.title} date="2024.10.17" />
          ))}
          <PortfolioAddCard />
        </div>
      </div>
    </div>
  );
}
