import { create } from 'zustand';

interface PostWriteStore {
  postTitle: string; // 게시글 제목
  postData: string; // 게시글 내용
  setPostTitle: (title: string) => void; // 게시글 제목 저장 함수
  setPostData: (data: string) => void; // 게시글 내용 저장 함수
  resetPost: () => void; // 게시글 전체 초기화
}

const usePostWriteStore = create<PostWriteStore>((set) => ({
  postTitle: '',
  postData: '',
  setPostTitle: (title) => set({ postTitle: title }),
  setPostData: (data) => set({ postData: data }),
  resetPost: () => set({ postTitle: '', postData: '' }),
}));

export default usePostWriteStore;
