'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import MessageForm from './MessageForm';
import Icons from '../../../../../../../../_components/ui/Icon';
import { ArrowIcon } from '../../../../../../../../_components/ui/iconPath';
import useContainerHeight from '../../../../../../_hooks/useContainerHeight';
import useScrollToBottom from '../../../../../../../../_hooks/useScrollToBottom';
import messageVariants from '../_utils/messageVariants';
import useCustomQuery from '@/app/_hooks/useCustomQuery';
import {
  fetchInterviewTailQuestion,
  fetchInterviewNewQuestion,
} from '@/app/(route)/(interview)/_services/interviewService';
import useInterviewStore from '../../../_store/interviewStore';

export default function ChatContainer() {
  const interviewId = '1'; // 나중에 실제 아이디로 대체
  // 이 전에 고른 첫 번째 질문
  const storeQData = useInterviewStore((state) => state.storeQData);

  // 새 질문
  const { data: newQData } = useCustomQuery(['new-q', interviewId], () => fetchInterviewNewQuestion(interviewId));
  // 꼬리 질문
  const { data: tailQData } = useCustomQuery(['tail-q', interviewId], () => fetchInterviewTailQuestion(interviewId));

  const [messages, setMessages] = useState([]); // 채팅 내용 다 담김

  // firstQData가 로드되면 첫 메시지로 설정
  useEffect(() => {
    if (storeQData) {
      setMessages([{ text: storeQData, isAI: true, messageId: 1 }]);
    }
  }, [storeQData]);

  // 채팅 컨테이너에 대한 참조를 생성(DOM 요소에 접근)
  const chatContainerRef = useContainerHeight();
  const messagesEndRef = useScrollToBottom(messages); // 메시지 보내면 하단으로 스크롤

  const addMessage = (message: string, isAI: boolean, messageId?: string) => {
    setMessages((prevMessages) => [...prevMessages, { text: message, isAI, messageId }]);
  };

  const handleSubmit = (newMessage: string) => {
    if (newMessage.trim()) {
      addMessage(newMessage, false);
    }
  };

  const handleTailQuestion = () => {
    addMessage(tailQData?.data.content, true, tailQData?.data.messageId);
  };

  const handleNewQuestion = () => {
    addMessage(newQData?.data.content, true, newQData?.data.messageId);
  };

  return (
    <div
      ref={chatContainerRef}
      className="flex flex-col w-full relative min-w-[360px] max-w-[735px] border-t border-gray-2"
    >
      <div className="flex-shrink overflow-y-auto pt-5 pb-4 hide-scrollbar">
        <div className="flex flex-col gap-7">
          {messages.map((msg) => (
            <motion.div
              variants={messageVariants}
              initial="hidden"
              animate="visible"
              className={`flex flex-col ${msg.isAI ? 'items-start' : 'items-end'}`}
            >
              {msg.isAI && <p className="font-semibold pb-3">면접관</p>}

              <div className="flex gap-3 max-w-[90%] sm:max-w-[80%]">
                {!msg.isAI && (
                  <button type="button" className="text-xs text-gray-0 self-end pb-2 whitespace-nowrap">
                    수정
                  </button>
                )}
                <div className={`break-words chat-msg-text ${msg.isAI ? 'bg-gray-4' : 'bg-primary-0 text-white'}`}>
                  {msg.text}
                </div>
              </div>

              {!msg.isAI && (
                <div className="flex items-center gap-4 pt-4">
                  <button type="button" className="chat-msg-btn" onClick={handleTailQuestion}>
                    꼬리 질문 받기 <Icons className="rotate-180 border rounded-full" name={ArrowIcon} />
                  </button>
                  <button type="button" className="chat-msg-btn" onClick={handleNewQuestion}>
                    새 질문 생성 <Icons className="rotate-180 border rounded-full" name={ArrowIcon} />
                  </button>
                </div>
              )}
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 메시지 입력 폼 */}
      <MessageForm onSubmit={handleSubmit} />
    </div>
  );
}
