'use client';

import testData from '../../test.json';
import BackButton from '@/app/_components/BackButton';

export default function NoticeSelect() {
  return (
    <div className="flex-col w-full max-w-[1000px] min-w-[360px]: mx-10 md:my-7 my-32">
      {/* 문의 title */}
      <div className="flex-col w-full py-1">
        <BackButton />
        <div className="flex-col font-semibold text-3xl pt-7">
          공지
          <div className="flex font-light text-sm py-4 text-gray-0">문의메일 : pplog@pplog.com</div>
        </div>
      </div>
      <div className="flex-col w-full border-2 border-gray-5 pb-10">
        <div className="flex w-full mt-10 py-7 px-14 text-2xl font-semibold">
          <div className="">{testData.selectData.title}</div>
        </div>
        <div className="px-14">
          <p className="flex">{testData.selectData.content}</p>
          <div className="py-5 text-gray-0">{testData.selectData.timestamp}</div>
        </div>
      </div>
    </div>
  );
}
