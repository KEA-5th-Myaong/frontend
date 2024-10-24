import { create } from 'zustand';

interface ChatStore {
  storeQData: string;
  setFirstQData: (data: string) => void;
  resetFirstData: () => void;
}

const useChatStore = create<ChatStore>((set) => ({
  storeQData: '',
  setFirstQData: (data) => set({ storeQData: data }),
  resetFirstData: () => set({ storeQData: '' }),
}));

export default useChatStore;
