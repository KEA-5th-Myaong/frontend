'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Icons from '../../../../../../_components/ui/Icon';
import { ArrowIcon } from '../../../../../../_components/ui/iconPath';

export default function Chatting() {
  const router = useRouter();
  const params = useParams();
  const selectedCorp = params.corp as string;
  const corp = decodeURI(selectedCorp);

  const [messages, setMessages] = useState([
    { text: '위볼린이 속한 산업에서의 최신 기술 트렌드를 어떻게 따라가고 계신가요?', isInterviewer: true },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, isInterviewer: false }]);
      setNewMessage('');
    }
  };

  return (
    <section className="w-full pl-0 sm:pl-7 md:pl-16 lg:pl-20 xl:pl-24 pt-11">
      <p className="font-semibold">모의 면접</p>
      <div className="flex flex-col self-stretch pt-6 w-full sm:w-[320px] lg:w-full pb-8">
        <p className="text-sm">선택 기업</p>

        <div className="flex gap-3 pt-3 whitespace-nowrap">
          <div className="w-full max-w-64 py-[18px] px-5 bg-gray-4 font-bold rounded-[28px]">{corp}</div>
          <button type="button" onClick={router.back} className="py-[18px] px-6 rounded-[28px] primary-1-btn">
            포스트 작성
          </button>
        </div>
      </div>

      {/* 여기부터 채팅창 */}
      <div className="w-auto max-w-2xl flex flex-col pt-5 border-t border-gray-2 ">
        {messages.map((message) => (
          <div className={`mb-4 ${message.isInterviewer ? 'justify-start' : 'justify-end'}`}>
            {message.isInterviewer && <p className="font-semibol pb-3">면접관</p>}
            <div
              className={`w-fit border border-gray-0 border-opacity-20 py-6 px-8 text-sm text-start rounded-[30px] ${
                message.isInterviewer ? 'bg-gray-4' : 'bg-white-2 text-white'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}

        {/* 메시지 입력 폼 */}
        <form onSubmit={handleSubmit} className="flex border border-primary-1 rounded-xl">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-grow pl-8 py-8 focus:outline-none rounded-xl resize-none"
            placeholder="답변을 입력해주세요"
          />
          <button type="submit" className="pr-3 cursor-pointer">
            <Icons className="rotate-180 border rounded-full" name={ArrowIcon} />
          </button>
        </form>
      </div>
    </section>
  );
}
