import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import api from '../api/axiosInstance';

type HttpMethod = 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export default function useCustomMutation<TData = unknown, TVariables = unknown>(
  url: string,
  method: HttpMethod,
  options?: UseMutationOptions<TData, AxiosError, TVariables>,
) {
  return useMutation<TData, AxiosError, TVariables>({
    mutationFn: async (variables) => {
      const { data } = await api[method.toLowerCase() as Lowercase<HttpMethod>]<TData>(url, variables);
      return data;
    },
    ...options,
  });
}
