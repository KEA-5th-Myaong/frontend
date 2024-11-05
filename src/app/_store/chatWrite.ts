import { create } from 'zustand';
import { Message } from '../(route)/(interview)/interview/[username]/[corp]/chat/_types/messageType';

interface ChatHistoryStore {
  messages: Message[]; // 채팅 내역 배열
  setMessages: (messages: Message[]) => void; // 채팅 내역 배열 저장 함수
  resetMessages: () => void; // 채팅 내역 초기화
}

const useChatWriteStore = create<ChatHistoryStore>((set) => ({
  messages: [], // 모의면접 채팅 내역
  setMessages: (messages) => set({ messages }),
  resetMessages: () => set({ messages: [] }),
}));

export default useChatWriteStore;
