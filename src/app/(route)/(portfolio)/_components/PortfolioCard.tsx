'use client';

import { useState } from 'react';
import Icons from '../../../_components/ui/Icon';
import { MoreIcon } from '../../../_components/ui/iconPath';

export default function PortfolioCard() {
  const [isMain, setIsMain] = useState(false);
  return (
    <div className="w-[320px] h-[200px] bg-white-0 border border-[1px] border-gray-5 rounded-[12px] pt-[30px] px-[30px]">
      <div className="flex justify-between">
        <h1 className="max-w-[15ch] font-semibold text-[16px] whitespace-nowrap text-ellipsis overflow-hidden">
          곽서연 포트폴리오
        </h1>
        <div
          className={`${isMain ? 'bg-primary-4' : 'bg-gray-5'} flex items-center justify-center w-[42px] h-[20px] px-[10px] py-[5px] rounded-[5px] font-semibold text-[11px] text-white-0`}
        >
          대표
        </div>
        <Icons name={MoreIcon} />
      </div>
      <section className="bg-gray-4 rounded-[6px] mt-[20px] py-[15px] px-[15px]">
        <h1 className="font-semibold text-[14px]">MEMO</h1>
        <p className="whitespace-nowrap overflow-hidden mt-[10px] text-gray-0 text-[14px]">
          위볼린(기업) 지원용 포트폴리오
        </p>
      </section>
      <p className="text-right mt-[10px] text-gray-0  text-[12px]">2024.03.05 등록</p>
    </div>
  );
}
