'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import MessageForm from './MessageForm';
import useContainerHeight from '../../../../../_hooks/useContainerHeight';
import useScrollToBottom from '../../../../../../../_hooks/useScrollToBottom';
import {
  fetchNewQuestion,
  fetchTailQuestion,
  postInterviewMessage,
  putInterviewMessage,
} from '@/app/(route)/(interview)/_services/interviewService';
import { InterviewMessages } from '../_types/messageType';
import MsgEditBtn from './MsgEditBtn';
import Video from './Video'; // 사용자 비디오 컴포넌트
import { useInterviewIdStore } from '@/app/(route)/(interview)/_store/interviewStore';
import TailNewBtn from './TailNewBtn'; // 꼬리질문, 새질문 버튼
import { messageVariants } from '../../_utils/interviewVariants';
import useChatWriteStore from '@/app/_store/chatWrite';

export default function ChatContainer() {
  const interviewId = useInterviewIdStore((state) => state.interviewId);
  const setMessage = useChatWriteStore((state) => state.setMessages);
  const router = useRouter();

  const [messages, setMessages] = useState<InterviewMessages[]>([]); // 채팅 내용 다 담김
  const [isMaxMessages, setIsMaxMessages] = useState(false); // 최대 채팅 수 도달
  const [isLastMessageUser, setIsLastMessageUser] = useState(false); // 마지막 메시지가 사용자인지
  const [editMessageId, setEditMessageId] = useState<string | null>(null);
  const [editedText, setEditedText] = useState<string>(''); // 수정한 메시지

  useEffect(() => {
    // 새로고침 방지
    const preventRefresh = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };

    window.addEventListener('beforeunload', preventRefresh);

    // interviewId가 없으면 이전 페이지로
    if (!interviewId) {
      router.back();
    }

    return () => {
      window.removeEventListener('beforeunload', preventRefresh);
    };
  }, [interviewId, router]);

  useEffect(() => {
    if (setMessage) {
      setMessage(messages); // messages state가 변경될 때마다 store에 저장
    }
  }, [messages, setMessage]);

  // 첫 질문이 로드되면 첫 메시지로 설정
  useEffect(() => {
    setMessages([
      {
        messageId: '',
        role: 'interviewer',
        content: '첫 질문', // 여기 실제 첫 질문 넣어야됨
      },
    ]);
  }, []);

  // 최대 메시지 도달 확인
  useEffect(() => {
    setIsMaxMessages(messages.length >= 10);
    setIsLastMessageUser(messages.length > 0 && messages[messages.length - 1].role === 'interviewee');
  }, [messages]);

  // 채팅 컨테이너에 대한 참조를 생성(DOM 요소에 접근)
  const { chatContainerRef, textareaRef } = useContainerHeight(editMessageId);
  const messagesEndRef = useScrollToBottom(messages); // 메시지 보내면 하단으로 스크롤

  const addMessage = (content: string, role: string, messageId?: string) => {
    setMessages((prevMessages) => [...prevMessages, { content, role, messageId: messageId || String(Date.now()) }]);
  };

  // 메시지 전송 함수
  const handleSubmit = async (newMessage: string) => {
    if (newMessage.trim() && !isMaxMessages) {
      const data = await postInterviewMessage(interviewId, {
        sender: 'interviewee',
        content: newMessage,
      });

      addMessage(newMessage, 'interviewee', data?.data.messageId);
    }
  };

  // 꼬리 질문 생성
  const handleTailQuestion = async () => {
    if (!isMaxMessages) {
      try {
        const response = await fetchTailQuestion(interviewId);
        addMessage(response.data.content, 'interviewer', response.data.messageId);
      } catch (error) {
        console.error('꼬리 질문 생성 실패:', error);
      }
    }
  };
  // 새 질문 생성
  const handleNewQuestion = async () => {
    if (!isMaxMessages) {
      try {
        const response = await fetchNewQuestion(interviewId);
        addMessage(response.data.content, 'interviewer', response.data.messageId);
      } catch (error) {
        console.error('새 질문 생성 실패:', error);
      }
    }
  };
  // 수정 버튼 누르면
  const handleEdit = (messageId: string, content: string) => {
    setEditMessageId(messageId); // 현재 수정하는 메시지id
    setEditedText(content); // 수정 전 텍스트
  };
  // 저장 버튼 누르면
  const handleSaveEdit = async (messageId: string) => {
    try {
      await putInterviewMessage(messageId, {
        content: editedText, // put에 들어가는거
      }); // put api 호출
      setMessages((prevMessages) =>
        // 수정한 id의 메시지만 editedText로 업데이트
        prevMessages.map((msg) => (msg.messageId === messageId ? { ...msg, content: editedText } : msg)),
      );
      setEditMessageId(null); // 수정 끝나면 메시지id 비워주기
    } catch (error) {
      console.error('클라이언트) 메시지 수정 실패:', error);
    }
  };
  // 취소 버튼 누르면
  const handleCancelEdit = () => {
    setEditMessageId(null); // 수정 끝나면 메시지id 비워주기
    setEditedText(''); // 수정 전 텍스트도 비워주기
  };
  return (
    <div
      ref={chatContainerRef}
      className="flex flex-col w-full relative min-w-[360px] max-w-[735px] px-4 border-t border-gray-2"
    >
      <Video />
      <div className="flex-shrink overflow-y-auto pt-5 pb-4 hide-scrollbar">
        <div className="flex flex-col gap-7">
          {messages.map((msg, index) => (
            <motion.div
              key={msg.messageId}
              variants={messageVariants}
              initial="hidden"
              animate="visible"
              className={`flex flex-col ${msg.role === 'interviewer' ? 'items-start' : 'items-end'}`}
            >
              {msg.role === 'interviewer' && <p className="font-semibold pb-3">면접관</p>}

              <div
                className={`flex gap-3 ${editMessageId === msg.messageId ? 'w-full' : 'max-w-[90%] sm:max-w-[80%] '}`}
              >
                {msg.role === 'interviewee' && index === messages.length - 1 && (
                  <MsgEditBtn
                    isEdit={editMessageId === msg.messageId}
                    onEdit={() => handleEdit(msg.messageId, msg.content)}
                    onCancel={handleCancelEdit}
                    onSave={() => handleSaveEdit(msg.messageId)}
                  />
                )}
                {editMessageId === msg.messageId ? (
                  <textarea
                    ref={textareaRef}
                    className="break-words w-full chat-msg-text bg-primary-0 bg-opacity-35 hide-scrollbar resize-none focus:outline-none mr-0.5"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                  />
                ) : (
                  <div
                    className={`break-words chat-msg-text ${msg.role === 'interviewer' ? 'bg-gray-4 dark:bg-black-3' : 'bg-primary-0 dark:bg-gray-4 dark:text-black-0'}`}
                  >
                    {msg.content}
                  </div>
                )}
              </div>
              {/* 본인이 보낸 메시지이면서 마지막 메시지에 보이는 새 질문, 꼬리 질문 버튼 */}
              {msg.role === 'interviewee' &&
                index === messages.length - 1 &&
                !isMaxMessages &&
                editMessageId !== msg.messageId && (
                  <TailNewBtn TailQuestion={handleTailQuestion} NewQuestion={handleNewQuestion} />
                )}
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      {/* 메시지 입력 폼 */}
      {!isMaxMessages ? (
        <MessageForm onSubmit={handleSubmit} disabled={isMaxMessages || isLastMessageUser} />
      ) : (
        <div className="text-center py-4 rounded-b-3xl bg-gray-4 font-bold">모의 면접이 종료되었습니다.</div>
      )}
    </div>
  );
}
