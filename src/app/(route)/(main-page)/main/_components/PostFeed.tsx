'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 } from 'uuid';
import { useInView } from 'react-intersection-observer';
import { PostProps, PostFeedProps, PostResponse } from '../_types/main-page';
import { fetchBookmark, fetchFollowing, fetchPosts, fetchPreJob } from '../_services/mainService';
import Post from '@/app/_components/Post';
import { formatDate } from '@/app/_utils/formatDate';
import defaultProfilePic from '../../../../../../public/mascot.png';
import useCustomInfiniteQuery from '@/app/_hooks/useCustomInfiniteQuery';
import useLoveAndBookmark from '@/app/_hooks/useLoveAndBookmark';
import useMe from '@/app/_hooks/useMe';

export default function PostFeed({ activeTab, preJob }: PostFeedProps) {
  const router = useRouter();
  const { ref, inView } = useInView(); // 무한 스크롤을 위한 InterSection Observer 훅
  const [posts, setPosts] = useState<PostProps[]>([]);
  const { data: userData } = useMe();

  // 모든 무한 쿼리에 공통적으로 사용할 옵션
  const commonQueryOptions = {
    // 다음 페이지 파라미터를 결정하는 함수
    getNextPageParam: (lastPage: PostResponse) => {
      if (lastPage.data.lastId === -1) return undefined; // lastId가 -1이면 마지막 페이지
      return lastPage.data.lastId; // 다음 배열의 lastId 반환
    },
    initialPageParam: '0', // 초기 페이지 파라미터
  };

  // 각 탭별 무한스크롤 쿼리 설정
  const queries = {
    추천: useCustomInfiniteQuery(['recommendPosts'], ({ pageParam = '0' }) => fetchPosts(pageParam as string), {
      ...commonQueryOptions,
      enabled: activeTab === '추천',
    }),
    팔로잉: useCustomInfiniteQuery(['followingPosts'], ({ pageParam = '0' }) => fetchFollowing(pageParam as string), {
      ...commonQueryOptions,
      enabled: activeTab === '팔로잉',
    }),
    북마크: useCustomInfiniteQuery(['bookmarkPosts'], ({ pageParam = '0' }) => fetchBookmark(pageParam as string), {
      ...commonQueryOptions,
      enabled: activeTab === '북마크',
    }),
    직군: useCustomInfiniteQuery(
      ['preJobPosts', ...preJob],
      ({ pageParam = '0' }) => fetchPreJob(pageParam as string, preJob),
      { ...commonQueryOptions, enabled: activeTab === '직군' && preJob.length > 0 },
    ),
  };
  // 현재 활성화된 쿼리
  const currentQuery = queries[activeTab as keyof typeof queries];

  // 페이지 데이터를 처리하는 유틸 함수
  const processPagesData = (pages?: PostResponse[]) => {
    if (!pages) return []; // 페이지가 없으면 빈 배열
    // 모든 페이지 게시글을 하나의 배열로 합침
    return pages.reduce((acc: PostProps[], page: PostResponse) => {
      if (page.data.posts) {
        return [...acc, ...page.data.posts];
      }
      return acc;
    }, []);
  };
  // 무한 스크롤 처리
  useEffect(() => {
    // inView가 true이고 현재 쿼리의 다음 데이터가 있을 때
    if (inView && currentQuery) {
      const { hasNextPage, isFetchingNextPage, fetchNextPage } = currentQuery;
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }
  }, [inView, currentQuery]);

  // 각 탭별 로딩 상태
  const loadingStates = useMemo(
    () => ({
      추천: queries.추천.isLoading,
      팔로잉: queries.팔로잉.isLoading,
      북마크: queries.북마크.isLoading,
      직군: queries.직군.isLoading,
    }),
    [queries.추천.isLoading, queries.팔로잉.isLoading, queries.북마크.isLoading, queries.직군.isLoading],
  );
  // 현재 활성 탭의 로딩 상태, 기본 값은 추천 탭의 로딩 상태
  const isLoading = loadingStates[activeTab as keyof typeof loadingStates] ?? queries.추천.isLoading;

  // 현재 활성 탭의 다음 데이터 로딩 상태
  const isFetchingNextPage = useMemo(
    () =>
      ({
        추천: queries.추천.isFetchingNextPage,
        팔로잉: queries.팔로잉.isFetchingNextPage,
        북마크: queries.북마크.isFetchingNextPage,
        직군: queries.직군.isFetchingNextPage,
      })[activeTab],
    [
      activeTab,
      queries.추천.isFetchingNextPage,
      queries.팔로잉.isFetchingNextPage,
      queries.북마크.isFetchingNextPage,
      queries.직군.isFetchingNextPage,
    ],
  );

  // 현재 활성 탭의 모든 게시글 데이터
  const currentPosts = useMemo(() => {
    if (!currentQuery?.data?.pages) return [];
    return processPagesData(currentQuery.data.pages);
  }, [currentQuery?.data?.pages]);

  useEffect(() => {
    setPosts(currentPosts);
  }, [currentPosts]);

  const { loveMutation, bookmarkMutation } = useLoveAndBookmark(
    posts,
    setPosts,
    userData?.data.memberId,
    currentQuery?.data?.pages?.[currentQuery.data.pages.length - 1]?.data.lastId?.toString(), // 마지막 페이지의 lastId
  );
  return (
    <div className="flex flex-col gap-6 w-full pt-5">
      {isLoading
        ? Array.from({ length: 5 }).map(() => (
            <div key={v4()} className="w-full h-48 bg-gray-4 rounded-md animate-pulse" />
          ))
        : posts.map((post) => (
            <Post
              key={post.postId}
              postId={post.postId}
              title={post.title}
              nickname={post.nickname || ''}
              memberId={post.memberId || ''}
              isBookmarked={post.isBookmarked}
              onUserClick={() => {
                router.push(`/blog/${post.username}`);
              }}
              onContentClick={() => {
                router.push(`/blog/${post.username}/${post.title}`);
              }}
              thumbnail={null}
              profilePicUrl={post.profilePicUrl === 'null' ? defaultProfilePic.src : post.profilePicUrl} // 여기를 수정
              content={post.content}
              timestamp={formatDate(post.timestamp)}
              userJob={post.userJob || '기타'}
              onBookmarkClick={() => bookmarkMutation.mutate(post.postId)}
              onLoveClick={() => loveMutation.mutate(post.postId)}
              isLoved={post.isLoved}
              lovedCount={post.lovedCount || 0}
            />
          ))}

      {/* 무한 스크롤 트리거용 div */}
      <div ref={ref} className="h-1" />
      {isFetchingNextPage && <div className="w-full h-48 bg-gray-2 rounded-md animate-pulse" />}
    </div>
  );
}
