import api from '@/app/api/axiosInstance';

// (GET)메인페이지 포스트 목록, lastId는 마지막 포스트의 아이디(무한스크롤 구현을 위해)
export async function fetchPosts(lastId: string) {
  const { data } = await api.get(`/blog/posts/${lastId}`);
  return data;
}

// (GET)메인페이지 선호 직업별 포스트 목록
export async function fetchRecommend(lastId: string, preJob: string[]) {
  const { data } = await api.get(`/blog/recommend/${lastId}`);
  return data;
}

// (GET)메인페이지 팔로우 중인 사용자 포스트 목록
export async function fetchFollowing(lastId: string) {
  const { data } = await api.get(`/blog/following/${lastId}`);
  return data;
}

// (GET)메인페이지 북마크한 포스트 목록
export async function fetchBookmark(lastId: string) {
  const { data } = await api.get(`/blog/bookmark/${lastId}`);
  return data;
}
