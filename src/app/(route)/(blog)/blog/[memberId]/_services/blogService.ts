import api from '@/app/api/axiosInstance';

// (GET) 사용자의 포스트 목록 조회
export async function fetchPost(memberId: string, lastId: string) {
  const { data } = await api.get(`/blog/posts/members/${memberId}/${lastId}`);
  return data;
}

// (POST) 포스트 작성
export async function postPost(postData: unknown) {
  api.post(`/blog/posts`, postData);
}
