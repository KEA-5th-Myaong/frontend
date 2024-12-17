import api from '@/app/api/axiosInstance';

// (GET) 피신고 콘텐츠 목록 조회(무한 스크롤)
export async function fetchReportedContents(lastId: string) {
  try {
    const { data } = await api.get(`/admin/contents/reported/${lastId}`);
    return data;
  } catch (error) {
    console.error('피신고 콘텐츠 목록 조회(무한 스크롤) 실패:', error);
    throw error;
  }
}

// (GET) 블라인드 콘텐츠 목록 조회(무한 스크롤)
export async function fetchBlindedContents(lastId: string) {
  try {
    const { data } = await api.get(`/admin/contents/blind/${lastId}`);
    return data;
  } catch (error) {
    console.error('블라인드 콘텐츠 목록 조회(무한 스크롤) 실패:', error);
    throw error;
  }
}

// (PUT) 포스트 블라인드 토글
export async function putPostBlind(postId: string, contents: unknown) {
  try {
    const { data } = await api.put(`/admin/contents/posts/${postId}/blind`, contents);
    return data;
  } catch (error) {
    console.error('포스트 블라인드 토글 실패:', error);
    throw error;
  }
}

// (PUT) 댓글/답글 블라인드 토글
export async function putCommentBlind(commentId: string, contents: unknown) {
  try {
    const { data } = await api.put(`/admin/contents/comments/${commentId}/blind`, contents);
    return data;
  } catch (error) {
    console.error('댓글/답글 블라인드 토글');
    throw error;
  }
}

// (GET) 기업 목록 조회 (구현 아직 안됨)
export async function fetchCorp() {
  try {
    const { data } = await api.get(`/admin/companies`);
    return data;
  } catch (error) {
    console.error('알림 조회 실패:', error);
    throw error;
  }
}

// (GET) 문의 조회
export async function fetchAdminInquery(page: number) {
  try {
    const { data } = await api.get(`/admin/inquiries`, {
      params: { page },
    });
    return data;
  } catch (error) {
    console.error('문의 조회 실패:', error);
    throw error;
  }
}

// (PUT) 문의 답변
export async function putInqueryAnswer(inqueryId: string, content: string) {
  try {
    const { data } = await api.put(`/admin/inquiries/${inqueryId}`, content);
    return data;
  } catch (error) {
    console.error('댓글/답글 블라인드 토글');
    throw error;
  }
}

// (POST) 알림 생성 (구현 아직 안됨)
export async function addCorp(name: string) {
  try {
    await api.post('/admin/companies', name);
  } catch (error) {
    console.error('알림 생성 실패:', error);
    throw error;
  }
}
