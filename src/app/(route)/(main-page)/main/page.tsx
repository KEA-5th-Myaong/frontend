'use client';

import { useCallback, useEffect, useState } from 'react';
import JobMenu from './_components/JobMenu';
import InterestedJob from './_components/InterestedJob';
import MainTabMenu from './_components/MainTabMenu';
import PostFeed from './_components/PostFeed';
import { fetchPreJobs } from './_services/mainService';
import useCustomQuery from '@/app/_hooks/useCustomQuery';
import { fetchMe } from '@/app/_services/membersService';

export default function MainPage() {
  const [activeTab, setActiveTab] = useState('추천'); // 활성화된 탭
  const [showInterestedJob, setShowInterestedJob] = useState(true); // 첫 로그인 시 관심 직군 모달 보여주기
  const [selectedJob, setSelectedJob] = useState<string | null>(null); // 선택한 직업

  const [preJob, setPreJob] = useState<string[]>([]); // 선호 직업을 저장할 상태
  const { data } = useCustomQuery(['pre-job'], () => fetchPreJobs());
  const { data: meData } = useCustomQuery(['me'], () => fetchMe());
  console.log(meData);

  // preJob에 직군 목록 저장
  useEffect(() => {
    if (data?.data) {
      const jobIds = data.data.map((job: { jobId: { toString: () => string } }) => job.jobId.toString());
      setPreJob(jobIds);
    }
  }, [data]);
  // preJob이 변경될 때 모달 표시 여부 결정
  useEffect(() => {
    if (preJob.length === 0) {
      setShowInterestedJob(false);
    }
  }, [preJob.length]);

  // 특정 직군 포스트 불러오기
  const handleJobSelect = useCallback((jobId: string) => {
    setSelectedJob(jobId);
    setPreJob([jobId]);
    setActiveTab('직군');
  }, []);

  // 탭 바꾸기
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);

    if (tab !== '직군') {
      setSelectedJob(null); // 직군 탭이 아닌 경우 선택된 직군 초기화
    }
  };

  const handleInterestedJobClose = () => {
    setShowInterestedJob(false);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row w-full gap-3.5">
        {/* 직군 메뉴 */}
        <JobMenu
          className="hidden md:flex"
          onJobSelect={handleJobSelect}
          selectedJob={selectedJob}
          activeTab={activeTab}
          preJob={data?.data}
        />

        <div className="flex flex-col items-center w-full pt-4 md:pt-5">
          {/* 추천 팔로잉 가로 북마크 */}
          <MainTabMenu activeTab={activeTab} onTabChange={handleTabChange} />

          {/* 직군 메뉴 */}
          <JobMenu
            className="flex md:hidden"
            onJobSelect={handleJobSelect}
            selectedJob={selectedJob}
            activeTab={activeTab}
            preJob={data?.data}
          />

          {/* 피드 */}
          <PostFeed activeTab={activeTab} preJob={preJob} />
        </div>
      </div>

      {showInterestedJob && <InterestedJob onClose={handleInterestedJobClose} />}
    </>
  );
}
