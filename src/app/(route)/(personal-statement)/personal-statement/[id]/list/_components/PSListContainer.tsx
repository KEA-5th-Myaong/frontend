'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PSListBoxProps } from '../_types/psList';
import PSListBox from './PSListBox';
import PSListHeader from './PSListHeader';
import { fetchPSList } from '@/app/(route)/(personal-statement)/_services/psServices';
import useCustomQuery from '@/app/_hooks/useCustomQuery';

export default function PSListContainer() {
  const [personalStatement, setPersonalStatement] = useState<PSListBoxProps[]>([]);

  const psLength = personalStatement?.length;

  const { data: psListData } = useCustomQuery(['psList'], () => fetchPSList());

  useEffect(() => {
    setPersonalStatement(psListData?.data);
  }, [psListData]);

  return (
    <>
      {/* 자소서 관리 헤더 */}
      <PSListHeader psLength={psLength} />
      <div className="flex-center w-full h-full">
        {personalStatement ? (
          <div className="flex flex-col gap-4 w-full max-w-[1000px] mt-7">
            {personalStatement?.map((ps) => (
              <PSListBox
                psId={ps.psId}
                title={ps.title}
                position={ps.position}
                content={ps.content}
                timestamp={ps.timestamp}
              />
            ))}

            {psLength < 3 && (
              <Link
                href="/personal-statement/1/create"
                className="flex-center gap-6 w-full py-4 sm:py-11 border border-gray-2 rounded-lg bg-white-0"
              >
                <div className="flex-center pb-1 border border-primary-1 rounded-full text-primary-1 w-6 h-6 sm:w-8 sm:h-8">
                  <p className="text-2xl">+</p>
                </div>
                자기소개서를 추가해보세요
              </Link>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-3 mt-44">
            <Image className="animate-bounce" src="/mascot.png" alt="마스코트" width={204} height={193} />
            <p className="text-gray-0">자기소개서를 작성해보세요</p>
          </div>
        )}
      </div>
    </>
  );
}
