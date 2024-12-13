import axios, { AxiosInstance } from 'axios';

const apiConfig = {
  backend: {
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  },
};

const server = apiConfig.backend.baseURL;

const api: AxiosInstance = axios.create({
  baseURL: server,
  withCredentials: true, // 쿠키를 포함한 인증 정보를 서버에 전송
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 추가(모든 요청이 실행되기 전에 실행되는 미들웨어)
api.interceptors.request.use(
  (config) => {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('accessToken=')) // 쿠키에서 accessToken을 찾음
      ?.split('=')[1]; // 쿠키 문자열을 분리하고 accessToken으로 시작하는 항목을 찾아서 값을 추출합니다
    // 토큰이 있으면 헤더에 추가
    if (token) {
      const decodedToken = decodeURIComponent(token);
      // Bearer가 없는 경우에만 추가
      const authHeader = decodedToken.startsWith('Bearer ') ? decodedToken : `Bearer ${decodedToken}`;

      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = authHeader;
    }
    return config; // 수정된 설정 반환
  },
  (error) => {
    return Promise.reject(error); // 에러가 발생한 경우 Promise.reject로 에러 전파
  },
);

export default api;
