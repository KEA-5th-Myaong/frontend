import { create } from 'zustand';
import { Message } from '../(route)/(interview)/interview/[username]/[corp]/chat/_types/messageType';

interface ChatHistoryStore {
  messages: Message[];
  chatHistory: string;
  setMessages: (messages: Message[]) => void;
  formatAndSaveMessages: () => void;
  resetChatHistory: () => void;
}

const useChatWriteStore = create<ChatHistoryStore>((set, get) => ({
  messages: [],
  chatHistory: '',
  setMessages: (messages) => set({ messages }),
  formatAndSaveMessages: () => {
    const { messages } = get();
    const formattedMessages = messages.map((msg) => `${msg.isAI ? '면접관' : '나'}: ${msg.text}`).join('\n\n');
    set({ chatHistory: formattedMessages });
  },
  resetChatHistory: () => set({ messages: [], chatHistory: '' }),
}));

export default useChatWriteStore;
