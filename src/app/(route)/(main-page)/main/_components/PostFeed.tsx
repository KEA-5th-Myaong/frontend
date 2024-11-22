'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 } from 'uuid';
import { useInView } from 'react-intersection-observer';
import { PostProps } from '../_types/main-page';
import { fetchBookmark, fetchFollowing, fetchPosts, fetchPreJob } from '../_services/mainService';
import useCustomQuery from '@/app/_hooks/useCustomQuery';
import Post from '@/app/_components/Post';
import { formatDate } from '@/app/_utils/formatDate';
import defaultProfilePic from '../../../../../../public/mascot.png';
import useCustomInfiniteQuery from '@/app/_hooks/useCustomInfiniteQuery';

interface PostFeedProps {
  activeTab: string;
  preJob: string[];
}

export default function PostFeed({ activeTab, preJob }: PostFeedProps) {
  const router = useRouter();
  const [posts, setPosts] = useState<PostProps[]>([]); // 포스트 목록 상태
  const { ref, inView } = useInView();

  const [lastId, setLastId] = useState('0'); // 포스트의 마지막 아이디(나중에 무한스크롤 구현에 사용)

  const {
    data: recommendData,
    isLoading: isRecommendLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCustomInfiniteQuery(['recommendPosts', lastId], ({ pageParam = '0' }) => fetchPosts(pageParam as string), {
    enabled: activeTab === '추천',
    getNextPageParam: (lastPage) => {
      if (lastPage.data.lastId === -1) return undefined;
      return lastPage.data.lastId;
    },
  });

  const { data: followingData, isLoading: isFollowingLoading } = useCustomQuery(
    ['followingPosts', lastId],
    () => fetchFollowing(lastId),
    { enabled: activeTab === '팔로잉' },
  );

  const { data: bookmarkData, isLoading: isBookmarkLoading } = useCustomQuery(
    ['bookmarkPosts', lastId],
    () => fetchBookmark(lastId),
    { enabled: activeTab === '북마크' },
  );

  const { data: preJobData, isLoading: isPreJobLoading } = useCustomQuery(
    ['preJobPosts', lastId, preJob],
    () => fetchPreJob(lastId, preJob),
    { enabled: activeTab === '직군' && preJob.length > 0 },
  );

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }

    let currentPosts: PostProps[] = [];

    if (activeTab === '추천' && recommendData) {
      // infinite query의 pages 데이터 처리
      currentPosts = recommendData.pages.reduce((acc: PostProps[], page) => {
        if (page.data.posts) {
          return [...acc, ...page.data.posts];
        }
        return acc;
      }, []);
    } else {
      // 일반 query 데이터 처리
      // eslint-disable-next-line default-case
      switch (activeTab) {
        case '팔로잉':
          if (followingData?.success && followingData.data?.posts) {
            currentPosts = followingData.data.posts;
          }
          break;
        case '북마크':
          if (bookmarkData?.success && bookmarkData.data?.posts) {
            currentPosts = bookmarkData.data.posts;
          }
          break;
        case '직군':
          if (preJobData?.success && preJobData.data?.posts) {
            currentPosts = preJobData.data.posts;
          }
          break;
      }
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

  const isLoading = (() => {
    switch (activeTab) {
      case '추천':
        return isRecommendLoading;
      case '팔로잉':
        return isFollowingLoading;
      case '북마크':
        return isBookmarkLoading;
      case '직군':
        return isPreJobLoading;
      default:
        return isRecommendLoading;
    }
  })();

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
