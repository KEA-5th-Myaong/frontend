'use client';

import PSFooter from '../_components/PSFooter';
import PSCreateHeader from '../create/_components/PSCreateHeader';
import PSReadContent from '../read/_components/PSReadContent';

export default function PersonalStatementPreview() {
  return (
    <section className="flex-center flex-col mx-auto w-full h-full pt-[100px] pb-32 px-8 gap-20 max-w-[1000px] min-w-[365px]">
      <PSCreateHeader />
      <div className="self-start w-full">
        <p className="w-full font-semibold text-[28px] pb-5 mb-9 border-b-2 border-gray-[#D9D9D9]">자기소개서</p>

        <div className="flex flex-col gap-11">
          <PSReadContent label="지원 직무" content="" />
          <PSReadContent label="지원 사유" content="" />
          <PSReadContent label="자기소개" content="" />
        </div>
      </div>
      <PSFooter showDone handlePdfClick={() => {}} handleDoneClick={() => {}} />
    </section>
  );
}
