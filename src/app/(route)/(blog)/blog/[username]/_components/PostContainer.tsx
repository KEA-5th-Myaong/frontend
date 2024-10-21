'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Post from '../../../../../_components/Post';
import { fetchPost } from '../_services/blogService';
import useCustomQuery from '@/app/_hooks/useCustomQuery';
import { PostProps } from '@/app/(route)/(main-page)/main/_types/main-page';
import formatDate from '@/app/_utils/formatDate';

export default function PostContainer() {
  const router = useRouter();
  const params = useParams();

  // memberId를 문자열로 처리하는 함수
  const getMemberId = (param: string | string[]): string => {
    if (Array.isArray(param)) {
      return param[0]; // 배열인 경우 첫 번째 요소를 사용
    }
    return param;
  };

  const memberId = decodeURI(getMemberId(params.memberId));

  const [lastId, setLastId] = useState('0');

  const { data, isLoading } = useCustomQuery(['post', memberId], () => fetchPost(memberId, lastId));
  console.log(data);
  const [posts, setPosts] = useState<PostProps[]>([]); // 포스트 목록 상태
  useEffect(() => {
    if (data && data.success && data.data && Array.isArray(data.data.posts)) {
      setPosts(data.data.posts);
      setLastId(data.data.lastId);
    }
  }, [data]);

  return (
    <div className="flex flex-col gap-6">
      {isLoading
        ? Array.from({ length: 5 }).map(() => <div className="w-full h-48 bg-gray-4 rounded-md animate-pulse" />)
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
                router.push(`/blog/${post.title}/${post.postId}`);
              }}
              thumbnail={null}
              profilePicUrl={post.profilePicUrl}
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
