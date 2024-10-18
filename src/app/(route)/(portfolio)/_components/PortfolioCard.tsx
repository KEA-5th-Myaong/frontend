'use client';

import { useRef, useState } from 'react';
import Icons from '../../../_components/ui/Icon';
import { MoreIcon } from '../../../_components/ui/iconPath';
import PortfolioDropdown from './PortfolioDropdown';
import useClickOutside from '@/app/_hooks/useClickOutside';
import { PortfolioCardProps } from '@/app/_types/portfolio';
import usePortfolioStore from '@/app/_store/portfolio';

export default function PortfolioCard({ id, title, date, memo }: PortfolioCardProps) {
  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const { isMainPortfolio, setMainPortfolio, setMemo } = usePortfolioStore();
  const [currentMemo, setCurrentMemo] = useState(memo); // 메모의 현재 상태를 저장

  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside({
    ref: dropdownRef,
    callback: () => setIsShowDropdown(false),
  });

  // 대표 포트폴리오 설정
  const handleSetMain = () => {
    setMainPortfolio(id);
  };

  // 메모 업데이트
  const handleMemoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMemo = e.target.value;
    setCurrentMemo(newMemo);
    setMemo(id, newMemo);
  };

  return (
    <div className=" relative w-[320px] h-[200px] bg-white-0 border border-gray-5 rounded-[12px] pt-[30px] px-[30px]">
      <div className="flex justify-between">
        <h1 className="max-w-[15ch] font-semibold text-base whitespace-nowrap text-ellipsis overflow-hidden">
          {title}
        </h1>
        <button
          type="button"
          onClick={handleSetMain}
          className={`${isMainPortfolio === id ? 'bg-primary-1' : 'bg-gray-5'} flex-center w-[42px] h-[20px] px-[10px] py-[5px] rounded-[5px] font-semibold text-[11px] text-white-0`}
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
      <form className="bg-gray-4 rounded-[6px] mt-5 py-[15px] px-[15px]">
        <h1 className="font-semibold text-[14px]">MEMO</h1>
        <input
          type="text"
          placeholder="메모 입력"
          value={currentMemo}
          onChange={handleMemoChange}
          className="whitespace-nowrap overflow-hidden mt-[10px] bg-gray-4 text-gray-0 text-[14px] "
        />
      </form>
      <p className="text-right mt-[10px] text-gray-0  text-[12px]">{date} 등록</p>
    </div>
  );
}
