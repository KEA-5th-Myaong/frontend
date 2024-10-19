import { useQuery, UseQueryOptions, QueryFunction } from '@tanstack/react-query';

export default function useCustomQuery<T>(
  key: string[],
  queryFn: QueryFunction<T>,
  options?: Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>,
) {
  return useQuery<T>({
    queryKey: key,
    queryFn,
    ...options,
  });
}
