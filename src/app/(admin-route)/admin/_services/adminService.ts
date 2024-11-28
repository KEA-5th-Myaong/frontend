import api from '@/app/api/axiosInstance';

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

// (POST) 알림 생성 (구현 아직 안됨)
export async function addCorp(name: string) {
  try {
    await api.post('/admin/companies', name);
  } catch (error) {
    console.error('알림 생성 실패:', error);
    throw error;
  }
}
