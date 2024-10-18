import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import api from '../api/axiosInstance';

export default function useCustomQuery<T>(key: string[], url: string, options?: UseQueryOptions<T>) {
  return useQuery<T>({
    queryKey: key,
    queryFn: async () => {
      const { data } = await api.get<T>(url);
      return data;
    },
    ...options,
  });
}
