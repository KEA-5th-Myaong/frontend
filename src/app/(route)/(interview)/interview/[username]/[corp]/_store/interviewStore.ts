import { create } from 'zustand';

interface FirsteQStore {
  storeQData: string;
}

interface InterviewStore {
  storeQData: FirsteQStore;
  setFirstQData: (data: FirsteQStore) => void;
  resetFirstData: () => void;
}

// 빈 질문
const initailState: FirsteQStore = {
  storeQData: '',
};

const useInterviewStore = create<InterviewStore>((set) => ({
  storeQData: initailState,
  setFirstQData: (data) => set({ storeQData: data }),
  resetFirstData: () => set({ storeQData: initailState }),
}));

export default useInterviewStore;
