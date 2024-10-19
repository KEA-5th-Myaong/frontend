import api from '@/app/api/axiosInstance';

// (GET) 자기소개서 목록 조회
export async function fetchPSList() {
  try {
    const { data } = await api.get('/ps');
    return data;
  } catch (error) {
    console.error('자기소개서 목록 조회 실패:', error);
    throw error;
  }
}

// (GET) 자기소개서 조회
export async function fetchPS(psId: string) {
  try {
    const { data } = await api.get(`/ps/${psId}`);
    return data;
  } catch (error) {
    console.error('자기소개서 조회 실패:', error);
    throw error;
  }
}

// (POST) 자기소개서 작성
export async function postPS(psData: unknown) {
  try {
    const { data } = await api.post('/ps', psData);
    return data;
  } catch (error) {
    console.error('자기소개서 작성 실패:', error);
    throw error;
  }
}

// (PUT) 자기소개서 수정
export async function putPS(psId: string, psData: unknown) {
  try {
    const { data } = await api.put(`/ps/${psId}`, psData);
    return data;
  } catch (error) {
    console.error('자기소개서 수정 실패:', error);
    throw error;
  }
}

// (DELETE) 자기소개서 삭제
export async function deletePS(psId: string) {
  try {
    await api.delete(`/ps/${psId}`);
  } catch (error) {
    console.error('자기소개서 삭제 실패:', error);
    throw error;
  }
}

// (GET) 자기소개서 첨삭
export async function fetchPSEditing(psId: string) {
  try {
    const { data } = await api.get(`/ps/${psId}/editing`);
    return data;
  } catch (error) {
    console.error('자기소개서 첨삭 실패:', error);
    throw error;
  }
}
