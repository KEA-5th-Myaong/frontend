'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { PSBoxProps } from '../_types/corp';
import ProgressBar from '../../../../_components/ProgressBar';
import InterviewPSBox from '../_components/interviewPSBox';
import ListVariants from '../_utils/listVariants';
import useCustomQuery from '@/app/_hooks/useCustomQuery';
import { fetchPSList } from '@/app/(route)/(personal-statement)/_services/psServices';

export default function InterviewPersonalStatement() {
  const router = useRouter();
  const params = useParams();

  const { id } = params;
  const selectedCorp = params.corp as string;
  const corp = decodeURI(selectedCorp);

  const { data: psData, isLoading } = useCustomQuery(['ps'], () => fetchPSList());

  const [psList, setPSList] = useState([]); // 자소서 배열

  useEffect(() => {
    if (psData?.data) {
      setPSList(psData.data.slice(0, 5)); // 자소서 목록 로드
    }
  }, [psData]);

  return (
    <section className="interview-container">
      <ProgressBar progress={33} />
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
                <InterviewPSBox
                  title={ps.title}
                  timestamp={ps.timestamp}
                  onClick={() => router.push(`/interview/${id}/${corp}/question`)}
                />
              </motion.div>
            ))}
      </div>
    </section>
  );
}
