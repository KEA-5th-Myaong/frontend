'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useQueryClient } from '@tanstack/react-query';
import { PSBoxProps } from '../_types/corp';
import InterviewPSBox from '../_components/interviewPSBox';
import ListVariants from '../_utils/listVariants';
import useCustomQuery from '@/app/_hooks/useCustomQuery';
import { fetchPSList } from '@/app/(route)/(personal-statement)/_services/psServices';
import { useCompanyIdStore, useInterviewIdStore } from '@/app/(route)/(interview)/_store/interviewStore';
import TutorialBox from '../_components/TutorialBox';
import { postInterview } from '@/app/(route)/(interview)/_services/interviewService';

export default function InterviewPersonalStatement() {
  const router = useRouter();
  const params = useParams();
  const { username } = params;
  const selectedCorp = params.corp as string;
  const corp = decodeURI(selectedCorp); // 기업명은 url에서 가져옴

  // 자소서 목록 가져오기와, 쿼리 무효화 함수
  const { data: psData, isLoading } = useCustomQuery(['ps'], () => fetchPSList());
  const queryClient = useQueryClient();

  const companyId = useCompanyIdStore((state) => state.companyId); // 기업 id
  const { setInterviewId } = useInterviewIdStore(); // 인터뷰 id store에 저장

  const [psList, setPSList] = useState([]); // 자소서 배열
  const [showTutorial, setShowTutorial] = useState(false); // 튜토리얼 보이기

  useEffect(() => {
    if (psData?.data && Array.isArray(psData.data)) {
      setPSList(psData.data.slice(0, 5)); // 자소서 목록 로드
    }
  }, [psData]);

  // post에 전송할 데이터, content는 나중에 실제 질문으로 대체
  const interviewData = {
    sender: 'interviewer',
    content: '첫 번째 질문',
    companyId,
  };

  // 튜토리얼 끝나고 시작하기 버튼을 눌렀을 때
  const handleTutorialBtnClick = async () => {
    const data = await postInterview(interviewData);
    const interviewId = data?.data.interviewId;
    setInterviewId(interviewId); // store에 저장하는 인터뷰 id

    // 상태 업데이트가 반영될 때까지 기다림
    await new Promise((resolve) => {
      setTimeout(resolve, 0);
    });
    // 면접 기록 쿼리 무효화(왼쪽에 바로 업데이트 됨)
    await queryClient.invalidateQueries({
      queryKey: ['interview-history', username],
    });

    router.push(`/interview/${username}/${corp}/chat`);
  };

  return (
    <section className="interview-container">
      <p className="font-semibold self-start">모의 면접</p>

      <div className="flex flex-col self-stretch pt-2 w-full">
        <p className="text-sm">선택 기업</p>

        <div className="flex gap-3 pt-3 whitespace-nowrap">
          <motion.div className="w-full max-w-64 py-4 px-5 bg-gray-4 font-bold rounded-[28px]">{corp}</motion.div>
          <motion.button
            type="button"
            layoutId="select"
            onClick={() => router.back()}
            className="py-4 px-6 rounded-[28px] primary-1-btn"
          >
            다시 선택
          </motion.button>
        </div>

        <p className="font-semibold pt-8 pb-4">자기소개서 선택</p>
        <p className="text-sm pb-4">면접을 위해 제출할 자기소개서를 선택하세요</p>
      </div>

      <div className="flex flex-col self-stretch gap-5 w-full pb-12">
        {isLoading
          ? Array.from({ length: 5 }).map(() => <div className="w-full h-32 bg-gray-200 rounded-md animate-pulse" />)
          : psList?.map((ps: PSBoxProps, index) => (
              <motion.div key={ps.psId} variants={ListVariants} custom={index} initial="hidden" animate="visible">
                <InterviewPSBox title={ps.title} timestamp={ps.timestamp} onClick={() => setShowTutorial(true)} />
              </motion.div>
            ))}
      </div>

      {showTutorial && <TutorialBox onBtnClick={handleTutorialBtnClick} />}
    </section>
  );
}
