import Link from 'next/link';
import Icons from '@/app/_components/ui/Icon';
import { LockIcon } from '@/app/_components/ui/iconPath';
import testData from '../test.json';

export default function QAList() {
  return (
    <div className="flex-col w-full max-w-[1000px] min-w-[360px] mx-10 md:my-24 my-32">
      <div className="flex">
        <div className="flex h-24 w-[85%]">
          {/* 문의게시판 title */}
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
        <div className="flex py-5 border-y-2 md:text-base text-sm  border-gray-0">
          <div className="flex-center w-[10%]">번호</div>
          <div className="flex-center w-[50%]">제목</div>
          <div className="flex-center w-[25%]">작성자</div>
          <div className="flex-center w-[15%]">날짜</div>
        </div>
        <div>
          {testData.listData.inquiries.map((data) => (
            <Link href="./1/select" className="flex w-full py-5 border-b-2 md:text-base text-sm border-gray-5">
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
      </div>
    </div>
  );
}
