'use client';

import { useState, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Icons from '../../../../../../_components/ui/Icon';
import { ArrowIcon } from '../../../../../../_components/ui/iconPath';

export default function Chatting() {
  const router = useRouter();
  const params = useParams();
  const selectedCorp = params.corp as string;
  const corp = decodeURI(selectedCorp);

  const [messages, setMessages] = useState([
    { text: '위볼린이 속한 산업에서의 최신 기술 트렌드를 어떻게 따라가고 계신가요?', isUser: true },
  ]);
  const [newMessage, setNewMessage] = useState('');

  // 채팅 컨테이너에 대한 참조를 생성(DOM 요소에 접근)
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 채팅 컨테이너의 높이를 조정
    const adjustHeight = () => {
      // 컴포넌트가 마운트되었는지 확인
      if (chatContainerRef.current) {
        // 현재 뷰포트의 높이를 가져옴
        const viewportHeight = window.innerHeight;
        // 채팅 컨테이너의 상단 위치를 가져옴
        const containerTop = chatContainerRef.current.offsetTop;
        // 채팅 컨테이너의 높이를 설정
        // 뷰포트 높이에서 컨테이너 상단 위치를 빼고, 추가로 20px를 빼기(하단 여백용)
        chatContainerRef.current.style.height = `${viewportHeight - containerTop - 20}px`;
      }
    };

    // 화면 크기가 변경될 때마다 높이 조정
    window.addEventListener('resize', adjustHeight);
    adjustHeight();

    // 이벤트 리스너를 제거하여 메모리 누수 방지
    return () => window.removeEventListener('resize', adjustHeight);
  }, []);

  const handleSubmit = (e?: { preventDefault: () => void }) => {
    e?.preventDefault();
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, isUser: false }]);
      setNewMessage('');
    }
  };

  const handleKeyDown = (e: { key: string; shiftKey: unknown; preventDefault: () => void }) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // 새 줄 입력 방지
      handleSubmit();
    }
  };

  return (
    <section className="w-full max-w-[800px] pb-8 pl-0 sm:pl-7 md:pl-16 lg:pl-20 xl:pl-24 pt-11 px-8 flex flex-col">
      <p className="font-semibold">모의 면접</p>

      <div className="flex flex-col self-stretch pt-6 w-full pb-8">
        <p className="text-sm">선택 기업</p>

        <div className="flex gap-3 pt-3 whitespace-nowrap">
          <div className="w-full max-w-64 py-[18px] px-5 bg-gray-4 font-bold rounded-[28px]">{corp}</div>
          <button type="button" onClick={router.back} className="py-[18px] px-6 rounded-[28px] primary-1-btn">
            포스트 작성
          </button>
        </div>
      </div>

      {/* 여기부터 채팅창 */}
      <div ref={chatContainerRef} className="flex flex-col w-full relative max-w-[735px] border-t border-gray-2">
        <div className="flex-1 overflow-y-auto pt-5 pb-4 hide-scrollbar">
          <div className="flex flex-col gap-7">
            {messages.map((msg) => (
              <div className={`flex flex-col ${msg.isUser ? 'items-start' : 'items-end'}`}>
                {msg.isUser && <p className="font-semibold pb-3">면접관</p>}
                <div
                  className={`w-fit max-w-[80%] min-w-[20%] font-semibold border border-gray-0 
                    border-opacity-20 py-6 px-8 text-sm text-start rounded-[30px] ${
                      msg.isUser ? 'bg-gray-4' : 'bg-white-2 text-white'
                    }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 메시지 입력 폼 */}
        <form
          onSubmit={handleSubmit}
          className="py-2 h-[90px] w-full flex border border-primary-1 rounded-xl mt-auto bg-white-0"
        >
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow pl-8 pr-2 focus:outline-none rounded-xl resize-none hide-scrollbar"
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
