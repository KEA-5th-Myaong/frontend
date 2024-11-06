import { create } from 'zustand';

interface PostWriteStore {
  postData: string; // 게시글 데이터 문자
  setPostData: (data: string) => void; // 게시글 데이터 저장 함수
  resetPostData: () => void; // 게시글 데이터 초기화
}

const usePostWriteStore = create<PostWriteStore>((set) => ({
  postData: '',
  setPostData: (data) => set({ postData: data }),
  resetPostData: () => set({ postData: '' }),
}));

export default usePostWriteStore;
