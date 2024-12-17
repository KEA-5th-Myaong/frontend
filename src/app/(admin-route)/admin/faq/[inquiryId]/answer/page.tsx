'use client';

import { useState } from 'react';
import testData from '../../test.json';
import Icons from '@/app/_components/ui/Icon';
import { LockIcon } from '@/app/_components/ui/iconPath';

export default function AdminFaqAnswer() {
  const [isLocked] = useState(true);

  return (
    <div className="flex gap-2.5 w-full pl-12 pb-40">
      <div className="w-full min-w-[545px] px-6 py-8 bg-white-0 border border-gray-5">
        {/* title */}
        <div className="text-2xl border-b border-gray-5 pb-4 mb-5 w-full font-semibold ">문의 답변</div>

        <section className="max-w-[800px]">
          <div className="w-full border-2 border-gray-5 py-12">
            <div className="flex w-full pb-8 px-7 text-2xl font-semibold">
              <div className="flex w-7 h-7">
                {isLocked && <Icons name={LockIcon} className="flex-center w-5 h-8" />}
              </div>
              <p>{testData.inquiry.title}</p>
            </div>
            <div className="px-14">
              <p className="flex">{testData.inquiry.content}</p>
              <p className="py-5 text-gray-0">{testData.inquiry.timestamp}</p>
            </div>
          </div>
          <div className="w-full bg-blue-2 mt-5 pb-10">
            <div className="flex w-full pt-10 pb px-14 text-xl font-semibold ">관리자</div>
            <div className="px-14 pt-5">
              <p className="flex">{testData.inquiryReply.content}</p>
              <p className="py-5 text-gray-0">{testData.inquiryReply.timestamp}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
