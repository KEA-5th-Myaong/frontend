'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 } from 'uuid';
import { PostProps } from '../_types/main-page';
import { fetchBookmark, fetchFollowing, fetchPosts, fetchPreJob } from '../_services/mainService';
import useCustomQuery from '@/app/_hooks/useCustomQuery';
import Post from '@/app/_components/Post';
import { formatDate } from '@/app/_utils/formatDate';
import defaultProfilePic from '../../../../../../public/mascot.png';

interface PostFeedProps {
  activeTab: string;
  preJob: string[];
}

export default function PostFeed({ activeTab, preJob }: PostFeedProps) {
  const router = useRouter();
  const [posts, setPosts] = useState<PostProps[]>([]); // 포스트 목록 상태

  const [lastId, setLastId] = useState('1'); // 포스트의 마지막 아이디(나중에 무한스크롤 구현에 사용)

  const { data: recommendData, isLoading: isRecommendLoading } = useCustomQuery(
    ['recommendPosts', lastId], // 키 값, 캐싱을 위해 사용
    () => fetchPosts(lastId), // 콜백 함수
    { enabled: activeTab === '추천' }, // 해당 탭이 활성화 됐을 때에만 쿼리 실행
  );

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
    // 나중에 무한 스크롤 구현할 때 수정
    const handleLastIdChange = (newLastId: string) => {
      setLastId(newLastId);
    };

    let currentData;
    switch (activeTab) {
      case '추천':
        currentData = recommendData;
        break;
      case '팔로잉':
        currentData = followingData;
        break;
      case '북마크':
        currentData = bookmarkData;
        break;
      case '직군':
        currentData = preJobData;
        break;
      default:
        currentData = recommendData;
    }

    if (currentData && currentData.success && currentData.data && Array.isArray(currentData.data.posts)) {
      setPosts(currentData.data.posts);
      handleLastIdChange(currentData.data.lastId);
    }
  }, [activeTab, recommendData, followingData, preJobData, bookmarkData]);

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
                router.push(`/blog/${post.username}/${post.postId}`);
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
    </div>
  );
}
