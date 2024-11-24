'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import Post from '../../../../../_components/Post';
import { fetchPost, fetchProfile } from '../_services/blogService';
import useCustomQuery from '@/app/_hooks/useCustomQuery';
import { PostProps } from '@/app/(route)/(main-page)/main/_types/main-page';
import { formatDate } from '@/app/_utils/formatDate';
import useLoveAndBookmark from '@/app/_hooks/useLoveAndBookmark';

export default function PostContainer() {
  const router = useRouter();
  const params = useParams();
  const { username } = params;
  const { data: memberData } = useCustomQuery(['member', username], () => fetchProfile(username as string));

  const memberId = memberData?.memberId;
  const [lastId, setLastId] = useState('0');

  const { data, isLoading } = useCustomQuery(['post', memberId], () => fetchPost(memberId, lastId));

  const [posts, setPosts] = useState<PostProps[]>([]); // 포스트 목록 상태
  useEffect(() => {
    if (data && data.success && data.data && Array.isArray(data.data.posts)) {
      setPosts(data.data.posts);
      setLastId(data.data.lastId);
    }
  }, [data]);

  const { loveMutation, bookmarkMutation } = useLoveAndBookmark(posts, setPosts, memberId, lastId);
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
