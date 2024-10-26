'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useInterviewIdStore } from '../../../../_store/interviewStore';
import useCustomQuery from '@/app/_hooks/useCustomQuery';
import { fetchInterviewHistory } from '../../../../_services/interviewService';

interface InterviewHistory {
  messageId: string;
  role: string;
  content: string;
}

export default function InterviewHistoryPage() {
  const params = useParams();
  const { title } = params;

  const getTitle = (param: string | string[]): string => {
    if (Array.isArray(param)) {
      return param[0]; // 배열인 경우 첫 번째 요소를 사용
    }
    return param;
  };

  const encodedTitle = decodeURI(getTitle(title));
  const interviewId = useInterviewIdStore((state) => state.interviewId);

  const [messages, setMessages] = useState<InterviewHistory[]>([]);

  const { data } = useCustomQuery(['interview-history-id', interviewId], () => fetchInterviewHistory(interviewId));

  useEffect(() => {
    setMessages(data?.data);
  }, [data?.data]);

  return (
    <section className="flex flex-col pb-8 pt-6 sm:pt-3.5 interview-container">
      <p className="font-semibold self-start">모의 면접</p>
      <div className="flex flex-col self-stretch pt-2 w-full pb-8">
        <p className="text-sm">과거 기록</p>

        <div className="flex gap-3 justify-between pt-3 whitespace-nowrap">
          <div className="w-full max-w-64 py-4 px-4 sm:px-5 bg-gray-4 font-bold rounded-[28px]">{encodedTitle}</div>
          <Link href="/blog/khj0930/write" className="py-4 px-7 lg:px-9 rounded-[28px] primary-1-btn">
            포스트 작성
          </Link>
        </div>
      </div>

      <div className="flex flex-col w-full relative min-w-[360px] max-w-[735px] px-4 border-t border-gray-2">
        <div className="flex-shrink overflow-y-auto pt-5 pb-4 hide-scrollbar">
          <div className="flex flex-col gap-7">
            {messages?.map((msg) => (
              <div
                key={msg.messageId}
                className={`flex flex-col ${msg.role === 'interviewer' ? 'items-start' : 'items-end'}`}
              >
                {msg.role === 'interviewer' && <p className="font-semibold pb-3">면접관</p>}

                <div className="flex gap-3 max-w-[90%] sm:max-w-[80%]">
                  <div
                    className={`break-words chat-msg-text ${msg.role === 'interviewer' ? 'bg-gray-4' : 'bg-primary-0'}`}
                  >
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
