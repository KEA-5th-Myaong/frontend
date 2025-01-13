'use client';

import Link from 'next/link';
import { useState } from 'react';
import Icons from '@/app/_components/ui/Icon';
import testData from './test.json';
import { LockIcon } from '@/app/_components/ui/iconPath';
import usePagination from '@/app/_hooks/usePagenation';
import { fetchAdminInquery } from '../_services/adminService';

interface InquiryResponse {
  pageSize: number;
  nextPage: number;
  inquiries: Inquiry[];
}

export interface Inquiry {
  inquiryId: number;
  title: string;
  isSecret: boolean;
  userName: string;
  timestamp: string;
}

export default function AdminFaq() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: queryData, hasNextPage } = usePagination<InquiryResponse>({
    queryKey: ['inquiries'],
    queryFn: async (page, pageSize) => {
      const response = await fetchAdminInquery(page, pageSize);
      return response.data;
    },
    page: currentPage,
    pageSize: 10,
  });
  console.log('관리자 문의 리스트', queryData);

  return (
    <div className="flex gap-2.5 w-full pl-12 pb-40">
      <div className="w-full min-w-[545px] px-6 py-8 bg-white-0 border border-gray-5">
        {/* title */}
        <div className="text-2xl border-b border-gray-5 pb-4 mb-5 w-full font-semibold ">문의 관리</div>

        <section className="max-w-[800px]">
          <div className="flex py-5 border-y-2 md:text-base text-sm  border-gray-0">
            <div className="flex-center w-[10%]">번호</div>
            <div className="flex-center w-[50%]">제목</div>
            <div className="flex-center w-[25%]">작성자</div>
            <div className="flex-center w-[15%]">날짜</div>
          </div>
          <div>
            {queryData?.inquiries.map((data) => (
              <Link
                href={`/admin/faq/${data.inquiryId}/answer`}
                className="flex w-full py-5 border-b-2 md:text-base text-sm border-gray-5"
              >
                <p className="flex-center w-[10%]">{data.inquiryId}</p>
                <div className="flex-center w-[50%]">
                  <div className="w-7">{data.isSecret && <Icons name={LockIcon} className="w-4 h-4" />}</div>
                  {data.title}
                </div>
                <p className="flex-center w-[25%]">{data.userName}</p>
                <p className="flex-center w-[15%]">{data.timestamp}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* 페이지네이션 UI */}
        <div className="flex justify-center gap-8 mt-8">
          <button
            type="button"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
          >
            이전
          </button>
          <span className="flex-center px-3 py-2 rounded-lg bg-primary-1 text-white-0">{currentPage}</span>
          <button
            type="button"
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={!hasNextPage}
            className="px-4 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}
