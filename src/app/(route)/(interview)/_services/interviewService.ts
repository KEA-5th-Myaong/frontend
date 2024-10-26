import api from '@/app/api/axiosInstance';

// (GET) 선택 가능한 기업 목록 조회
export async function fetchCompanies() {
  try {
    const { data } = await api.get('/interviews/companies');
    return data;
  } catch (error) {
    console.error('선택 가능한 기업 목록 조회 실패:', error);
    throw error;
  }
}

// (GET) 선택 가능한 기업 검색
export async function fetchCompaniesSearch(search: unknown) {
  try {
    const { data } = await api.get(`/interviews/companies/search?search=${search}`);
    return data;
  } catch (error) {
    console.error('선택 가능한 기업 검색 실패:', error);
    throw error;
  }
}

// (GET) 면접 질문 리스트 생성
export async function fetchCompanyQuestions(companyId: string) {
  try {
    const { data } = await api.get(`/interviews/${companyId}/questions`);
    return data;
  } catch (error) {
    console.error('면접 질문 리스트 생성 실패:', error);
    throw error;
  }
}

// (POST) 면접 생성
export async function postInterview(interviewData: unknown) {
  try {
    const { data } = await api.post('/interviews', interviewData);
    return data;
  } catch (error) {
    console.error('면접 생성 실패:', error);
    throw error;
  }
}

// (POST) 면접 메시지 전송
export async function postInterviewMessage(interviewId: string, interviewData: unknown) {
  try {
    const { data } = await api.post(`/interviews/${interviewId}/messages`, interviewData);
    return data;
  } catch (error) {
    console.error('면접 메시지 전송 실패:', error);
    throw error;
  }
}

// (PUT) 면접 메시지 수정
export async function putInterviewMessage(messageId: string, interviewData: unknown) {
  try {
    const { data } = await api.put(`/interviews/messages/${messageId}`, interviewData);
    return data;
  } catch (error) {
    console.error('면접 메시지 수정 실패:', error);
    throw error;
  }
}

// (GET) 새 질문 생성
export async function fetchNewQuestion(interviewId: string) {
  try {
    const { data } = await api.get(`/interviews/${interviewId}/q`);
    return data;
  } catch (error) {
    console.error('새 질문 생성 실패:', error);
    throw error;
  }
}

// (GET) 꼬리 질문 생성
export async function fetchTailQuestion(interviewId: string) {
  try {
    const { data } = await api.get(`/interviews/${interviewId}/follow-up-q`);
    return data;
  } catch (error) {
    console.error('꼬리 질문 생성 실패:', error);
    throw error;
  }
}

// (GET) 면접 기록 목록 조회
export async function fetchInterviewHistoryLists() {
  try {
    const { data } = await api.get('/interviews');
    return data;
  } catch (error) {
    console.error('면접 기록 조회 실패:', error);
    throw error;
  }
}

// (GET) 특정 면접 기록 조회
export async function fetchInterviewHistory(interviewId: string) {
  try {
    const { data } = await api.get(`/interviews/${interviewId}`);
    return data;
  } catch (error) {
    console.error('특정 면접 기록 조회 실패:', error);
    throw error;
  }
}

// (DELETE) 면접 기록 삭제
export async function deleteInterview(interviewId: string) {
  try {
    await api.delete(`/interviews/${interviewId}`);
  } catch (error) {
    console.error('면접 기록 삭제 실패:', error);
    throw error;
  }
}
