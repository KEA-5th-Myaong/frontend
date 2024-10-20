'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import Overlay from '../../../../_components/Overlay';
import { modalMotion } from '../../../../_components/Modal';
import jobData from '../../../(my-page)/my-page/change-profile/_components/jobTest.json';
import Icons from '@/app/_components/ui/Icon';
import { ArrowIcon } from '@/app/_components/ui/iconPath';
import { postPreJobs } from '../_services/mainService';

interface InterestedJobProps {
  onClose: () => void;
}

interface Job {
  jobId: number;
  jobName: string;
}

interface Category {
  categoryName: string;
  jobs: Job[];
}

interface CategoryData extends Array<Category> {}

export default function InterestedJob({ onClose }: InterestedJobProps) {
  const { handleSubmit } = useForm({});

  const [selectJobCategory, setSelectJobCategory] = useState<string>('직군 전체');
  const [preJob, setPreJob] = useState<number[]>([]);

  const categoryData: CategoryData = jobData;

  const allJobs = useMemo(() => categoryData.flatMap((category) => category.jobs), [categoryData]); // 모든 직업을 하나의 배열로 합침(직군 전체), flat이 평탄화 하는 용도

  // 현재 선택된 카테고리에 따라 표시할 직업 목록을 계산
  const jobs = useMemo(() => {
    if (selectJobCategory === '직군 전체') {
      return allJobs;
    }
    const category = categoryData.find((c) => c.categoryName === selectJobCategory);
    return category ? category.jobs : []; // 선택 카테고리에 해당하는 직업 반환
  }, [selectJobCategory, allJobs, categoryData]);

  // 직업 선택 시 호출되는 콜백 함수, useCallback으로 함수를 메모이제이션
  const handleJobSelect = useCallback((jobId: number) => {
    setPreJob((prev) => {
      // 만약 선택된 직업이 이미 preJob 배열에 있다면
      if (prev.includes(jobId)) {
        return prev.filter((id) => id !== jobId); // 해당 직업을 배열에서 제거
      }
      // 만약 현재 선택된 직업의 수가 5개 미만이라면
      if (prev.length < 5) {
        return [...prev, jobId]; // 새로 선택된 직업을 배열에 추가
      }
      return prev;
    });
  }, []);

  const onSubmit = async () => {
    await postPreJobs({ preJob });
    onClose();
  };
  return (
    <Overlay onClick={onClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()} // 클릭 이벤트가 Overlay까지 전달되지 않도록
        {...modalMotion}
        className="flex-center flex-col m-4 min-w-[360px] max-w-[891px] w-full 
        py-6 px-4 sm:px-16 md:px-32 gap-3 rounded-2xl bg-white-0 shadow-md"
      >
        <Image width={204} height={193} src="/mascot.png" alt="마스코트" />
        <div className="flex items-center flex-col gap-1 pre-xl-semibold md:pre-2xl-semibold">
          <p>서비스 이용 전 물어볼 것이 있어요!</p>
          <p>관심 직군을 선택해주세요</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
          <div className="flex justify-center w-full max-h-64 py-2">
            {/* 직군 카테고리 */}
            <div className="flex flex-col w-full max-w-60 overflow-scroll hide-scrollbar">
              {/* 주어진 직업 객체의 열거 가능한 속성 이름들(카테고리)을 배열로 반환 */}
              <button
                type="button"
                onClick={() => setSelectJobCategory('직군 전체')}
                className={`flex justify-between items-center w-full py-2 px-3 rounded-[10px] font-medium whitespace-nowrap ${
                  selectJobCategory === '직군 전체' ? 'bg-primary-0' : 'text-gray-0'
                }`}
              >
                <p className="w-full text-center">전체</p>
                <Icons className="bg-white-0 border rounded-full rotate-180" name={ArrowIcon} />
              </button>
              {categoryData.map((category) => (
                <button
                  key={category.categoryName}
                  type="button"
                  onClick={() => setSelectJobCategory(category.categoryName)}
                  className={`flex justify-between items-center w-full py-2 px-3 rounded-[10px] font-medium whitespace-nowrap ${
                    selectJobCategory === category.categoryName ? 'bg-primary-0' : 'text-gray-0'
                  }`}
                >
                  <p className="w-full text-center">{category.categoryName}</p>
                  <Icons className="bg-white-0 border rounded-full rotate-180" name={ArrowIcon} />
                </button>
              ))}
            </div>
            {/* 중앙선 */}
            <div className="w-[1px] h-full bg-gray-5 mx-3 sm:mx-6 md:mx-8" />
            {/* 직군 상세 */}
            <div className="flex items-center flex-col w-full max-w-52 pr-0 sm:pr-4 overflow-scroll hide-scrollbar">
              {jobs.map((job) => (
                <button
                  type="button"
                  onClick={() => handleJobSelect(job.jobId)}
                  key={job.jobId}
                  className="flex justify-between w-full py-1"
                >
                  <p
                    className={`w-full text-center font-medium text-sm md:text-base 
                      line-clamp-2 ${preJob.includes(job.jobId) ? '' : 'text-gray-0'}`}
                  >
                    {job.jobName}
                  </p>

                  {preJob.includes(job.jobId) ? (
                    <div className="flex-shrink-0 flex-center w-5 h-5 border-2 ml-2 border-primary-1 rounded-full">
                      <div className="w-[10px] h-[10px] min-w-[10px] max-h-[10px] bg-primary-1 rounded-full" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 min-w-5 max-h-5 border-2 ml-2 border-primary-1 rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6 w-full mt-10">
            <button type="button" onClick={onClose} className="w-full bg-gray-1 primary-1-btn py-3 md:py-5">
              나중에
            </button>
            <button type="submit" className="w-full  primary-1-btn py-3 md:py-5">
              저장
            </button>
          </div>
        </form>
      </motion.div>
    </Overlay>
  );
}
