'use client';

import { useRef, useState } from 'react';
import { Margin, usePDF } from 'react-to-pdf';
import Icons from '@/app/_components/ui/Icon';
import useClickOutside from '@/app/_hooks/useClickOutside';
import PortfolioHeader from './_components/PortfolioHeader';
import { MoreIcon } from '@/app/_components/ui/iconPath';
import PortfolioWriteDropdown from '../../../_components/PortfolioWriteDropdown';
import PortfolioContainer from './_components/PortfolioContainer';
import Footer from '../../../_components/Footer';
import Modal from '@/app/_components/Modal';

export default function PortfolioRead() {
  const [title, setTitle] = useState('곽서연 포트폴리오1');
  const [isLogined, setIsLogined] = useState<boolean | null>(true);
  const [showModal, setShowModal] = useState(false);

  const [isShowDropdown, setIsShowDropdown] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside({
    ref: dropdownRef,
    callback: () => setIsShowDropdown(false),
  });

  // PDF 생성 클릭 시
  const { toPDF, targetRef } = usePDF({
    filename: '포트폴리오.pdf',
    page: { margin: Margin.SMALL, format: 'A4' },
    method: 'save',
  });
  // 링크 공유 클릭 시
  const handleLinkClick = () => {
    setShowModal(true);
  };

  // 포트폴리오 URL 복사
  const handleCopyLink = async () => {
    const currentUrl = window.location.href; // 현재 URL 가져오기
    await navigator.clipboard.writeText(currentUrl); // 클립보드에 복사
    setShowModal(false); // 모달 닫기
    alert('링크가 복사되었습니다!'); // 사용자에게 알림
  };

  return (
    <div className="flex px-[50px] md:px-0 mb-[100px]">
      <div className="mt-[60px]  w-full max-w-[1000px] md:px-[60px] lg:px-0 lg:mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-left ">포트폴리오 조회</h1>
        </div>
        {isLogined && <PortfolioHeader />}

        <section ref={targetRef}>
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

          <PortfolioContainer />
        </section>
      </div>
      <Footer showPDF showLink handlePdfClick={toPDF} handleLinkClick={handleLinkClick} />
      {showModal && (
        <Modal topText="포트폴리오 공유 링크가 생성되었습니다" btnText="링크 복사" onBtnClick={handleCopyLink} />
      )}
    </div>
  );
}
