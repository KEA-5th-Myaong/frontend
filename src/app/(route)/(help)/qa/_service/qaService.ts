import api from '@/app/api/axiosInstance';

// (GET) 문의 목록 조회(페이징)
export async function fetchInquiries(page: number, pageSize: number) {
  try {
    const { data } = await api.get(`/inquiries?page=${page}&pageSize=${pageSize}`);
    return data;
  } catch (error) {
    console.error('문의 목록 조회(페이징) 실패:', error);
    throw error;
  }
}

// (GET) 문의 조회
export async function fetchInquiry(inquiryId: number) {
  try {
    const { data } = await api.get(`/inquiries/${inquiryId}`);
    return data;
  } catch (error) {
    console.error('문의 조회 실패:', error);
    throw error;
  }
}

// (POST) 문의 작성
export async function postAdminLogin(inquiryData: unknown) {
  try {
    const { data } = await api.post('/inquiries', inquiryData);
    return data;
  } catch (error) {
    console.error('문의 작성 실패:', error);
    throw error;
  }
}
