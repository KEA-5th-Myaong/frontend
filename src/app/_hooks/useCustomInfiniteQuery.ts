import { useInfiniteQuery, UseInfiniteQueryOptions, QueryFunction, QueryKey } from '@tanstack/react-query';

const defaultQueryOptions = {
  refetchOnMount: false,
  refetchOnWindowFocus: false,
};

export default function useCustomInfiniteQuery<T>(
  key: QueryKey,
  queryFn: QueryFunction<T>,
  options?: Omit<UseInfiniteQueryOptions<T>, 'queryKey' | 'queryFn'>,
) {
  return useInfiniteQuery<T>({
    queryKey: key,
    queryFn,
    ...defaultQueryOptions,
    ...options,
  });
}
