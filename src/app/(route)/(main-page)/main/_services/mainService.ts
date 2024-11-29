import api from '@/app/api/axiosInstance';

// (GET) 전체 관심 직군 목록 조회
export async function fetchAllPreJobs() {
  try {
    const { data } = await api.get('/pre-jobs/jobs');
    return data;
  } catch (error) {
    console.error('전체 관심 직군 목록 조회 실패:', error);
    throw error;
  }
}

// (GET) 회원의 관심 직군 목록 조회
export async function fetchPreJobs() {
  try {
    const { data } = await api.get('/pre-jobs');
    return data;
  } catch (error) {
    console.error('회원의 관심 직군 목록 조회 실패:', error);
    throw error;
  }
}

// (POST) 관심 직군 등록/수정
export async function postPreJobs(preJobData: unknown) {
  try {
    const { data } = await api.post('/pre-jobs', preJobData);
    return data;
  } catch (error) {
    console.error('관심 직군 등록/수정 실패:', error);
    throw error;
  }
}

// (GET) 내용으로 포스트 검색
export async function fetchPostSearch(lastId: string, search: string) {
  try {
    const { data } = await api.get(`/blog/search/${lastId}?search=${search}`);
    return data;
  } catch (error) {
    console.error('내용으로 포스트 검색 실패:', error);
    throw error;
  }
}

// (GET) 메인페이지 포스트 목록 조회, lastId는 마지막 포스트의 아이디(무한스크롤 구현을 위해)
export async function fetchPosts(lastId: string) {
  try {
    const { data } = await api.get(`/blog/recent/${lastId}`);
    return data;
  } catch (error) {
    console.error('메인페이지 포스트 목록 조회 실패', error);
    throw error;
  }
}

// (GET) 메인페이지 선호 직업별 포스트 목록 조회
export async function fetchPreJob(lastId: string, preJob: string[]) {
  try {
    const preJobString = preJob.join(',');
    const { data } = await api.get(`/blog/recommend/${lastId}?preJob=${preJobString}`);
    return data;
  } catch (error) {
    console.error('메인페이지 선호 직업별 포스트 목록 조회 실패:', error);
    throw error;
  }
}

// (GET) 메인페이지 팔로우 중인 사용자 포스트 목록 조회
export async function fetchFollowing(lastId: string) {
  try {
    const { data } = await api.get(`/blog/following/${lastId}`);
    return data;
  } catch (error) {
    console.error('메인페이지 팔로우 중인 사용자 포스트 목록 조회 실패', error);
    throw error;
  }
}

// (GET) 메인페이지 북마크한 포스트 목록 조회
export async function fetchBookmark(lastId: string) {
  try {
    const { data } = await api.get(`/blog/bookmark/${lastId}`);
    return data;
  } catch (error) {
    console.error('메인페이지 북마크한 포스트 목록 조회 실패:', error);
    throw error;
  }
}

// (GET) 메인페이지 검색한 포스트 목록 조회
export async function fetchSearchedList(lastId: string, search: string) {
  try {
    const { data } = await api.get(`/blog/posts/search/${lastId}?search=${search}`);
    return data;
  } catch (error) {
    console.error('메인페이지 검색한 포스트 목록 조회 실패:', error);
    throw error;
  }
}
