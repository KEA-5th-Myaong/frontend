'use client';

import Link from 'next/link';
import Icons from '@/app/_components/ui/Icon';
import { PlusIcon } from '@/app/_components/ui/iconPath';
import PortfolioCard from '../_components/PortfolioCard';
import PortfolioAddCard from '../_components/PortfolioAddCard';
import usePortfolioStore from '@/app/_store/portfolio';
import { PortfolioCardProps } from '@/app/_types/portfolio';

export default function PortfolioList() {
  const { portfolio } = usePortfolioStore();

  return (
    <div>
      <div className="mt-[60px] flex justify-between items-center w-full max-w-[1000px] mx-auto">
        <div className="flex flex-col">
          <h1 className="font-semibold text-left text-[16px]">포트폴리오 관리</h1>
          <p className="text-left text-gray-0 text-[12px]">최대 5개까지 생성 가능합니다</p>
        </div>
        <Link href="/portfolio/write">
          <button
            type="button"
            className="flex items-center font-bold text-white-0 text-[16px] py-[19px] px-[28px] bg-primary-4 rounded-[30px] hover-animation"
          >
            <Icons
              className="mr-[10px]"
              name={{ ...PlusIcon, fill: '#fff', options: { ...PlusIcon.options, stroke: '#fff' } }}
            />
            포트폴리오 추가
          </button>
        </Link>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-full max-w-[1000px] grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[20px] gap-y-[25px] mt-[30px] mx-auto">
          {portfolio.map((item: PortfolioCardProps) => (
            <PortfolioCard key={item.id} id={item.id} title={`곽서연 포트폴리오 ${item.id}`} date="2024.10.17" />
          ))}
          <PortfolioAddCard />
        </div>
      </div>
    </div>
  );
}
