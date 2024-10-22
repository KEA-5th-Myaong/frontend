'use client';

import { useState } from 'react';
import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import Icons from '../../../_components/ui/Icon';
import { PlusIcon, TriangleIcon, XIcon } from '../../../_components/ui/iconPath';

export default function InterviewHistory() {
  const { id } = useParams();
  const pathname = usePathname();

  // includes를 사용하지 않은 이유는, 사용자의 아이디에 chat이 들어갈 경우도 true를 반환해서
  const isChat = pathname.endsWith('/chat');

  const [historyLists, setHistoryLists] = useState(['디케이테크인', '카카오엔터프라이즈', '엑슨투']);
  const [showMore, setShowMore] = useState(false);

  return (
    <section
      className={`bg-white-0 md:max-w-[253px] md:w-full self-stretch max-h-fit border-2 
    ${!isChat && !showMore && 'mt-10 md:mt-0'} pt-[29px] pb-[22px] px-5 md:px-2 lg:px-5 rounded-2xl font-semibold z-10`}
    >
      <button
        type="button"
        onClick={() => {
          setShowMore((prev) => !prev);
        }}
        className="flex justify-between w-full"
      >
        <p className={`pl-[13px] ${showMore ? 'mb-5' : 'mb-0'} md:mb-5`}>면접 기록</p>
        <Icons name={TriangleIcon} className={`${showMore ? '' : 'rotate-180'} mt-1.5 block md:hidden`} />
      </button>

      <div className={`${showMore ? 'flex' : 'hidden'} md:flex flex-col gap-1 mb-14`}>
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

      <Link
        href={`/interview/${id}/select`}
        className={`${showMore ? 'flex' : 'hidden'} md:flex items-center gap-2 pl-[13px]`}
      >
        <Icons name={PlusIcon} className="mb-1" />
        면접 생성
      </Link>
    </section>
  );
}
