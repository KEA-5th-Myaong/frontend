'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { useInView } from 'react-intersection-observer';
import Post from '../../../../../_components/Post';
import { fetchMemberInfo, fetchPost, fetchProfile } from '../_services/blogService';
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
  const { data: userNameData } = useCustomQuery(['user-profile', username], () => fetchProfile(username as string));
  const memberId = userNameData?.data?.memberId; // 다른 사람

  // memberId써서 더 상세한 정보 가져옴
  const { data: blogUserNameData, isLoading: isblogUserNameDataLoading } = useCustomQuery(['blog-user', username], () =>
    fetchMemberInfo(memberId),
  );

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

  const { bookmarkMutation } = useLoveAndBookmark(
    posts,
    setPosts,
    memberId,
    data?.pageParams?.[data.pageParams.length - 1]?.toString(),
  );
  return (
    <div className="flex flex-col gap-6">
      {isblogUserNameDataLoading ? (
        Array.from({ length: 5 }).map(() => (
          <div
            key={`skeleton-${uuidv4()}`}
            className="w-full h-48 bg-gray-200 dark:bg-black-3 rounded-md animate-pulse"
          />
        ))
      ) : posts.length === 0 ? (
        <div className="flex-center flex-col bg-[#FBFBFB] dark:bg-black-1 p-10 border border-gray-2 rounded-lg">
          <p className="text-xl mb-4 text-gray-600 dark:text-gray-300">
            {isMe ? '아직 작성된 글이 없습니다.' : `${blogUserNameData?.data.nickname}님이 작성한 글이 없습니다.`}
          </p>
          {isMe && (
            <button
              type="button"
              onClick={() => router.push(`/blog/${blogUserNameData?.data.username}/write`)}
              className="px-6 py-3 bg-primary-1 text-white-0 font-semibold rounded-lg hover:bg-primary-2 "
            >
              첫 글 작성하기
            </button>
          )}
        </div>
      ) : (
        posts.map((post) => (
          <Post
            key={post.postId}
            postId={post.postId}
            title={post.title}
            nickname={blogUserNameData?.data.nickname}
            memberId={memberId}
            onUserClick={() => {
              router.push(`/blog/${blogUserNameData?.data.username}`);
            }}
            onContentClick={() => {
              router.push(`/blog/${blogUserNameData?.data.username}/${post.title}`);
            }}
            thumbnail={null}
            profilePicUrl={post.profilePicUrl === null ? defaultProfilePic.src : blogUserNameData?.data.profilePicUrl}
            content={post.content}
            timestamp={formatDate(post.timestamp)}
            prejob={blogUserNameData?.data.prejob?.[0]}
            onBookmarkClick={() => bookmarkMutation.mutate(post.postId)}
            isBookmarked={post.isBookmarked}
            isLiked={post.isLiked}
            likeCount={post.likeCount}
          />
        ))
      )}

      <div ref={ref} className="h-1" />
      {isLoading && <div className="w-full h-48 bg-gray-2 dark:bg-black-3 rounded-md animate-pulse" />}
    </div>
  );
}
