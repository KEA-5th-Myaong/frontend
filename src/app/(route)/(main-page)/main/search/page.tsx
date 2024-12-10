'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 } from 'uuid';
import Post from '@/app/_components/Post';
import { formatDate } from '@/app/_utils/formatDate';
import defaultProfilePic from '../../../../../../public/mascot.png';
import Icons from '@/app/_components/ui/Icon';
import { SearchIcon } from '@/app/_components/ui/iconPath';
import { fetchPostSearch } from '../_services/mainService';
import useCustomInfiniteQuery from '@/app/_hooks/useCustomInfiniteQuery';
import { PostProps, PostResponse } from '../_types/main-page';
import useLoveAndBookmark from '@/app/_hooks/useLoveAndBookmark';
import useMe from '@/app/_hooks/useMe';

export default function SearchPage() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState(''); // searchValue와 searchTerm을 구분해야
  const [searchTerm, setSearchTerm] = useState(''); // onChange가 완료되고 검색 함수 실행 때만 api호출 할 수 있음
  const [posts, setPosts] = useState<PostProps[]>([]); // 포스트 목록
  const { data: userData } = useMe();

  // 검색어 하이라이트 처리
  const highlightText = (text: string | JSX.Element): string | JSX.Element => {
    if (typeof text !== 'string') return text; //  string이 아닐 경우 함수 종료
    if (!searchTerm) return text;

    // 검색어의 특수문자 이스케이프 처리
    const escapedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // 전체 텍스트를 검색어 기준으로 분할, 'gi' 플래그: g(전역 검색), i(대소문자 구분 없음)
    const contexts = text.split(new RegExp(`(${escapedSearchTerm})`, 'gi'));
    // 검색어가 포함되지 않은 경우 원본 텍스트 반환
    if (contexts.length === 1) return text;
    return (
      <>
        {contexts.map((context) =>
          context.toLowerCase() === searchTerm.toLowerCase() ? (
            <span key={v4()} className="text-[#F6C000]">
              {context}
            </span>
          ) : (
            context
          ),
        )}
      </>
    );
  };
  // 무한스크롤 포스트 데이터 가져오기
  const { data, isLoading } = useCustomInfiniteQuery(
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
  // 무한스크롤된 데이터 관리
  useEffect(() => {
    if (data?.pages) {
      const allPosts = data.pages.flatMap((page) => page.data.posts);
      setPosts(allPosts);
    }
    // 컴포넌트가 언마운트되거나 리렌더링되기 전에 실행되는 정리 작업을 수행, 메모리 누수를 방지하고 불필요한 상태 업데이트를 막음
    return () => setPosts([]);
  }, [data]);
  // 검색 함수
  const handleSearch = (e?: { key: string }) => {
    if (searchValue === '') return;
    if (!e || e.key === 'Enter') {
      setSearchTerm(searchValue);
    }
  };

  const { bookmarkMutation } = useLoveAndBookmark(
    posts,
    setPosts,
    userData?.data.memberId,
    data?.pages?.[data.pages.length - 1]?.data.lastId?.toString(), // 마지막 페이지의 lastId
  );
  return (
    <div className="flex flex-col w-full items-center pt-0 md:pt-11">
      <div className="flex items-center w-full sm:max-w-[80%] md:max-w-[66%] border border-[#B4B4B4] px-5 py-4 mb-9 rounded-[28px] gap-5">
        <Icons onClick={() => handleSearch()} name={SearchIcon} className="cursor-pointer" />
        <input
          className="w-full focus:outline-none"
          placeholder="검색어를 입력해주세요"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleSearch}
        />
      </div>
      <div className="flex flex-col gap-5">
        {isLoading
          ? Array.from({ length: 5 }).map(() => (
              <div key={v4()} className="w-full h-48 bg-gray-4 rounded-md animate-pulse" />
            ))
          : posts?.map((post) => (
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
                content={highlightText(post.content)}
                timestamp={formatDate(post.timestamp)}
                prejob={post.prejob[0]}
                onBookmarkClick={() => bookmarkMutation.mutate(post.postId)}
                isLiked={post.isLiked}
                likeCount={post.likeCount}
              />
            ))}
      </div>
    </div>
  );
}
