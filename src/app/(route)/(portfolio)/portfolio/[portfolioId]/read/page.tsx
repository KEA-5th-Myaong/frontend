'use client';

import { useState } from 'react';
import { Margin, usePDF } from 'react-to-pdf';
import { useParams, useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import Icons from '@/app/_components/ui/Icon';
import PortfolioHeader from './_components/PortfolioHeader';
import { MoreIcon } from '@/app/_components/ui/iconPath';
import PortfolioContainer from './_components/PortfolioContainer';
import Footer from '../../../_components/Footer';
import Modal, { initailModalState } from '@/app/_components/Modal';
import PortfolioDropdown from '../../../_components/PortfolioDropdown';
import { deletePortfolios, fetchPortfolio } from '../../../_services/portfolioServices';
import useCustomQuery from '@/app/_hooks/useCustomQuery';

export default function PortfolioRead() {
  const params = useParams();
  const { portfolioId } = params;
  const router = useRouter();

  // 포트폴리오 조회
  const { data: portfolio } = useCustomQuery(
    ['portfolio', portfolioId], // Query Key에 ID 포함
    () => fetchPortfolio(String(portfolioId)),
  );

  const [title, setTitle] = useState('');
  // FIX: 로그인 여부 연결
  const [isLogined, setIsLogined] = useState<boolean | null>(true);
  const [showModal, setShowModal] = useState(false);
  const [modalState, setModalState] = useState(initailModalState); // 삭제 모달
  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const queryClient = useQueryClient();

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

  // 포트폴리오 삭제
  const handleDeletePortfolio = async () => {
    try {
      await deletePortfolios(String(portfolioId)); // API 호출
      queryClient.invalidateQueries({ queryKey: ['portfolios'] });
      console.log(`Portfolio with ID ${portfolioId} deleted`);
    } catch (error) {
      console.error('Error deleting portfolio:', error);
      alert('포트폴리오 삭제에 실패했습니다.');
    } finally {
      setModalState(initailModalState); // 모달 닫기
      setIsShowDropdown(false); // 항상 마지막에 닫기
    }
  };

  // 삭제 버튼 누르면 나오는 모달
  const handleDeleteClick = () => {
    setModalState((prev) => ({
      ...prev,
      open: true,
      hasSubBtn: true,
      topText: '해당 포트폴리오를 삭제하시겠습니까?',
      subBtnText: '취소',
      btnText: '삭제',
      onSubBtnClick: () => setModalState(initailModalState),
      onBtnClick: () => {
        handleDeletePortfolio();
      },
    }));
  };

  const handleModify = () => {
    router.push(`/portfolio/${portfolioId}/modify`);
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
            <h1 className="pre-3xl-semibold">{portfolio?.data?.title}</h1>
            <div>
              <Icons
                name={MoreIcon}
                onClick={() => {
                  setIsShowDropdown((prev) => !prev);
                }}
                className="cursor-pointer"
              />
            </div>

            {isShowDropdown && isLogined && (
              <PortfolioDropdown id={String(portfolioId)} onModify={handleModify} onDelete={handleDeleteClick} />
            )}
          </div>

          <PortfolioContainer />
        </section>
      </div>
      <Footer showPDF showLink handlePdfClick={toPDF} handleLinkClick={handleLinkClick} />
      {showModal && (
        <Modal topText="포트폴리오 공유 링크가 생성되었습니다" btnText="링크 복사" onBtnClick={handleCopyLink} />
      )}
      {modalState.open && (
        <Modal
          hasSubBtn={modalState.hasSubBtn}
          topText={modalState.topText}
          subBtnText={modalState.subBtnText}
          btnText={modalState.btnText}
          onSubBtnClick={modalState.onSubBtnClick}
          onBtnClick={modalState.onBtnClick}
        />
      )}
    </div>
  );
}
