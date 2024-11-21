'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import Post from '../../../../../_components/Post';
import { fetchPost, putBookmark, putLike } from '../_services/blogService';
import useCustomQuery from '@/app/_hooks/useCustomQuery';
import { PostDetailProps } from '@/app/(route)/(main-page)/main/_types/main-page';
import { formatDate } from '@/app/_utils/formatDate';
import useCustomMutation from '@/app/_hooks/useCustomMutation';

type MutationContext = {
  previousPosts: PostDetailProps[];
};

export default function PostContainer() {
  const router = useRouter();

  const memberId = '1'; // 멤버아이디 나중에 전역변수에서 가져옴
  const [lastId, setLastId] = useState('0');
  const queryClient = useQueryClient();

  const { data, isLoading } = useCustomQuery(['post', memberId], () => fetchPost(memberId, lastId));

  const [posts, setPosts] = useState<PostDetailProps[]>([]); // 포스트 목록 상태
  useEffect(() => {
    if (data && data.success && data.data && Array.isArray(data.data.posts)) {
      setPosts(data.data.posts);
      setLastId(data.data.lastId);
    }
  }, [data]);

  const loveMutation = useCustomMutation<unknown, number>(putLike, {
    // mutation 실행 전에 실행되는 onMutate
    onMutate: async (postId) => {
      // 진행중인 post 쿼리를 취소하여 충돌 방지
      await queryClient.cancelQueries({ queryKey: ['post', memberId] });
      const previousPosts = [...posts]; // 롤백을 위한 현재 posts 상태 저장
      // 낙관적 업데이트, UI 즉시 업데이트
      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post.postId === postId) {
            return {
              ...post,
              isLoved: !post.isLoved, // 좋아요 상태 토글
              lovedCount: post.isLoved ? post.lovedCount - 1 : post.lovedCount + 1,
            };
          }
          return post;
        }),
      );

      return { previousPosts } as MutationContext; // 이전 상태를 context로 반환하여 오류 발생 시 복구
    },
    onError: (_, __, context) => {
      if ((context as MutationContext)?.previousPosts) {
        setPosts((context as MutationContext).previousPosts);
      }
    },
    // mutationd 완료 후 실행되는 함수
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', memberId] });
    },
  });

  const bookmarkMutation = useCustomMutation<unknown, number>(putBookmark, {
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ['bookmarkPosts', lastId] });
      const previousPosts = [...posts];

      setPosts((prev) =>
        prev.map((post) => {
          if (post.postId === postId) {
            return {
              ...post,
              isBookmarked: !post.isBookmarked,
            };
          }
          return post;
        }),
      );

      return { previousPosts } as MutationContext;
    },
    onError: (_, __, context) => {
      if ((context as MutationContext)?.previousPosts) {
        setPosts((context as MutationContext).previousPosts);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarkPosts', lastId] });
      queryClient.invalidateQueries({ queryKey: ['post', memberId] });
    },
  });
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
                router.push(`/blog/${post.username}/${post.postId}`);
              }}
              thumbnail={null}
              profilePicUrl={post.profilePicUrl}
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
    </div>
  );
}
