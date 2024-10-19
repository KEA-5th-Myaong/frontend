import api from '@/app/api/axiosInstance';

// (GET)메인페이지 포스트 목록,
export async function fetchPosts(lastId: string) {
  const { data } = await api.get(`/blog/posts/${lastId}`);
  return data;
}

// (GET)메인페이지 선호 직업별 포스트
export async function fetchRecommend() {
  const { data } = await api.get('/blog/recommend');
  return data;
}

// (GET)메인페이지 팔로우 중인 사용자 포스트
export async function fetchFollowing() {
  const { data } = await api.get('/blog/following');
  return data;
}
