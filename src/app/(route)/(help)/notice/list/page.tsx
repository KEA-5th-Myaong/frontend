import Link from 'next/link';
import testData from '../test.json';

export default function NoticeList() {
  // 추후 페이지 나눌 시 리스트 길이 체크
  const importListCount = testData.importantNotices.length;
  const noticeListCount = testData.notices.length;

  return (
    <div className="flex-col w-full h-hull max-w-[1000px] min-w-[360px]: mx-10 md:my-24 my-32">
      <div className="flex row-auto">
        <div className="flex h-24 w-[90%]">
          {/* 문의게시판 title */}
          <div className="font-semibold text-3xl">
            공지 게시판
            <div className="font-light text-sm py-4 text-gray-0">문의메일 : pplog@pplog.com</div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex row-auto py-5 border-y-2 md:text-base text-sm  border-gray-0">
          <div className="flex-center w-[10%] ">번호</div>
          <div className="flex-center w-[65%] ">제목</div>
          <div className="flex-center w-[25%] ">날짜</div>
        </div>
        <div>
          {testData.importantNotices.map((data) => (
            <Link href="./1/select" className="flex w-full row-auto py-5 border-b-2 md:text-base text-sm border-gray-5">
              <div className="flex-center w-[10%] ">{data.noticeId}</div>
              <div className="relative flex-center w-[65%] ">
                <div className="absolute left-20">
                  <div className="flex-center w-10 h-5 rounded-lg bg-red-0 text-xs text-white-0">중요</div>
                </div>
                {data.title}
              </div>

              <div className="flex-center w-[25%] ">{data.timestamp}</div>
            </Link>
          ))}
          {testData.notices.map((data) => (
            <Link href="./1/select" className="flex w-full row-auto py-5 border-b-2 md:text-base text-sm border-gray-5">
              <div className="flex-center w-[10%] ">{data.noticeId}</div>
              <div className="relative flex-center w-[65%] ">
                <div className="absolute left-20" />
                {data.title}
              </div>

              <div className="flex-center w-[25%] ">{data.timestamp}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
