'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { useInView } from 'react-intersection-observer';
import Post from '../../../../../_components/Post';
import { fetchPost, fetchProfile } from '../_services/blogService';
import useCustomQuery from '@/app/_hooks/useCustomQuery';
import { PostProps, PostResponse } from '@/app/(route)/(main-page)/main/_types/main-page';
import { formatDate } from '@/app/_utils/formatDate';
import useLoveAndBookmark from '@/app/_hooks/useLoveAndBookmark';
import defaultProfilePic from '../../../../../../../public/mascot.png';
import useCustomInfiniteQuery from '@/app/_hooks/useCustomInfiniteQuery';
import useMe from '@/app/_hooks/useMe';

export default function PostContainer() {
  const router = useRouter();
  const { ref, inView } = useInView(); // 무한 스크롤을 위한 InterSection Observer 훅
  const params = useParams();
  const { username } = params;
  const { data: memberData } = useCustomQuery(['user-profile', username], () => fetchProfile(username as string));

  const memberId = memberData?.memberId; // 다른 사람
  const { data: userData } = useMe();
  const [isMe, setIsMe] = useState(false);
  useEffect(() => {
    if (userData?.data.username === username) {
      setIsMe(true);
    }
  }, [isMe, userData?.data.username, username]);

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useCustomInfiniteQuery(
    ['post', memberId],
    ({ pageParam = '0' }) => fetchPost(memberId, pageParam as string),
    {
      getNextPageParam: (lastPage: PostResponse) => {
        if (lastPage.data.lastId === -1) return undefined;
        return lastPage.data.lastId;
      },
      initialPageParam: '0',
    },
  );

  const [posts, setPosts] = useState<PostProps[]>([]); // 포스트 목록 상태
  // 무한스크롤된 데이터 관리
  useEffect(() => {
    if (data?.pages) {
      const allPosts = data.pages.flatMap((page) => page.data.posts);
      setPosts(allPosts);
    }
    // 컴포넌트가 언마운트되거나 리렌더링되기 전에 실행되는 정리 작업을 수행, 메모리 누수를 방지하고 불필요한 상태 업데이트를 막음
    return () => setPosts([]);
  }, [data]);
  // InView 효과
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const { loveMutation, bookmarkMutation } = useLoveAndBookmark(
    posts,
    setPosts,
    memberId,
    data?.pageParams?.[data.pageParams.length - 1]?.toString(),
  );
  return (
    <div className="flex flex-col gap-6">
      {isLoading
        ? Array.from({ length: 5 }).map(() => (
            <div key={`skeleton-${uuidv4()}`} className="w-full h-48 bg-gray-200 rounded-md animate-pulse" />
          ))
        : posts.map((post) => (
            <Post
              key={post.postId}
              postId={post.postId}
              title={post.title}
              nickname={post.nickname ?? ''}
              memberId={post.memberId ?? ''}
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
              userJob="프론트엔드 개발자"
              onBookmarkClick={() => bookmarkMutation.mutate(post.postId)}
              isBookmarked={post.isBookmarked}
              onLoveClick={() => loveMutation.mutate(post.postId)}
              isLoved={post.isLoved}
              lovedCount={post.lovedCount || 0}
            />
          ))}

      <div ref={ref} className="h-1" />
      {isLoading && <div className="w-full h-48 bg-gray-2 rounded-md animate-pulse" />}
    </div>
  );
}
