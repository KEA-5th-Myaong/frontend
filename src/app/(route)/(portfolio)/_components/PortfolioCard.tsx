'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Icons from '../../../_components/ui/Icon';
import { MoreIcon } from '../../../_components/ui/iconPath';
import PortfolioDropdown from './PortfolioDropdown';
import useClickOutside from '@/app/_hooks/useClickOutside';
import { PortfolioCardProps } from '@/app/_types/portfolio';
import usePortfolioStore from '@/app/_store/portfolio';
import { postPortfoliosMemo, putPortfoliosMain } from '../_services/portfolioServices';

export default function PortfolioCard({ portfolioId, portfolioName, timestamp, memo }: PortfolioCardProps) {
  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const { isMainPortfolio, setMainPortfolio, setMemo } = usePortfolioStore();
  const [currentMemo, setCurrentMemo] = useState(memo); // 메모의 현재 상태를 저장

  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside({
    ref: dropdownRef,
    callback: () => setIsShowDropdown(false),
  });

  // 대표 포트폴리오 설정
  const handleSetMain = async () => {
    setMainPortfolio(portfolioId);
    // API : 대표 포트폴리오 설정
    await putPortfoliosMain(portfolioId);
  };

  // 메모 업데이트
  const handleMemoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMemo = e.target.value;
    setCurrentMemo(newMemo);
    setMemo(portfolioId, newMemo);
    console.log(portfolioId, currentMemo);
    // API : 포트폴리오 목록 메모 등록
    await postPortfoliosMemo(portfolioId, memo);
  };

  return (
    <div className=" relative w-[320px] bg-white-0 border border-gray-5 rounded-xl pt-[30px] pb-2.5 px-[30px]">
      <div className="flex justify-between">
        <Link href={`/portfolio/${portfolioId}/write`}>
          <h1 className="max-w-[15ch] font-semibold whitespace-nowrap text-ellipsis overflow-hidden hover:text-gray-500">
            {portfolioName}
          </h1>
        </Link>
        <button
          type="button"
          onClick={handleSetMain}
          className={`${isMainPortfolio === portfolioId ? 'bg-primary-1' : 'bg-gray-5'} flex-center 
          px-2.5 rounded-[5px] font-semibold text-[11px] text-white-0`}
        >
          대표
        </button>
        <div ref={dropdownRef}>
          <Icons
            name={MoreIcon}
            onClick={() => {
              setIsShowDropdown((prev) => !prev);
            }}
            className="cursor-pointer"
          />
        </div>

        {isShowDropdown && <PortfolioDropdown />}
      </div>
      <form className="bg-gray-4 rounded-md mt-5 py-[15px] px-[15px]">
        <h1 className="font-semibold text-sm">MEMO</h1>
        <input
          type="text"
          placeholder="메모 입력"
          value={currentMemo}
          onChange={handleMemoChange}
          className="whitespace-nowrap overflow-hidden mt-2.5 bg-gray-4 text-gray-0 text-sm"
        />
      </form>
      <p className="text-right mt-2.5 text-gray-0 text-xs">{timestamp} 등록</p>
    </div>
  );
}
