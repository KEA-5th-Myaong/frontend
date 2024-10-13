'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PSFooter from '../../_components/PSFooter';
import PSReadContent from './PSReadContent';
import { PSFormData } from '../../create/_types/psCreate';
import psReadTest from './psReadTest.json';
import PSCreateHeader from '../../create/_components/PSCreateHeader';
import BackButton from '../../../../../../_components/BackButton';
import Modal, { initailModalState } from '../../../../../../_components/Modal';

export default function PSReadContainer() {
  const router = useRouter();
  const [psState, setPsState] = useState<PSFormData>({
    title: '',
    position: '',
    reason: '',
    content: '',
  });

  const [modalState, setModalState] = useState(initailModalState);

  useEffect(() => {
    setPsState(psReadTest[0]);
  }, []);

  // 삭제 클릭
  const handleDeleteClick = () => {
    setModalState((prev) => ({
      ...prev,
      open: true,
      hasSubBtn: true,
      topText: '자기소개서를 삭제하시겠습니까?',
      subBtnText: '취소',
      btnText: '확인',
      onSubBtnClick: () => setModalState(initailModalState),
      onBtnClick: () =>
        setModalState((prev2) => ({
          ...prev2,
          open: true,
          hasSubBtn: false,
          topText: '삭제되었습니다.',
          btnText: '확인',
          onBtnClick: () => setModalState(initailModalState),
        })),
    }));
  };

  return (
    <>
      <BackButton className="self-start pb-4" />
      <PSCreateHeader
        title={psState.title}
        mode="read"
        onButtonClick={() => {
          router.push('/personal-statement/1/editing');
        }}
        handleDeleteClick={handleDeleteClick}
      />

      <div className="self-start w-full mt-20">
        <p className="w-full font-semibold text-[28px] pb-5 mb-9 border-b-2 border-gray-[#D9D9D9]">자기소개서</p>

        <div className="flex flex-col gap-11">
          <PSReadContent label="지원 직무" content={psState.position} />
          <PSReadContent label="지원 사유" content={psState.reason} />
          <PSReadContent label="자기소개" content={psState.content} />
        </div>
      </div>
      <PSFooter
        showPDF
        showBack
        handlePdfClick={() => {}}
        handleBackClick={() => {
          router.back();
        }}
      />

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
    </>
  );
}
