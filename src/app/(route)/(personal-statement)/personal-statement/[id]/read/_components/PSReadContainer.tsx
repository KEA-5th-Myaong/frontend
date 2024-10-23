'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { usePDF, Margin } from 'react-to-pdf';
import Image from 'next/image';
import Modal, { initailModalState } from '../../../../../../_components/Modal';
import { PSFormData } from '../../create/_types/psCreate';
import PSFooter from '../../../../_components/PSFooter';
import PSHeader from '../../../../_components/PSHeader';
import PSReadContent from './PSReadContent';
import { fetchPS } from '@/app/(route)/(personal-statement)/_services/psServices';
import useCustomQuery from '@/app/_hooks/useCustomQuery';

export default function PSReadContainer() {
  const router = useRouter();
  const params = useParams();

  const getPostId = (param: string | string[]): string => {
    if (Array.isArray(param)) {
      return param[1];
    }
    return param;
  };

  const postId = decodeURI(getPostId(params.id));

  const { data: psData } = useCustomQuery(['ps', postId], () => fetchPS(postId));

  const [psState, setPsState] = useState<PSFormData>({
    title: '',
    position: '',
    reason: '',
    content: '',
  });

  const [modalState, setModalState] = useState(initailModalState);

  useEffect(() => {
    setPsState(psData?.data);
  }, [psData]);

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

  const { toPDF, targetRef } = usePDF({
    filename: '자기소개서.pdf',
    page: { margin: Margin.SMALL, format: 'A4' },
    method: 'save',
  });

  return (
    <>
      {psState ? (
        <div className="flex-col  w-full h-full">
          <PSHeader
            title={psState.title}
            mode="read"
            onButtonClick={() => {
              router.push('/personal-statement/1/editing');
            }}
            handleDeleteClick={handleDeleteClick}
          />

          <div ref={targetRef} className="self-start w-full mt-8 sm:mt-20">
            <p className="w-full font-semibold text-[28px] pb-5 mb-9 border-b-2 border-5">자기소개서</p>

            <div className="flex flex-col gap-11">
              <PSReadContent label="지원 직무" content={psState.position} />
              <PSReadContent label="지원 사유" content={psState.reason} />
              <PSReadContent label="자기소개" content={psState.content} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3 mt-44">
          <Image className="animate-bounce" src="/mascot.png" alt="마스코트" width={204} height={193} />
          <p className="text-gray-0">불러오는 중 입니다</p>
        </div>
      )}
      <PSFooter
        showPDF
        showBack
        handlePdfClick={toPDF}
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
