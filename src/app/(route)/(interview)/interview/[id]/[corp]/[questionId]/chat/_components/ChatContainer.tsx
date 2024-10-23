'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
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
  putInterviewMessage,
} from '@/app/(route)/(interview)/_services/interviewService';
import useInterviewStore from '../../../_store/interviewStore';
import { Message } from '../_types/messageType';
import MsgEditBtn from './MsgEditBtn';

const MAX_MESSAGES = 10;

export default function ChatContainer() {
  const interviewId = '1'; // 나중에 실제 아이디로 대체
  // 이 전에 고른 첫 번째 질문
  const storeQData = useInterviewStore((state) => state.storeQData);

  // 새 질문
  const { data: newQData } = useCustomQuery(['new-q', interviewId], () => fetchInterviewNewQuestion(interviewId));
  // 꼬리 질문
  const { data: tailQData } = useCustomQuery(['tail-q', interviewId], () => fetchInterviewTailQuestion(interviewId));

  const [messages, setMessages] = useState<Message[]>([]); // 채팅 내용 다 담김
  const [isMaxMessages, setIsMaxMessages] = useState(false); // 최대 채팅 수 도달
  const [isLastMessageUser, setIsLastMessageUser] = useState(false); // 마지막 메시지가 사용자인지
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editedText, setEditedText] = useState<string>(''); // 수정한 메시지

  // firstQData가 로드되면 첫 메시지로 설정
  useEffect(() => {
    if (storeQData) {
      setMessages([{ text: String(storeQData), isAI: true, messageId: '1' }]);
    }
  }, [storeQData]);
  // 최대 메시지 도달 확인
  useEffect(() => {
    setIsMaxMessages(messages.length >= MAX_MESSAGES);
    setIsLastMessageUser(messages.length > 0 && !messages[messages.length - 1].isAI);
  }, [messages]);

  // 채팅 컨테이너에 대한 참조를 생성(DOM 요소에 접근)
  const chatContainerRef = useContainerHeight();
  const messagesEndRef = useScrollToBottom(messages); // 메시지 보내면 하단으로 스크롤

  const addMessage = (message: string, isAI: boolean, messageId?: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, isAI, messageId: messageId || String(Date.now()) },
    ]);
  };

  // 메시지 전송 함수
  const handleSubmit = (newMessage: string) => {
    if (newMessage.trim() && !isMaxMessages) {
      addMessage(newMessage, false);
    }
  };

  // 꼬리 질문 생성
  const handleTailQuestion = () => {
    if (!isMaxMessages) {
      addMessage(tailQData?.data.content, true, tailQData?.data.messageId);
    }
  };
  // 새 질문 생성
  const handleNewQuestion = () => {
    if (!isMaxMessages) {
      addMessage(newQData?.data.content, true, newQData?.data.messageId);
    }
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [editingMessageId]);

  // 수정 버튼 누르면
  const handleEdit = (messageId: string, text: string) => {
    setEditingMessageId(messageId); // 현재 수정하는 메시지id
    setEditedText(text); // 수정 전 텍스트
  };

  // 저장 버튼 누르면
  const handleSaveEdit = async (messageId: string) => {
    const content = {
      content: editedText, // put에 들어가는거
    };
    try {
      await putInterviewMessage(messageId, content); // put api 호출
      setMessages((prevMessages) =>
        // 수정한 id의 메시지만 editedText로 업데이트
        prevMessages.map((msg) => (msg.messageId === messageId ? { ...msg, text: editedText } : msg)),
      );
      setEditingMessageId(null); // 수정 끝나면 메시지id 비워주기
    } catch (error) {
      console.error('클라이언트) 메시지 수정 실패:', error);
    }
  };

  // 취소 버튼 누르면
  const handleCancelEdit = () => {
    setEditingMessageId(null); // 수정 끝나면 메시지id 비워주기
    setEditedText(''); // 수정 전 텍스트도 비워주기
  };

  // 테스트 화면 녹화하기
  const videoRef = useRef<HTMLVideoElement>(null);

  const getMediaPermission = useCallback(async () => {
    try {
      const videoConstraints = {
        audio: false,
        video: true,
      };

      const videoStream = await navigator.mediaDevices.getUserMedia(videoConstraints);

      if (videoRef.current) {
        videoRef.current.srcObject = videoStream;
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getMediaPermission();
  }, [getMediaPermission]);

  const [showFace, setShowFace] = useState(false);

  return (
    <div
      ref={chatContainerRef}
      className="flex flex-col w-full relative min-w-[360px] max-w-[735px] px-4 border-t border-gray-2"
    >
      <div className="fixed left-12 bottom-12 z-50">
        <video
          ref={videoRef}
          className={`${showFace ? 'block' : 'hidden'} w-64 h-64 bg-gray-3 -scale-x-100`}
          autoPlay
        />

        <button
          type="button"
          className="py-4  px-6 rounded-[28px] primary-1-btn mt-2"
          onClick={() => {
            setShowFace((prev) => !prev);
          }}
        >
          {showFace ? 'AI 표정 분석 종료' : 'AI 표정 분석'}
        </button>
      </div>

      <div className="flex-shrink overflow-y-auto pt-5 pb-4 hide-scrollbar">
        <div className="flex flex-col gap-7">
          {messages.map((msg, index) => (
            <motion.div
              key={msg.messageId}
              variants={messageVariants}
              initial="hidden"
              animate="visible"
              className={`flex flex-col ${msg.isAI ? 'items-start' : 'items-end'}`}
            >
              {msg.isAI && <p className="font-semibold pb-3">면접관</p>}

              <div
                className={`flex gap-3 ${editingMessageId === msg.messageId ? 'w-full' : 'max-w-[90%] sm:max-w-[80%] '}`}
              >
                {!msg.isAI && index === messages.length - 1 && (
                  <MsgEditBtn
                    isEdit={editingMessageId === msg.messageId}
                    onEdit={() => handleEdit(msg.messageId, msg.text)}
                    onCancel={handleCancelEdit}
                    onSave={() => handleSaveEdit(msg.messageId)}
                  />
                )}
                {editingMessageId === msg.messageId ? (
                  <textarea
                    ref={textareaRef}
                    className="break-words w-full chat-msg-text bg-primary-0 bg-opacity-35 hide-scrollbar resize-none focus:outline-none mr-0.5"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                  />
                ) : (
                  <div className={`break-words chat-msg-text ${msg.isAI ? 'bg-gray-4' : 'bg-primary-0'}`}>
                    {msg.text}
                  </div>
                )}
              </div>

              {!msg.isAI && index === messages.length - 1 && !isMaxMessages && editingMessageId !== msg.messageId && (
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
      {!isMaxMessages ? (
        <MessageForm onSubmit={handleSubmit} disabled={isMaxMessages || isLastMessageUser} />
      ) : (
        <div className="text-center py-4 rounded-b-3xl bg-gray-4 font-bold">모의 면접이 종료되었습니다.</div>
      )}
    </div>
  );
}
