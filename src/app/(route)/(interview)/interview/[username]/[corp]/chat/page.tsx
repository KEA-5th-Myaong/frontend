'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import ChatContainer from './_components/ChatContainer';

export default function Chatting() {
  const params = useParams();
  const username = params.username as string;
  const selectedCorp = params.corp as string;
  const corp = decodeURI(selectedCorp);

  return (
    <section className="flex flex-col pb-8 pt-6 sm:pt-3.5 interview-container">
      <p className="font-semibold self-start">모의 면접</p>

      <div className="flex flex-col self-stretch pt-2 w-full pb-8">
        <p className="text-sm">선택 기업</p>

        <div className="flex gap-3 justify-between pt-3 whitespace-nowrap">
          <div className="w-full max-w-64 py-4 px-4 sm:px-5 bg-gray-4 dark:bg-black-3 dark:border font-bold rounded-[28px]">
            {corp}
          </div>
          <Link href={`/blog/${username}/write`} className="py-4 px-7 lg:px-9 rounded-[28px] primary-1-btn" replace>
            포스트 작성
          </Link>
        </div>
      </div>

      {/* 여기부터 채팅창 */}
      <ChatContainer />
    </section>
  );
}
