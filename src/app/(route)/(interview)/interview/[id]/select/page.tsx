'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Icons from '../../../../../_components/ui/Icon';
import { SearchIcon } from '../../../../../_components/ui/iconPath';

export default function InterviewSelect() {
  const router = useRouter();
  const id = useParams();

  const [corpList, setCorpList] = useState([
    '위볼린',
    '텐핑거스',
    '로그앤코딩',
    '조아라',
    '위볼린',
    '텐핑거스',
    '로그앤코딩',
    '조아라',
    '위볼린',
    '텐핑거스',
    '로그앤코딩',
    '조아라',
    '위볼린',
    '텐핑거스',
    '로그앤코딩',
    '조아라',
    '위볼린',
    '텐핑거스',
    '로그앤코딩',
    '조아라',
  ]);
  return (
    <section className="w-full pl-0 sm:pl-7 md:pl-16 lg:pl-20 xl:pl-32 pt-11">
      <p className="font-semibold">모의 면접</p>

      <div className="flex gap-4 self-stretch pt-7">
        <div className="flex self-stretch items-center px-5 py:1 md:py-4 gap-5 rounded-[3rem] border border-primary-1 w-full sm:w-[320px] lg:w-full">
          <Icons name={SearchIcon} />
          <input className="w-full focus:outline-none" placeholder="기업 이름을 검색하거나 선택하세요" />
        </div>
        <button type="button" className="px-2 md:px-10 py-1 md:py-[18px] rounded-[2rem] primary-1-btn">
          선택
        </button>
      </div>

      <div className="flex flex-wrap pt-5">
        {corpList.map((corp) => (
          <button
            type="button"
            onClick={() => {
              router.push(`/interview/${id.id}/${corp}`);
            }}
            className="corp-block"
          >
            {corp}
          </button>
        ))}
      </div>
    </section>
  );
}
