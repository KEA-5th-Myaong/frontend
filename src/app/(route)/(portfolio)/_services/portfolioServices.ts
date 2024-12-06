import api from '@/app/api/axiosInstance';

// (GET) 포트폴리오 목록 조회
export async function fetchPortfolios() {
  try {
    const { data } = await api.get('/portfolios');
    return data;
  } catch (error) {
    console.error('포트폴리오 목록 조회 실패:', error);
    throw error;
  }
}

// (GET) 특정 포트폴리오 조회
export async function fetchPortfolio(portfolioId: string) {
  try {
    const { data } = await api.get(`/portfolios/${portfolioId}`);
    return data;
  } catch (error) {
    console.error('특정 포트폴리오 조회 실패:', error);
    throw error;
  }
}

// (POST) 포트폴리오 작성
export async function postPorfolios(portfolioData: unknown) {
  try {
    const stringifiedData = JSON.stringify(portfolioData);
    const { data } = await api.post('/portfolios', stringifiedData);
    return data;
  } catch (error) {
    console.error('포트폴리오 작성 실패:', error);
    throw error;
  }
}

// (POST) 포트폴리오 이미지 등록
export async function postPortfoliosPic(portfolioId: string) {
  try {
    const { data } = await api.post(`/portfolios/${portfolioId}/pic`);
    return data;
  } catch (error) {
    console.error('포트폴리오 이미지 등록 실패:', error);
    throw error;
  }
}

// (DELETE) 포트폴리오 이미지 삭제
export async function deleteProtfoliosPic(portfolioId: string) {
  try {
    await api.delete(`/portfolios/${portfolioId}`);
  } catch (error) {
    console.error('포트폴리오 이미지 삭제 실패:', error);
    throw error;
  }
}

// (PUT) 대표 포트폴리오 설정
export async function putPortfoliosMain(portfolioId: string) {
  try {
    await api.put(`/${portfolioId}/main`);
  } catch (error) {
    console.error('대표 포트폴리오 설정 실패:', error);
    throw error;
  }
}

// (POST) 포트폴리오 메모 등록
export async function postPortfoliosMemo(portfolioId: string, memoData: unknown) {
  try {
    const { data } = await api.post(`/portfolios/${portfolioId}/memo`, memoData);
    return data;
  } catch (error) {
    console.error('포트폴리오 메모 등록 실패: ', error);
    throw error;
  }
}

// (PUT) 포트폴리오 수정
export async function putPortfolios(portfolioId: string, portfoiloData: unknown) {
  try {
    const { data } = await api.put(`/portfolios/${portfolioId}`, portfoiloData);
    return data;
  } catch (error) {
    console.error('포트폴리오 수정 실패:', error);
    throw error;
  }
}

// (DELETE) 포트폴리오 삭제
export async function deletePortfolios(portfolioId: string) {
  try {
    await api.delete(`/portfolios/${portfolioId}`);
  } catch (error) {
    console.error('포트폴리오 삭제 실패:', error);
    throw error;
  }
}

// (GET) 공유 링크 생성

// (GET) 생성된 공유 링크로 접속
