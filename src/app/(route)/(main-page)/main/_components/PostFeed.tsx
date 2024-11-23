'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { v4 } from 'uuid';
import { useInView } from 'react-intersection-observer';
import { PostFeedProps, PostProps, PostResponse } from '../_types/main-page';
import { fetchBookmark, fetchFollowing, fetchPosts, fetchPreJob } from '../_services/mainService';
import Post from '@/app/_components/Post';
import { formatDate } from '@/app/_utils/formatDate';
import defaultProfilePic from '../../../../../../public/mascot.png';
import useCustomInfiniteQuery from '@/app/_hooks/useCustomInfiniteQuery';

export default function PostFeed({ activeTab, preJob }: PostFeedProps) {
  const router = useRouter();
  const { ref, inView } = useInView(); // 무한 스크롤을 위한 InterSection Observer 훅

  // 모든 무한 쿼리에 공통적으로 사용할 옵션
  const commonQueryOptions = {
    // 다음 페이지 파라미터를 결정하는 함수
    getNextPageParam: (lastPage: PostResponse) => {
      if (lastPage.data.lastId === -1) return undefined; // lastId가 -1이면 마지막 페이지
      return lastPage.data.lastId; // 다음 배열의 lastId 반환
    },
    initialPageParam: '0', // 초기 페이지 파라미터
  };

  const {
    data: recommendData, // 추천 게시글 데이터
    isLoading: isRecommendLoading, // 초기 로딩 상태
    fetchNextPage: fetchRecommendNextpage, // 다음 페이지 fetch 함수
    hasNextPage: hasRecommendNextPage, // 다음 페이지 존재 여부
    isFetchingNextPage: isFetchingRecommendNextPage, // 다음 페이지 fetch중인지
  } = useCustomInfiniteQuery(['recommendPosts'], ({ pageParam = '0' }) => fetchPosts(pageParam as string), {
    ...commonQueryOptions,
    enabled: activeTab === '추천',
  });

  const {
    data: followingData,
    isLoading: isFollowingLoading,
    fetchNextPage: fetchFollowingNextPage,
    hasNextPage: hasFollowingNextPage,
    isFetchingNextPage: isFetchingFollowingNextPage,
  } = useCustomInfiniteQuery(['followingPosts'], ({ pageParam = '0' }) => fetchFollowing(pageParam as string), {
    ...commonQueryOptions,
    enabled: activeTab === '팔로잉',
  });

  const {
    data: bookmarkData,
    isLoading: isBookmarkLoading,
    fetchNextPage: fetchBookmarkNextPage,
    hasNextPage: hasBookmarkNextPage,
    isFetchingNextPage: isFetchingBookmarkNextPage,
  } = useCustomInfiniteQuery(['bookmarkPosts'], ({ pageParam = '0' }) => fetchBookmark(pageParam as string), {
    ...commonQueryOptions,
    enabled: activeTab === '북마크',
  });

  const {
    data: preJobData,
    isLoading: isPreJobLoading,
    fetchNextPage: fetchPreJobNextPage,
    hasNextPage: hasPreJobNextPage,
    isFetchingNextPage: isFetchingPreJobNextPage,
  } = useCustomInfiniteQuery(
    ['preJobPosts', ...preJob], // preJob 변경 시 쿼리 갱신
    ({ pageParam = '0' }) => fetchPreJob(pageParam as string, preJob),
    { ...commonQueryOptions, enabled: activeTab === '직군' && preJob.length > 0 },
  );

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
    // 관찰 대상이 화면에 보일 때
    if (inView) {
      // eslint-disable-next-line default-case
      switch (activeTab) {
        case '추천':
          if (hasRecommendNextPage && !isFetchingRecommendNextPage) {
            fetchRecommendNextpage(); // 현재 활성 탭에 따라 다음 페이지 로드
          }
          break;
        case '팔로잉':
          if (hasFollowingNextPage && !isFetchingFollowingNextPage) {
            fetchFollowingNextPage();
          }
          break;
        case '북마크':
          if (hasBookmarkNextPage && !isFetchingBookmarkNextPage) {
            fetchBookmarkNextPage();
          }
          break;
        case '직군':
          if (hasPreJobNextPage && !isFetchingPreJobNextPage) {
            fetchPreJobNextPage();
          }
          break;
      }
    }
  }, [
    activeTab,
    inView,
    hasRecommendNextPage,
    isFetchingRecommendNextPage,
    fetchRecommendNextpage,
    hasFollowingNextPage,
    isFetchingFollowingNextPage,
    fetchFollowingNextPage,
    hasBookmarkNextPage,
    isFetchingBookmarkNextPage,
    fetchBookmarkNextPage,
    hasPreJobNextPage,
    isFetchingPreJobNextPage,
    fetchPreJobNextPage,
  ]);
  // 각 탭별 로딩 상태
  const loadingStates = {
    추천: isRecommendLoading,
    팔로잉: isFollowingLoading,
    북마크: isBookmarkLoading,
    직군: isPreJobLoading,
  };
  // 현재 활성 탭의 로딩 상태
  const isLoading = loadingStates[activeTab as keyof typeof loadingStates] ?? isRecommendLoading;
  // 현재 활성 탭의 다음 페이지 로딩 상태
  const isFetchingNextPage = {
    추천: isFetchingRecommendNextPage,
    팔로잉: isFetchingFollowingNextPage,
    북마크: isFetchingBookmarkNextPage,
    직군: isFetchingPreJobNextPage,
  }[activeTab];
  // 현재 활성 탭의 게시글 데이터 결정
  const currentPosts = (() => {
    switch (activeTab) {
      case '추천':
        return processPagesData(recommendData?.pages);
      case '팔로잉':
        return processPagesData(followingData?.pages);
      case '북마크':
        return processPagesData(bookmarkData?.pages);
      case '직군':
        return processPagesData(preJobData?.pages);
      default:
        return [];
    }
  })();
  return (
    <div className="flex flex-col gap-6 w-full pt-5">
      {isLoading
        ? Array.from({ length: 5 }).map(() => (
            <div key={v4()} className="w-full h-48 bg-gray-4 rounded-md animate-pulse" />
          ))
        : currentPosts.map((post) => (
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
              profilePicUrl={post.profilePicUrl || defaultProfilePic.src} // 여기를 수정
              content={post.content}
              timestamp={formatDate(post.timestamp)}
              userJob="프론트엔드 개발자"
              isLoved={false}
              lovedCount={0}
            />
          ))}

      {/* 무한 스크롤 트리거용 div */}
      <div ref={ref} className="h-1" />
      {isFetchingNextPage && <div className="w-full h-48 bg-gray-2 rounded-md animate-pulse" />}
    </div>
  );
}
