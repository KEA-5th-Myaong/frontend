'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PSFooter from '../../_components/PSFooter';
import PSReadContent from './PSReadContent';
import { PSFormData } from '../../create/_types/psCreate';
import psReadTest from './psReadTest.json';
import PSCreateHeader from '../../create/_components/PSCreateHeader';
import BackButton from '../../../../../../_components/BackButton';

export default function PSReadContainer() {
  const router = useRouter();
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
      <BackButton className="self-start pb-4" />
      <PSCreateHeader
        title={psState.title}
        mode="read"
        onButtonClick={() => {
          router.push('/personal-statement/1/editing');
        }}
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
        showBack
        handlePdfClick={() => {}}
        handleBackClick={() => {
          router.back();
        }}
      />
    </>
  );
}
