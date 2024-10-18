import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import api from '../api/axiosInstance';

// HTTP 메서드 타입 정의
type HttpMethod = 'POST' | 'PUT' | 'PATCH' | 'DELETE';

// TData = 응답 데이터의 타입, TVariables = 요청 변수의 타입
export default function useCustomMutation<TData = unknown, TVariables = unknown>(
  url: string, // api 엔드포인트 url
  method: HttpMethod, // 사용할 HTTP 메서드
  options?: UseMutationOptions<TData, AxiosError, TVariables>, // react-query의 useMutation 옵션
) {
  return useMutation<TData, AxiosError, TVariables>({
    // 뮤테이션 함수
    mutationFn: async (variables) => {
      const { data } = await api[method.toLowerCase() as Lowercase<HttpMethod>]<TData>(url, variables); // method.toLowerCase()를 사용하여 메서드 이름을 소문자로 변환
      return data;
    },
    ...options,
  });
}
