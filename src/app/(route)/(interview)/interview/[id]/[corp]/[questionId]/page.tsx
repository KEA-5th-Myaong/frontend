'use client';

import { useParams, useRouter } from 'next/navigation';
import ChatContainer from './_components/ChatContainer';

export default function Chatting() {
  const router = useRouter();
  const params = useParams();
  const selectedCorp = params.corp as string;
  const corp = decodeURI(selectedCorp);

  return (
    <section className="flex flex-col pb-8 pr-8 interview-container">
      <p className="font-semibold">모의 면접</p>

      <div className="flex flex-col self-stretch pt-2 w-full pb-8">
        <p className="text-sm">선택 기업</p>

        <div className="flex gap-3 justify-between pt-3 whitespace-nowrap">
          <div className="w-full max-w-64 py-4 px-4 sm:px-5 bg-gray-4 font-bold rounded-[28px]">{corp}</div>
          <button type="button" onClick={router.back} className="py-4 px-7 lg:px-9 rounded-[28px] primary-1-btn">
            포스트 작성
          </button>
        </div>
      </div>

      {/* 여기부터 채팅창 */}
      <ChatContainer />
    </section>
  );
}
