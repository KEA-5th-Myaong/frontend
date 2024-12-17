'use client';

import Link from 'next/link';
import Icons from '@/app/_components/ui/Icon';
import testData from './test.json';
import { LockIcon } from '@/app/_components/ui/iconPath';

export default function AdminFaq() {
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
            {testData.listData.inquiries.map((data) => (
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
      </div>
    </div>
  );
}
