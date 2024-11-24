import {
  useInfiniteQuery, // 무한 스크롤 쿼리를 위한 기본 훅
  UseInfiniteQueryOptions, // 무한 스크롤 쿼리 옵션 타입
  QueryFunctionContext, // 쿼리 함수의 컨텍스트 타입
  InfiniteData, // 무한 스크롤 데이터를 위한 타입
} from '@tanstack/react-query';

const defaultQueryOptions = {
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  initialPageParam: null,
} as const;

export default function useCustomInfiniteQuery<TData>(
  queryKey: string[],
  queryFn: (context: QueryFunctionContext<string[], unknown>) => Promise<TData>,
  options?: Omit<
    UseInfiniteQueryOptions<TData, Error, InfiniteData<TData>, TData, string[], unknown>,
    'queryKey' | 'queryFn'
  >,
) {
  return useInfiniteQuery<TData, Error, InfiniteData<TData>, string[]>({
    queryKey,
    queryFn, // 데이터를 가져오는 함수
    getNextPageParam: () => undefined, // 다음 페이지 파라미터 계산 함수 (기본값: undefined)
    ...defaultQueryOptions, // 기본 옵션 적용
    ...options,
  });
}
