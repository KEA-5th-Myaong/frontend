'use client';

import { useRouter } from 'next/navigation';
import { usePDF } from 'react-to-pdf';
import PSFooter from '../_components/PSFooter';
import usePSStore from '../_store/psStore';
import PSCreateHeader from '../create/_components/PSCreateHeader';
import PSReadContent from '../read/_components/PSReadContent';

export default function PersonalStatementPreview() {
  const router = useRouter();
  const psData = usePSStore((state) => state.psData);

  const { toPDF, targetRef } = usePDF({
    filename: '자기소개서.pdf',
    page: { format: 'A4' },
    method: 'save',
  });

  return (
    <section
      ref={targetRef}
      className="flex-center flex-col mx-auto w-full h-full pt-[100px] pb-32 px-8 gap-20 max-w-[1000px] min-w-[365px]"
    >
      <PSCreateHeader
        title={psData.title}
        mode="preview"
        onButtonClick={() => {
          router.back();
        }}
      />
      <div className="self-start w-full">
        <p className="w-full font-semibold text-[28px] pb-5 mb-9 border-b-2 border-gray-[#D9D9D9]">자기소개서</p>

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
