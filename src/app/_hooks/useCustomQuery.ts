import { useQuery, UseQueryOptions, QueryFunction } from '@tanstack/react-query';

const defaultQueryOptions = {
  refetchOnMount: false, // 다른 탭에 갔다오거나
  refetchOnWindowFocus: false, // 마우스를 다시 클릭 했을 때 fetch하는거 false로
};

export default function useCustomQuery<T>(
  key: string[],
  queryFn: QueryFunction<T>,
  options?: Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>,
) {
  return useQuery<T>({
    queryKey: key,
    queryFn,
    ...defaultQueryOptions, // 기본 옵션 추가
    ...options,
  });
}
