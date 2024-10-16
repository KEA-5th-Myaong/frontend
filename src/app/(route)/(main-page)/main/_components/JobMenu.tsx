'use client';

import { useEffect, useState } from 'react';
import jobMenuTest from './jobMenuTest.json';

interface JobMenuProps {
  className: string;
}

interface JobProps {
  id: number | undefined;
  job: string | undefined;
}

export default function JobMenu({ className }: JobMenuProps) {
  const [jobs, setJobs] = useState<JobProps[]>([]);

  useEffect(() => {
    setJobs(jobMenuTest);
  }, []);

  return (
    <div
      className={`${className} items-center md:items-start flex-row md:flex-col gap-2 w-full md:max-w-[136px] pt-6 md:pt-[46px] whitespace-nowrap overflow-scroll hide-scrollbar`}
    >
      {jobs.map((job) => (
        <button
          key={job.id}
          type="button"
          className="max-w-fit border border-gray-5 hover:border-primary-1 px-4 py-[7px] rounded-[15px] text-sm"
        >
          {job.job}
        </button>
      ))}
    </div>
  );
}
