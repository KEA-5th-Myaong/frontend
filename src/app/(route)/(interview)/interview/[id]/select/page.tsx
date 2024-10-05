'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
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
    '위볼린2',
    '텐핑거스2',
    '로그앤코딩2',
    '조아라2',
    '위볼린3',
    '텐핑거스3',
    '로그앤코딩3',
    '조아라3',
    '위볼린4',
    '텐핑거스4',
    '로그앤코딩4',
    '조아라4',
    '위볼린5',
    '텐핑거스5',
    '로그앤코딩5',
    '조아라5',
  ]);
  return (
    <section className="w-full max-w-[1000px] pl-0 sm:pl-7 md:pl-16 lg:pl-20 xl:pl-24 pt-11">
      <p className="font-semibold">모의 면접</p>

      <div className="flex gap-4 self-stretch pt-6">
        <div className="flex self-stretch items-center px-5 py:1 md:py-4 gap-5 rounded-[3rem] border border-primary-1 w-full sm:w-[320px] lg:w-full">
          <Icons name={SearchIcon} />
          <input className="w-full focus:outline-none" placeholder="기업 이름을 검색하거나 선택하세요" />
        </div>
        <motion.button
          type="button"
          layoutId="select"
          className="px-4 md:px-10 py-2 md:py-[18px] rounded-[2rem] primary-1-btn"
        >
          선택
        </motion.button>
      </div>

      <div className="flex flex-wrap pt-5">
        {corpList.map((corp) => (
          <motion.button
            type="button"
            layoutId={`corp-${corp}`}
            onClick={() => {
              router.push(`/interview/${id.id}/${corp}`);
            }}
            className="corp-block"
          >
            {corp}
          </motion.button>
        ))}
      </div>
    </section>
  );
}
