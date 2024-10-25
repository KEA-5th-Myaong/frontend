'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Icons from '../../../../../_components/ui/Icon';
import { SearchIcon } from '../../../../../_components/ui/iconPath';
import useCustomQuery from '@/app/_hooks/useCustomQuery';
import { fetchCompanies, fetchCompaniesSearch } from '../../../_services/interviewService';

export default function InterviewSelect() {
  const router = useRouter();
  const params = useParams();
  const { username } = params;

  const { data, isLoading } = useCustomQuery(['corps'], () => fetchCompanies());

  const [corpList, setCorpList] = useState([]); // 기업 목록
  const [searchCorp, setSearchCorp] = useState(''); // 검색어

  // 기업 목록 불러와서 저장
  useEffect(() => {
    setCorpList(data?.data);
  }, [data?.data]);

  // 기업 목록 검색해서 저장
  const handleSearch = async () => {
    if (searchCorp.trim()) {
      try {
        const result = await fetchCompaniesSearch(searchCorp);
        setCorpList(result.data);
      } catch (error) {
        console.error('검색 중 오류 발생:', error);
      }
    }
  };

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleCorpClick = (corp: { companyName: string }) => {
    router.push(`/interview/${username}/${corp.companyName}/personal-statement`);
  };

  return (
    <section className="interview-container">
      <p className="font-semibold self-start">모의 면접</p>

      <div className="flex gap-4 self-stretch pt-6 min-w-[318px] w-full">
        <div className="flex self-stretch items-center px-5 py:1 md:py-4 gap-5 rounded-[3rem] border border-primary-1 w-full bg-white-0">
          <Icons name={SearchIcon} />
          <input
            className="w-full focus:outline-none"
            placeholder="기업 이름을 검색하거나 선택하세요"
            value={searchCorp}
            onChange={(e) => setSearchCorp(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <motion.button
          type="button"
          onClick={handleSearch}
          layoutId="select"
          className="px-4 md:px-10 py-2 md:py-4 rounded-[28px] primary-1-btn"
        >
          검색
        </motion.button>
      </div>

      <div className="flex flex-wrap mx-auto pt-5 w-full min-w-[263px] max-w-[440px]">
        {isLoading
          ? Array.from({ length: 28 }).map(() => (
              <div className="h-7 py-1.5 px-1 sm:px-4 md:px-6 lg:px-8 my-2  rounded-lg w-1/3 bg-gray-4 animate-pulse" />
            ))
          : corpList?.map((corp: { companyName: string }) => (
              <motion.button type="button" onClick={() => handleCorpClick(corp)} className="corp-block">
                {corp.companyName}
              </motion.button>
            ))}
      </div>
    </section>
  );
}
