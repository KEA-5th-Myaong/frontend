'use client';

import { useRouter } from 'next/navigation';
import { usePDF } from 'react-to-pdf';

import PSReadContent from '../_read/PSReadContent';
import PSFooter from '../PSFooter';
import PSHeader from '../PSHeader';
import usePSStore from '../../_store/psStore';

export default function PSPreviewContainer() {
  const router = useRouter();
  const psData = usePSStore((state) => state.psData);

  const { toPDF, targetRef } = usePDF({
    filename: '자기소개서.pdf',
    page: { format: 'A4' },
    method: 'save',
  });

  return (
    <>
      <PSHeader title={psData.title} mode="preview" />
      <div ref={targetRef} className="self-start w-full">
        <p className="w-full font-semibold text-xl sm:text-[28px] pb-5 mt-3 sm:mt-12 mb-9 border-b-2 border-gray-[#D9D9D9]">
          자기소개서
        </p>

        <div className="flex flex-col gap-11">
          <PSReadContent label="지원 직무" content={psData.position} />
          <PSReadContent label="지원 사유" content={psData.reason} />
          <PSReadContent label="자기소개" content={psData.content} />
        </div>
      </div>
      <PSFooter
        showPDF
        showBack
        handlePdfClick={toPDF}
        handleBackClick={() => {
          router.back();
        }}
      />
    </>
  );
}
