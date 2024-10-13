'use client';

import { useRouter } from 'next/navigation';
import { usePDF } from 'react-to-pdf';
import PSFooter from '../_components/PSFooter';
import usePSStore from '../_store/psStore';
import PSCreateHeader from '../create/_components/PSCreateHeader';
import PSReadContent from '../read/_components/PSReadContent';
import BackButton from '../../../../../_components/BackButton';

export default function PersonalStatementPreview() {
  const router = useRouter();
  const psData = usePSStore((state) => state.psData);

  const { toPDF, targetRef } = usePDF({
    filename: '자기소개서.pdf',
    page: { format: 'A4' },
    method: 'save',
  });

  return (
    <section className="flex-center flex-col mx-auto w-full h-full pt-[100px] pb-32 px-8 max-w-[1000px] min-w-[365px]">
      <BackButton className="self-start pb-4" />
      <PSCreateHeader title={psData.title} mode="preview" />
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
    </section>
  );
}
