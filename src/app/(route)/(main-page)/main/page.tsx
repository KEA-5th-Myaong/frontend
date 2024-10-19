'use client';

import { useState } from 'react';
import JobMenu from './_components/JobMenu';
import InterestedJob from './_components/InterestedJob';
import Carousel from './_components/Carousel';
import MainTabMenu from './_components/MainTabMenu';
import PostFeed from './_components/PostFeed';

export default function MainPage() {
  const [lastId, setLastId] = useState('1'); // 마지막 포스트의 ID, 무한스크롤 구현에 사용

  const [activeTab, setActiveTab] = useState('추천'); // 활성화된 탭
  const [showInterestedJob, setShowInterestedJob] = useState(true); // 첫 로그인 시 관심 직군 모달 보여주기
  const [preJob, setPreJob] = useState<string[]>([]); // 선호 직업을 저장할 상태
  const [selectedJob, setSelectedJob] = useState<string | null>(null); // 선택한 직업

  const handleJobSelect = (jobId: string) => {
    setSelectedJob(jobId);
    setPreJob([jobId]);
    setActiveTab('직군');
  };

  // 탭 바꾸기
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  // 나중에 무한 스크롤 구현할 때 수정
  const handleLastIdChange = (newLastId: string) => {
    setLastId(newLastId);
  };

  const handleInterestedJobClose = () => {
    setShowInterestedJob(false);
  };

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
              <PostFeed activeTab={activeTab} lastId={lastId} preJob={preJob} onLastIdChange={handleLastIdChange} />
            </div>
          </div>
        </div>
      </section>
      {showInterestedJob && <InterestedJob onClose={handleInterestedJobClose} />}
    </>
  );
}
