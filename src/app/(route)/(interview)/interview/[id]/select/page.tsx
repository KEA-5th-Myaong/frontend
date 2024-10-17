'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Icons from '../../../../../_components/ui/Icon';
import { SearchIcon } from '../../../../../_components/ui/iconPath';
import ProgressBar from '../../../_components/ProgressBar';

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
    <section className="interview-container">
      <ProgressBar progress={3} />
      <p className="font-semibold">모의 면접</p>

      <div className="flex gap-4 self-stretch pt-6 min-w-[318px]">
        <div className="flex self-stretch items-center px-5 py:1 md:py-4 gap-5 rounded-[3rem] border border-primary-1 w-full sm:w-[320px] lg:w-full bg-white-0">
          <Icons name={SearchIcon} />
          <input className="w-full focus:outline-none" placeholder="기업 이름을 검색하거나 선택하세요" />
        </div>
        <motion.button
          type="button"
          layoutId="select"
          className="px-4 md:px-10 py-2 md:py-4 rounded-[28px] primary-1-btn"
        >
          선택
        </motion.button>
      </div>

      <div className="flex flex-wrap mx-auto pt-5 w-full min-w-[263px] max-w-[440px]">
        {corpList.map((corp) => (
          <motion.button
            type="button"
            layoutId={`corp-${corp}`}
            onClick={() => {
              router.push(`/interview/${id.id}/${corp}/personal-statement`);
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
