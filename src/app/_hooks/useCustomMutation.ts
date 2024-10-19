import { MutationFunction, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

// TData = 응답 데이터의 타입, TVariables = 요청 변수의 타입
export default function useCustomMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>, // 뮤테이션 함수
  options?: Omit<UseMutationOptions<TData, AxiosError, TVariables>, 'mutationFn'>, // react-query의 useMutation 옵션
) {
  return useMutation<TData, AxiosError, TVariables>({
    mutationFn,
    ...options,
  });
}
