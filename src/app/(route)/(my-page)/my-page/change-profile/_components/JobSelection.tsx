import { useState, useMemo, useCallback, useEffect } from 'react';
import Icons from '../../../../../_components/ui/Icon';
import { ArrowIcon } from '../../../../../_components/ui/iconPath';
import { fetchAllPreJobs, fetchPreJobs } from '@/app/(route)/(main-page)/main/_services/mainService';
import useCustomQuery from '@/app/_hooks/useCustomQuery';
import { CategoryData, JobProps } from '@/app/(route)/(main-page)/main/_types/main-page';

export default function JobSelection({ onJobsChange }: { onJobsChange: (selectedJobs: number[]) => void }) {
  const { data: jobData } = useCustomQuery(['pre-jobs-list'], () => fetchAllPreJobs());
  const { data: selectedData } = useCustomQuery(['pre-job'], () => fetchPreJobs());

  const categoryData: CategoryData = useMemo(() => {
    return jobData && jobData.success ? jobData.data : [];
  }, [jobData]);

  const [selectJobCategory, setSelectJobCategory] = useState('직군 전체'); // 선택 직업 카테고리
  const [preJob, setPreJob] = useState<number[]>([]);

  useEffect(() => {
    if (selectedData?.success && selectedData.data) {
      const selectedJobs = selectedData.data.map((job: JobProps) => job.jobId);
      setPreJob(selectedJobs);

      // 선택된 직업이 속한 카테고리 찾기
      if (selectedJobs.length > 0 && jobData?.success) {
        const selectedJobId = selectedJobs[0];
        const foundCategory = categoryData.find((category) => category.jobs.some((job) => job.jobId === selectedJobId));

        if (foundCategory) {
          setSelectJobCategory(foundCategory.categoryName);
        }
      }
    }
  }, [selectedData, jobData, categoryData]);

  const allJobs = useMemo(() => {
    return categoryData.flatMap((category) => category.jobs);
  }, [categoryData]); // 모든 직업을 하나의 배열로 합침(직군 전체), flat이 평탄화 하는 용도

  // 현재 선택된 카테고리에 따라 표시할 직업 목록을 계산
  const jobs = useMemo(() => {
    if (selectJobCategory === '직군 전체') {
      return allJobs;
    }
    const category = categoryData.find((c) => c.categoryName === selectJobCategory);
    return category ? category.jobs : []; // 선택 카테고리에 해당하는 직업 반환
  }, [selectJobCategory, allJobs, categoryData]);

  // 직업 선택 시 호출되는 콜백 함수, useCallback으로 함수를 메모이제이션
  const handleJobSelect = useCallback(
    (jobId: number) => {
      setPreJob((prev) => {
        let newPreJob;
        if (prev.includes(jobId)) {
          newPreJob = prev.filter((id) => id !== jobId);
        } else if (prev.length < 5) {
          newPreJob = [...prev, jobId];
        } else {
          newPreJob = prev;
        }
        onJobsChange(newPreJob); // 부모 컴포넌트에 변경사항 전달
        return newPreJob;
      });
    },
    [onJobsChange],
  );
  return (
    <div className="flex flex-col w-full">
      <p className="font-semibold pb-4">관심 직군</p>
      <div className="flex w-full max-h-64 py-2">
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
            <p className="w-full text-center">직군 전체</p>
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
        <div className="w-[1px] h-full bg-[#d9d9d9] mx-3 sm:mx-6 md:mx-8" />
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

              {/* 동그라미 */}
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
    </div>
  );
}
