'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useInterviewIdStore } from '../../../../_store/interviewStore';
import useCustomQuery from '@/app/_hooks/useCustomQuery';
import { fetchInterviewHistory } from '../../../../_services/interviewService';
import useChatWriteStore from '@/app/_store/chatWrite';
import { InterviewMessages } from '../../[corp]/chat/_types/messageType';

export default function InterviewHistoryPage() {
  const interviewId = useInterviewIdStore((state) => state.interviewId);
  const setMessage = useChatWriteStore((state) => state.setMessages);

  const params = useParams();
  const username = params.username as string;
  const title = params.title as string;

  const encodedTitle = decodeURI(title);

  const [messages, setMessages] = useState<InterviewMessages[]>([]);

  const { data } = useCustomQuery(['interview-history-id', interviewId], () => fetchInterviewHistory(interviewId));

  useEffect(() => {
    setMessages(data?.data);
  }, [data?.data]);

  useEffect(() => {
    if (setMessage) {
      console.log(messages);
      setMessage(messages); // messages state가 변경될 때마다 store에 저장
    }
  }, [messages, setMessage]);

  return (
    <section className="flex flex-col pb-8 pt-6 sm:pt-3.5 interview-container">
      <p className="font-semibold self-start">모의 면접</p>
      <div className="flex flex-col self-stretch pt-2 w-full pb-8">
        <p className="text-sm">과거 기록</p>

        <div className="flex gap-3 justify-between pt-3 whitespace-nowrap">
          <div className="w-full max-w-64 py-4 px-4 sm:px-5 bg-gray-4 dark:bg-black-4 dark:border font-bold rounded-[28px]">
            {encodedTitle}
          </div>
          <Link href={`/blog/${username}/write`} className="py-4 px-7 lg:px-9 rounded-[28px] primary-1-btn">
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
                    className={`break-words chat-msg-text ${msg.role === 'interviewer' ? 'bg-gray-4 dark:bg-black-4' : 'bg-primary-0 dark:bg-gray-4 dark:text-black-0'}`}
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
