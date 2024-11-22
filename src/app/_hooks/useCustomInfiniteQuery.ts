import { useInfiniteQuery, UseInfiniteQueryOptions } from '@tanstack/react-query';

const defaultQueryOptions = {
  refetchOnMount: false,
  refetchOnWindowFocus: false,
};

export default function useCustomInfiniteQuery<TData>(
  queryKey: string[],
  queryFn: (context: { pageParam: string }) => Promise<TData>,
  options?: Omit<UseInfiniteQueryOptions<TData, Error, TData>, 'queryKey' | 'queryFn'>,
) {
  return useInfiniteQuery<TData, Error, TData>({
    queryKey,
    queryFn,
    ...defaultQueryOptions,
    ...options,
  });
}
