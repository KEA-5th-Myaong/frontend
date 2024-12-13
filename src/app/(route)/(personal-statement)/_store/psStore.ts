import { create } from 'zustand';
import { PSFormData } from '../personal-statement/[username]/create/_types/psCreate';

interface PSStore {
  psData: PSFormData;
  setPSData: (data: PSFormData) => void;
  resetPSData: () => void;
  isTouch: boolean;
  setIsTouch: (isTouch: boolean) => void;
}
interface PersonalStatementStore {
  psId: number | null;
  setPsId: (psId: number | null) => void;
}
interface PersonalStatementStore {
  psId: number | null;
  setPsId: (psId: number | null) => void;
}
export interface PostWriteStore {
  postData: PSFormData;
  postTitle: string | null;
  postContent: string | null;
  postReason: string | null;
  postPosition: string | null;
  setPostData: (data: PSFormData) => void;
  setPostTitle: (title: string) => void;
  setPostContent: (data: string) => void;
  setPostReason: (reason: string) => void;
  setPostPosition: (position: string) => void;
}

// 빈 값, reset할 때 이걸 사용
const initialState: PSFormData = {
  title: '',
  position: '',
  reason: '',
  content: '',
};

const usePSStore = create<PSStore>((set) => ({
  psData: initialState,
  setPSData: (data) => set({ psData: data }),
  resetPSData: () => set({ psData: initialState }), // 초기화 함수
  isTouch: false,
  setIsTouch: (data) => set({ isTouch: data }),
}));

export const usePersonalStatementStore = create<PersonalStatementStore>((set) => ({
  psId: null,
  setPsId: (psId) => set({ psId }),
}));

export default usePSStore;
