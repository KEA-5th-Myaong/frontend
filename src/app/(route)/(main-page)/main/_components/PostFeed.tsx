'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 } from 'uuid';
import { useInView } from 'react-intersection-observer';
import { PostProps } from '../_types/main-page';
import { fetchBookmark, fetchFollowing, fetchPosts, fetchPreJob } from '../_services/mainService';
import Post from '@/app/_components/Post';
import { formatDate } from '@/app/_utils/formatDate';
import defaultProfilePic from '../../../../../../public/mascot.png';
import useCustomInfiniteQuery from '@/app/_hooks/useCustomInfiniteQuery';

interface PostFeedProps {
  activeTab: string;
  preJob: string[];
}

interface PostResponse {
  pages: PostResponse[] | undefined;
  data: {
    posts: PostProps[];
    lastId: number;
  };
}

export default function PostFeed({ activeTab, preJob }: PostFeedProps) {
  const router = useRouter();
  const [posts, setPosts] = useState<PostProps[]>([]); // 포스트 목록 상태
  const { ref, inView } = useInView();

  const commonQueryOptions = {
    getNextPageParam: (lastPage: PostResponse) => {
      if (lastPage.data.lastId === -1) return undefined;
      return lastPage.data.lastId;
    },
    initialPageParam: '0',
  };

  const {
    data: recommendData,
    isLoading: isRecommendLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCustomInfiniteQuery(['recommendPosts'], ({ pageParam = '0' }) => fetchPosts(pageParam as string), {
    ...commonQueryOptions,
    enabled: activeTab === '추천',
  });

  const { data: followingData, isLoading: isFollowingLoading } = useCustomInfiniteQuery(
    ['followingPosts'],
    ({ pageParam = '0' }) => fetchFollowing(pageParam as string),
    { ...commonQueryOptions, enabled: activeTab === '팔로잉' },
  );

  const { data: bookmarkData, isLoading: isBookmarkLoading } = useCustomInfiniteQuery(
    ['bookmarkPosts'],
    ({ pageParam = '0' }) => fetchBookmark(pageParam as string),
    { ...commonQueryOptions, enabled: activeTab === '북마크' },
  );

  const { data: preJobData, isLoading: isPreJobLoading } = useCustomInfiniteQuery(
    ['preJobPosts', ...preJob],
    ({ pageParam = '0' }) => fetchPreJob(pageParam as string, preJob),
    { ...commonQueryOptions, enabled: activeTab === '직군' && preJob.length > 0 },
  );

  const processPagesData = (pages?: PostResponse[]) => {
    if (!pages) return [];
    return pages.reduce((acc: PostProps[], page: PostResponse) => {
      if (page.data.posts) {
        return [...acc, ...page.data.posts];
      }
      return acc;
    }, []);
  };

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }

    let currentPosts: PostProps[] = [];

    // eslint-disable-next-line default-case
    switch (activeTab) {
      case '추천':
        currentPosts = processPagesData(recommendData?.pages);
        break;
      case '팔로잉':
        currentPosts = processPagesData(followingData?.pages);
        break;
      case '북마크':
        currentPosts = processPagesData(bookmarkData?.pages);
        break;
      case '직군':
        currentPosts = processPagesData(preJobData?.pages);
        break;
    }

    setPosts(currentPosts);
  }, [
    activeTab,
    recommendData,
    followingData,
    preJobData,
    bookmarkData,
    inView,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  ]);

  const loadingStates = {
    추천: isRecommendLoading,
    팔로잉: isFollowingLoading,
    북마크: isBookmarkLoading,
    직군: isPreJobLoading,
  };

  const isLoading = loadingStates[activeTab as keyof typeof loadingStates] ?? isRecommendLoading;

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
      {isFetchingNextPage && <div className="w-full h-48 bg-gray-200 rounded-md animate-pulse" />}
    </div>
  );
}
