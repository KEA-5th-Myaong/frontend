'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Carousel from '../_components/Carousel';
import Post from '@/app/_components/Post';
import { formatDate } from '@/app/_utils/formatDate';
import defaultProfilePic from '../../../../../../public/mascot.png';
import Icons from '@/app/_components/ui/Icon';
import { SearchIcon } from '@/app/_components/ui/iconPath';
import { fetchPostSearch } from '../_services/mainService';
import useCustomInfiniteQuery from '@/app/_hooks/useCustomInfiniteQuery';
import { PostProps, PostResponse } from '../_types/main-page';
import useLoveAndBookmark from '@/app/_hooks/useLoveAndBookmark';

export default function SearchPage() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState<PostProps[]>([]);

  const { data, refetch } = useCustomInfiniteQuery(
    ['search-posts', searchTerm],
    ({ pageParam = '0' }) => fetchPostSearch(pageParam as string, searchTerm),
    {
      // 다음 페이지 파라미터를 결정하는 함수
      getNextPageParam: (lastPage: PostResponse) => {
        if (lastPage.data.lastId === -1) return undefined; // lastId가 -1이면 마지막 페이지
        return lastPage.data.lastId; // 다음 배열의 lastId 반환
      },
      initialPageParam: '0', // 초기 페이지 파라미터
      enabled: !!searchTerm,
    },
  );

  useEffect(() => {
    if (data?.pages) {
      const allPosts = data.pages.flatMap((page) => page.data.posts);
      setPosts(allPosts);
    }
  }, [data]);

  const handleSearch = (e: { key: string }) => {
    if (searchValue === '') return;
    if (e.key === 'Enter') {
      setSearchTerm(searchValue);
      refetch();
    }
  };

  const { loveMutation, bookmarkMutation } = useLoveAndBookmark(
    posts,
    setPosts,
    '1', // memberId
    data?.pages?.[data.pages.length - 1]?.data.lastId?.toString(), // 마지막 페이지의 lastId
  );
  return (
    <section className="flex justify-center pt-14 pb-12">
      <div className="w-full min-w-[360px] max-w-[982px] px-[42px]">
        <Carousel />

        <div className="flex flex-col w-full items-center pt-11">
          <div className="flex items-center w-full max-w-[66%] border border-[#B4B4B4] px-5 py-4 mb-9 rounded-[28px] gap-5">
            <Icons name={SearchIcon} />
            <input
              className="w-full focus:outline-none"
              placeholder="검색어를 입력해주세요"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>
          <div className="flex flex-col gap-5">
            {posts?.map((post) => (
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
                profilePicUrl={post.profilePicUrl === 'null' ? defaultProfilePic.src : post.profilePicUrl} // 여기를 수정
                content={post.content}
                timestamp={formatDate(post.timestamp)}
                userJob={post.userJob || '기타'}
                onBookmarkClick={() => bookmarkMutation.mutate(post.postId)}
                onLoveClick={() => loveMutation.mutate(post.postId)}
                isLoved={post.isLoved}
                lovedCount={post.lovedCount || 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
