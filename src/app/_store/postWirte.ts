import { create } from 'zustand';
import { Message } from '../(route)/(interview)/interview/[username]/[corp]/chat/_types/messageType';

interface PostWriteStore {
  postData: string;
  setPostData: (data: string) => void;
  resetPostData: () => void;

  // 모의 면접 채팅 내역
  messages?: Message[];
  setMessage?: (messages: Message[]) => void;
  formatAndSaveMessages?: () => void;
}

const usePostWriteStore = create<PostWriteStore>((set, get) => ({
  postData: '',
  setPostData: (data) => set({ postData: data }),
  resetPostData: () => set({ postData: '', messages: [] }),

  // 모의면접 채팅 내역
  messages: [],
  setMessage: (messages) => set({ messages }),
  formatAndSaveMessages: () => {
    const { messages } = get();
    if (!messages) return;

    const formattedMessages = messages.map((msg) => `${msg.isAI ? '면접관' : '나'}: ${msg.text}`).join('\n\n');
    set({ postData: formattedMessages });
  },
}));

export default usePostWriteStore;
