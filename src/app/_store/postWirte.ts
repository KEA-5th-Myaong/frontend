import { create } from 'zustand';
import { Message } from '../(route)/(interview)/interview/[username]/[corp]/chat/_types/messageType';

interface PostWriteStore {
  postData: string; // 게시글 데이터 문자
  setPostData: (data: string) => void; // 게시글 데이터 저장 함수
  resetPostData: () => void; // 게시글 데이터 초기화

  // 모의 면접 채팅 내역에서만 사용
  messages?: Message[]; // 채팅 내역 배열
  setMessage?: (messages: Message[]) => void; // 채팅 내역 배열 저장 함수
  formatAndSaveMessages?: () => void; // 채팅 내역을 포맷팅하여 저장
}

const usePostWriteStore = create<PostWriteStore>((set, get) => ({
  postData: '',
  setPostData: (data) => set({ postData: data }),
  resetPostData: () => set({ postData: '', messages: [] }),

  // 모의면접 채팅 내역
  messages: [],
  setMessage: (messages) => set({ messages }),
  formatAndSaveMessages: () => {
    const { messages } = get(); // 현재 store에서 messages를 가져옴
    if (!messages) return;

    // 메시지들을 포맷팅: 각 메시지를 "면접관: [메시지]" 또는 "나: [메시지]"
    // 형식으로 변환하고 메시지들을 줄바꿈으로 구분하여 하나의 문자열로 만듦
    const formattedMessages = messages.map((msg) => `${msg.isAI ? '면접관' : '나'}: ${msg.text}`).join('\n\n');
    set({ postData: formattedMessages });
  },
}));

export default usePostWriteStore;
