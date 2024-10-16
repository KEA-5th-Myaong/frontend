'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Icons from '../../../_components/ui/Icon';
import { PlusIcon, TriangleIcon, XIcon } from '../../../_components/ui/iconPath';

export default function InterviewHistory() {
  const router = useRouter();
  const { id } = useParams();

  const [historyLists, setHistoryLists] = useState(['디케이테크인', '카카오엔터프라이즈', '엑슨투']);
  const [showMore, setShowMore] = useState(false);

  return (
    <section className="bg-white-0 sm:max-w-[253px] sm:w-full self-stretch max-h-fit border-2 pt-[29px] pb-[22px] px-5 sm:px-2 md:px-5 rounded-2xl font-semibold z-10">
      <div className="flex justify-between">
        <p className={`pl-[13px] ${showMore ? 'mb-5' : 'mb-0'} sm:mb-5`}>면접 기록</p>
        <Icons
          onClick={() => {
            setShowMore((prev) => !prev);
          }}
          name={TriangleIcon}
          className={`${showMore ? '' : 'rotate-180'} mt-[6px] block sm:hidden`}
        />
      </div>

      <div className={`${showMore ? 'flex' : 'hidden'} sm:flex flex-col gap-1 mb-14`}>
        {historyLists.map((item) => (
          <button
            type="button"
            key={item}
            className="text-start bg-white-0 hover:bg-[#F3F3F3] 
            rounded-lg pl-[13px] pr-2 py-[7px] flex items-center justify-between"
            onClick={() => {
              console.log(item);
            }}
          >
            <span className="overflow-hidden text-ellipsis whitespace-nowrap flex-grow">{item}</span>
            {/* Icons에 이벤트 달고 stopproppregation 추가해야됨 */}
            <Icons name={XIcon} className="flex-shrink-0 ml-2" />
          </button>
        ))}
      </div>

      <button
        onClick={() => {
          router.push(`/interview/${id}/select`);
        }}
        type="button"
        className={`${showMore ? 'flex' : 'hidden'} sm:flex items-center gap-2 pl-[13px]`}
      >
        <Icons name={PlusIcon} className="mb-1" />
        면접 생성
      </button>
    </section>
  );
}
