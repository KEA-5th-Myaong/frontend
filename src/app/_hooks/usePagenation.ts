import { useQuery, QueryKey, UseQueryOptions } from '@tanstack/react-query';

interface PaginationResult {
  nextPage: number | null;
}

interface UsePaginationProps<T extends PaginationResult> {
  queryKey: QueryKey;
  queryFn: (page: number, pageSize: number) => Promise<T>;
  page?: number;
  pageSize?: number;
  options?: Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>;
}

export default function usePagination<T extends PaginationResult>({
  queryKey,
  queryFn,
  page = 1, // 현재 페이지
  pageSize = 10, // 페이지당 데이터 수
  options = {},
}: UsePaginationProps<T>) {
  const { data, isLoading, isError, error, isFetching, refetch } = useQuery({
    queryKey: [...queryKey, page, pageSize],
    queryFn: () => queryFn(page, pageSize),
    placeholderData: (previousData) => previousData, // 이전 데이터를 플레이스 홀더로 사용
    ...options,
  });

  return {
    data,
    hasNextPage: data?.nextPage != null,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  };
}
