'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Post from '../../../../../_components/Post';
import testPosts from './test.json';
import { PostProps } from '../_types/blog';

export default function PostContainer() {
  const router = useRouter();

  const [postLists, setPostLists] = useState<PostProps[]>([]);
  useEffect(() => {
    setPostLists(testPosts);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {postLists.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          userName={post.userName}
          userId={post.userId}
          userJob={post.userJob}
          postTitle={post.postTitle}
          postContent={post.postContent}
          postDate={post.postDate}
          isLoved={post.isLoved}
          lovedCount={post.lovedCount.toString()}
          onUserClick={() => {
            router.push(`/blog/${post.userId}`);
          }}
          onContentClick={() => {
            router.push(`/blog/posts/${post.userId}`);
          }}
        />
      ))}
    </div>
  );
}
