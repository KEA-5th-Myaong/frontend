'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Post from '../../../_components/Post';
import JobMenu from './_components/JobMenu';
// import InterestedJob from './_components/InterestedJob';
import useCustomQuery from '@/app/_hooks/useCustomQuery';
import { fetchBookmark, fetchFollowing, fetchPosts, fetchPreJob } from './_services/mainService';
import { PostProps } from './_types/main-page';
import formatDate from '@/app/_utils/formatDate';
import defaultProfilePic from '../../../../../public/mascot.png';
import Carousel from './_components/Carousel';
import MainTabMenu from './_components/MainTabMenu';

export default function MainPage() {
  const router = useRouter();
  const [lastId, setLastId] = useState('0'); // 마지막 포스트의 ID, 무한스크롤 구현에 사용

  const [posts, setPosts] = useState<PostProps[]>([]); // 포스트 목록 상태
  const [activeTab, setActiveTab] = useState('추천'); // 활성화된 탭
  // const [showInterestedJob, setShowInterestedJob] = useState(true); // 첫 로그인 시 관심 직군 모달 보여주기
  const [preJob, setPreJob] = useState<string[]>([]); // 선호 직업을 저장할 상태
  const [selectedJob, setSelectedJob] = useState<string | null>(null); // 선택한 직업

  const { data: recommendData, isLoading: isRecommendLoading } = useCustomQuery(['recommendPosts', lastId], () =>
    fetchPosts(lastId),
  );
  const { data: followingData, isLoading: isFollowingLoading } = useCustomQuery(['followingPosts', lastId], () =>
    fetchFollowing(lastId),
  );
  const { data: bookmarkData, isLoading: isBookmarkLoading } = useCustomQuery(['bookmarkPosts', lastId], () =>
    fetchBookmark(lastId),
  );
  const { data: preJobData, isLoading: isPreJobLoading } = useCustomQuery(['preJobPosts', lastId, preJob], () =>
    fetchPreJob(lastId, preJob),
  );

  useEffect(() => {
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
      setLastId(currentData.data.lastId);
    }
  }, [activeTab, recommendData, followingData, preJobData, bookmarkData]);

  const handleJobSelect = (jobId: string) => {
    setSelectedJob(jobId);
    setPreJob([jobId]);
    setActiveTab('직군');
    setLastId('10');
    setPosts([]);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setLastId('10');
    setPosts([]);
  };

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

  // const handleInterestedJobClose = () => {
  //   setShowInterestedJob(false);
  // };

  console.log(posts);
  return (
    <>
      <section className="flex justify-center pt-14 pb-12">
        <div className="w-full min-w-[360px] max-w-[982px] px-[42px]">
          <Carousel />

          <div className="flex flex-col md:flex-row w-full gap-[14px]">
            {/* 직군 메뉴 */}
            <JobMenu className="hidden md:flex" onJobSelect={handleJobSelect} selectedJob={selectedJob} />

            <div className="flex flex-col items-center w-full pt-4 md:pt-5">
              {/* 추천 팔로잉 가로 북마크 */}
              <MainTabMenu activeTab={activeTab} onTabChange={handleTabChange} />

              {/* 직군 메뉴 */}
              <JobMenu className="flex md:hidden" onJobSelect={handleJobSelect} selectedJob={selectedJob} />
              {/* 피드 */}
              <div className="flex flex-col gap-6 w-full pt-5">
                {isLoading
                  ? Array.from({ length: 5 }).map(() => (
                      <div className="w-full h-48 bg-gray-4 rounded-md animate-pulse" />
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
                          router.push(`/blog/${post.nickname}`);
                        }}
                        onContentClick={() => {
                          router.push(`/blog/${post.title}/${post.postId}`);
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
            </div>
          </div>
        </div>
      </section>
      {/* {showInterestedJob && <InterestedJob onClose={handleInterestedJobClose} />} */}
    </>
  );
}
