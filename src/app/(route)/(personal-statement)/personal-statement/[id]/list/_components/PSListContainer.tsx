'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Icons from '../../../../../../_components/ui/Icon';
import { PlusIcon } from '../../../../../../_components/ui/iconPath';
import { PSListBoxProps } from '../_types/psList';
import PSListBox from './PSListBox';
import pstests from './PStest.json';

export default function PSListContainer() {
  const router = useRouter();
  const [personalStatement, setPersonalStatement] = useState<PSListBoxProps[]>([]);

  useEffect(() => {
    setPersonalStatement(pstests.pstests);
  }, []);
  return (
    <div>
      {personalStatement ? (
        <div className="flex flex-col gap-4 w-full max-w-[1000px] mt-7">
          {personalStatement.map((ps) => (
            <PSListBox id={ps.id} title={ps.title} job={ps.job} content={ps.content} created_at={ps.created_at} />
          ))}
          <button
            type="button"
            onClick={() => router.push('/')}
            className="flex-center gap-8 py-11 border border-gray-2 rounded-lg bg-white-0"
          >
            <Icons className="border border-primary-1" name={PlusIcon} />
            자기소개서를 추가해보세요
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3 mt-44">
          <Image className="animate-bounce" src="/mascot.png" alt="마스코트" width={204} height={193} />
          <p>자기소개서를 작성해보세요</p>
        </div>
      )}
    </div>
  );
}
