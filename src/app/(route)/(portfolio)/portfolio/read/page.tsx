'use client';

import { useRef, useState } from 'react';
import Icons from '@/app/_components/ui/Icon';
import PortfolioContainer from './_components/PortfolioContainer';
import PortfolioHeader from './_components/PortfolioHeader';
import useClickOutside from '@/app/_hooks/useClickOutside';
import { MoreIcon } from '@/app/_components/ui/iconPath';
import PortfolioWriteDropdown from '../_components/PortfolioWriteDropdown';
import Footer from '../_components/Footer';

export default function PortfolioRead() {
  const [title, setTitle] = useState('곽서연 포트폴리오1');
  const [isLogined, setIsLogined] = useState<boolean | null>(true);

  const [isShowDropdown, setIsShowDropdown] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside({
    ref: dropdownRef,
    callback: () => setIsShowDropdown(false),
  });

  return (
    <div className="flex px-[50px] md:px-0 mb-[100px]">
      <div className="mt-[60px]  w-full max-w-[1000px] md:px-[60px] lg:px-0 lg:mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-left ">포트폴리오 조회</h1>
        </div>
        {isLogined && <PortfolioHeader />}

        <section>
          <div className="relative flex justify-between items-center my-10">
            <h1 className="pre-3xl-semibold">{title}</h1>
            <div ref={dropdownRef}>
              <Icons
                name={MoreIcon}
                onClick={() => {
                  setIsShowDropdown((prev) => !prev);
                }}
                className="cursor-pointer"
              />
            </div>

            {isShowDropdown && isLogined && <PortfolioWriteDropdown />}
          </div>
        </section>
        <PortfolioContainer />
      </div>
      <Footer showPDF showLink />
    </div>
  );
}
