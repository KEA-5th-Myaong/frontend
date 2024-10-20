'use client';

import { useEffect, useState } from 'react';
import useCustomQuery from '@/app/_hooks/useCustomQuery';
import { fetchPreJobs } from '../_services/mainService';

interface JobMenuProps {
  className: string;
  onJobSelect: (jobId: string) => void;
  selectedJob: string | null;
  activeTab: string;
}

interface JobProps {
  jobId: number | undefined;
  jobName: string | undefined;
}

export default function JobMenu({ className, onJobSelect, selectedJob, activeTab }: JobMenuProps) {
  const { data } = useCustomQuery(['pre-job'], () => fetchPreJobs());
  const preJob = data?.data;

  const [jobs, setJobs] = useState<JobProps[]>([]);

  useEffect(() => {
    setJobs(preJob);
  }, [preJob]);

  return (
    <div
      className={`${className} items-center md:items-start flex-row md:flex-col gap-2 w-full 
      md:max-w-[156px] pt-6 md:pt-[46px] whitespace-nowrap overflow-scroll hide-scrollbar`}
    >
      {jobs?.map((job) => (
        <button
          key={job.jobId}
          type="button"
          className={`max-w-fit border ${
            selectedJob === job.jobId?.toString() && activeTab === '직군' ? 'border-primary-1' : 'border-gray-5'
          } hover:border-primary-1 px-4 py-[7px] rounded-[15px] text-sm bg-white-0`}
          onClick={() => onJobSelect(job.jobId?.toString() || '')}
        >
          {job.jobName}
        </button>
      ))}
    </div>
  );
}
