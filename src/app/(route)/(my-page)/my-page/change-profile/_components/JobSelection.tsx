import { useState, useMemo, useEffect } from 'react';
import Icons from '../../../../../_components/ui/Icon';
import { ArrowIcon } from '../../../../../_components/ui/iconPath';
import { JobCategory, JobSelectionProps } from '../_types/myPage';

export default function JobSelection({ jobData, onJobSelect }: JobSelectionProps) {
  const [selectJobCategory, setSelectJobCategory] = useState<JobCategory>('직군 전체');
  const [selectJob, setSelectJob] = useState('전체');

  const allJobs = useMemo(() => Object.values(jobData).flat(), [jobData]); // 모든 직업을 하나의 배열로 합침(직군 전체), flat이 평탄화 하는 용도

  // 현재 선택된 카테고리에 따라 표시할 직업 목록을 계산
  const jobs = useMemo(() => {
    if (selectJobCategory === '직군 전체') {
      return allJobs;
    }
    return jobData[selectJobCategory]; // 선택 카테고리에 해당하는 직업 반환
  }, [selectJobCategory, allJobs, jobData]);

  // 카테고리나 직업이 변경될 때마다 부모 컴포넌트로 전달
  useEffect(() => {
    onJobSelect(selectJobCategory, selectJob);
  }, [selectJobCategory, selectJob, onJobSelect]);

  return (
    <div className="flex flex-col w-full">
      <p className="font-semibold pb-4">관심 직군</p>
      <div className="flex w-full max-h-64 py-2">
        {/* 직군 카테고리 */}
        <div className="flex flex-col w-full max-w-60 overflow-scroll hide-scrollbar">
          {/* 주어진 직업 객체의 열거 가능한 속성 이름들(카테고리)을 배열로 반환 */}
          {(Object.keys(jobData) as JobCategory[]).map((category) => (
            <button
              type="button"
              onClick={() => setSelectJobCategory(category)}
              className={`flex justify-between w-full py-2 px-3 rounded-[10px] font-medium whitespace-nowrap ${
                selectJobCategory === category ? 'bg-primary-0' : 'text-gray-0'
              }`}
            >
              <p className="w-full text-center">{category}</p>
              <Icons className="bg-white-0 border rounded-full rotate-180" name={ArrowIcon} />
            </button>
          ))}
        </div>
        {/* 중앙선 */}
        <div className="w-[1px] h-full bg-[#d9d9d9] mx-3 sm:mx-6 md:mx-8" />
        {/* 직군 상세 */}
        <div className="flex items-center flex-col w-full max-w-52 pr-0 sm:pr-4 overflow-scroll hide-scrollbar">
          {jobs.map((job: string) => (
            <button
              type="button"
              onClick={() => setSelectJob(job)}
              key={job}
              className="flex justify-between w-full py-1"
            >
              <p
                className={`w-full text-center font-medium line-clamp-2 ${allJobs.includes(selectJob) && selectJob === job ? '' : 'text-gray-0'}`}
              >
                {job}
              </p>

              {allJobs.includes(selectJob) && selectJob === job ? (
                <div className="flex-center w-5 h-5 border-2 ml-2 border-primary-1 rounded-full">
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
