'use client';

import Link from 'next/link';
import { useState } from 'react';
import Icons from '@/app/_components/ui/Icon';
import { LockIcon } from '@/app/_components/ui/iconPath';
import { fetchInquiries } from '../_service/qaService';
import { formatDate } from '@/app/_utils/formatDate';
import { InquiryResponse } from '../_types/qaTypes';
import usePagination from '@/app/_hooks/usePagenation';

export default function QAList() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: queryData, hasNextPage } = usePagination<InquiryResponse>({
    queryKey: ['inquiries'],
    queryFn: async (page, pageSize) => {
      const response = await fetchInquiries(page, pageSize);
      return response.data;
    },
    page: currentPage,
    pageSize: 10,
  });

  return (
    <div className="flex-col w-full max-w-[1000px] min-w-[360px] mx-10 md:my-24 my-32">
      <div className="flex">
        <div className="flex h-24 w-[85%]">
          <div className="font-semibold text-3xl">
            문의게시판
            <div className="font-light text-sm py-4 text-gray-0">문의메일 : pplog@pplog.com</div>
          </div>
        </div>
        <div className="w-36 items-center justify-center pt-5">
          <Link href="/qa/write">
            <div className="flex-center py-4 rounded-[28px] primary-1-btn hover-animation">문의 작성</div>
          </Link>
        </div>
      </div>

      <div>
        <div className="flex py-5 border-y-2 md:text-base text-sm border-gray-0">
          <div className="flex-center w-[10%]">번호</div>
          <div className="flex-center w-[50%]">제목</div>
          <div className="flex-center w-[25%]" />
          <div className="flex-center w-[15%]">날짜</div>
        </div>
        <div>
          {queryData?.inquiries?.map((inquiry) => (
            <Link
              key={inquiry.inquiryId}
              href="./1/select"
              className="flex w-full py-5 border-b-2 md:text-base text-sm border-gray-5"
            >
              <p className="flex-center w-[10%]">{inquiry.inquiryId}</p>
              <div className="flex-center w-[50%]">
                <div className="w-7">{inquiry.isSecret && <Icons name={LockIcon} className="w-4 h-4" />}</div>
                {inquiry.title}
              </div>
              <p className="flex-center w-[25%]">{inquiry.userName}</p>
              <p className="flex-center w-[15%]">{formatDate(inquiry.timestamp)}</p>
            </Link>
          ))}
        </div>
      </div>

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
  );
}
