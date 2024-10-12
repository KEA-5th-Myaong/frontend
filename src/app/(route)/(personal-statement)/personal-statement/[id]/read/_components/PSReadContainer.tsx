'use client';

import { useEffect, useState } from 'react';
import PSFooter from '../../_components/PSFooter';
import PSReadContent from './PSReadContent';
import { PSFormData } from '../../create/_types/psCreate';
import psReadTest from './psReadTest.json';
import PSCreateHeader from '../../create/_components/PSCreateHeader';

export default function PSReadContainer() {
  const [psState, setPsState] = useState<PSFormData>({
    title: '',
    position: '',
    reason: '',
    content: '',
  });

  useEffect(() => {
    setPsState(psReadTest[0]);
  }, []);

  return (
    <>
      <PSCreateHeader title={psState.title} mode="read" onButtonClick={() => {}} />
      <div className="self-start w-full">
        <p className="w-full font-semibold text-[28px] pb-5 mb-9 border-b-2 border-gray-[#D9D9D9]">자기소개서</p>

        <div className="flex flex-col gap-11">
          <PSReadContent label="지원 직무" content={psState.position} />
          <PSReadContent label="지원 사유" content={psState.reason} />
          <PSReadContent label="자기소개" content={psState.content} />
        </div>
      </div>
      <PSFooter handlePdfClick={() => {}} />
    </>
  );
}
