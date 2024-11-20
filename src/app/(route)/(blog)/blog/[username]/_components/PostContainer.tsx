'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import Post from '../../../../../_components/Post';
import { fetchPost, putBookmark, putLike } from '../_services/blogService';
import useCustomQuery from '@/app/_hooks/useCustomQuery';
import { PostDetailProps } from '@/app/(route)/(main-page)/main/_types/main-page';
import { formatDate } from '@/app/_utils/formatDate';
import useCustomMutation from '@/app/_hooks/useCustomMutation';

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

  const loveMutation = useCustomMutation(putLike, {
    onSuccess: (_, postId) => {
      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post.postId === postId) {
            return {
              ...post,
              isLoved: !post.isLoved,
              lovedCount: post.isLoved ? post.lovedCount - 1 : post.lovedCount + 1,
            };
          }
          return post;
        }),
      );
    },
  });

  const bookmarkMutation = useCustomMutation(putBookmark, {
    onSuccess: (_, postId) => {
      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post.postId === postId) {
            return {
              ...post,
              isBookmarked: !post.isBookmarked,
            };
          }
          return post;
        }),
      );
      // 북마크 포스트 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['bookmarkPosts', lastId] });
    },
  });

  return (
    <div className="flex flex-col gap-6">
      {isLoading
        ? Array.from({ length: 5 }).map(() => <div className="w-full h-48 bg-gray-200 rounded-md animate-pulse" />)
        : posts.map((post) => (
            <Post
              key={post.postId}
              postId={post.postId}
              title={post.title}
              nickname={post.nickname || ''}
              memberId={post.memberId || ''}
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
              isLoved={false}
              lovedCount={0}
            />
          ))}
    </div>
  );
}
