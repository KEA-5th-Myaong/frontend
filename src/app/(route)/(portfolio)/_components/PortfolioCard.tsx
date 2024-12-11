'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Icons from '../../../_components/ui/Icon';
import { MoreIcon } from '../../../_components/ui/iconPath';
import PortfolioDropdown from './PortfolioDropdown';
import { PortfolioCardProps, PortfolioListMemo } from '@/app/_types/portfolio';
import { deletePortfolios, postPortfoliosMemo } from '../_services/portfolioServices';
import Modal, { initailModalState } from '@/app/_components/Modal';
import { formatDate } from '@/app/_utils/formatDate';

export default function PortfolioCard({
  portfolioId,
  portfolioName,
  timestamp,
  memo,
  isMain,
  onSetMain,
}: PortfolioCardProps) {
  const router = useRouter();
  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const [currentMemo, setCurrentMemo] = useState(memo); // 메모의 현재 상태를 저장
  const [modalState, setModalState] = useState(initailModalState);
  const queryClient = useQueryClient();

  const handleMemoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMemo = e.target.value;
    setCurrentMemo(newMemo); // 미리 상태 업데이트
    const memoPayload: PortfolioListMemo = { memo: newMemo };

    try {
      // API : 메모 등록
      await postPortfoliosMemo(portfolioId, memoPayload);
      queryClient.invalidateQueries({ queryKey: ['portfolios'] });
    } catch (error) {
      console.error('Failed to update memo:', error);
      setCurrentMemo(memo); // 기존 메모로 롤백
    }
  };

  // 포트폴리오 목록에서 삭제
  const handleDeletePortfolio = async () => {
    try {
      await deletePortfolios(portfolioId); // API 호출
      queryClient.invalidateQueries({ queryKey: ['portfolios'] }); // 목록 갱신
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
    <div className=" relative w-[320px] bg-white-0 border border-gray-5 rounded-xl pt-[30px] pb-2.5 px-[30px]">
      <div className="flex justify-between">
        <Link href={`/portfolio/${portfolioId}/read`}>
          <h1 className="max-w-[15ch] font-semibold whitespace-nowrap text-ellipsis overflow-hidden hover:text-gray-500">
            {portfolioName}
          </h1>
        </Link>
        <button
          type="button"
          onClick={() => onSetMain && onSetMain(portfolioId)}
          className={`${isMain ? 'bg-primary-1' : 'bg-gray-5'} flex-center 
          px-2.5 rounded-[5px] font-semibold text-[11px] text-white-0`}
        >
          대표
        </button>
        <div>
          <Icons
            name={MoreIcon}
            onClick={() => {
              setIsShowDropdown((prev) => !prev);
            }}
            className="cursor-pointer"
          />
        </div>

        {isShowDropdown && <PortfolioDropdown id={portfolioId} onModify={handleModify} onDelete={handleDeleteClick} />}
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
      <p className="text-right mt-2.5 text-gray-0 text-xs">{formatDate(timestamp)} 등록</p>

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
