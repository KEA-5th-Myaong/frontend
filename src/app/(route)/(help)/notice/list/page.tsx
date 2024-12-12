import Link from 'next/link';
import testData from '../test.json';

export default function NoticeList() {
  // 추후 페이지 나눌 시 리스트 길이 체크
  // const importListCount = testData.importantNotices.length;
  // const noticeListCount = testData.notices.length;

  return (
    <div className="w-full max-w-[1000px] min-w-[360px] mx-10 md:my-24 my-32">
      <div className="flex h-24 w-[90%]">
        {/* 게시판 title */}
        <div className="font-semibold text-3xl">
          공지 게시판
          <div className="font-light text-sm py-4 text-gray-0">문의메일 : pplog@pplog.com</div>
        </div>
      </div>

      <div>
        <div className="flex py-5 border-y-2 md:text-base text-sm  border-gray-0">
          <div className="flex-center w-[10%]">번호</div>
          <div className="flex-center w-[20%]" />
          <div className="flex-center w-[45%]">제목</div>
          <div className="flex-center w-[25%]">날짜</div>
        </div>
        <div>
          {testData.importantNotices.map((data) => (
            <Link href="./1/select" className="flex w-full py-5 border-b-2 md:text-base text-sm border-gray-5">
              <div className="flex-center w-[10%]">{data.noticeId}</div>
              <div className="flex-center w-[20%]">
                <div className="flex-center w-10 h-5 rounded-lg bg-red-0 text-xs text-white-0">중요</div>
              </div>
              <div className=" flex-center w-[45%] gap-4">
                <p className="flex-grow text-center w-full justify-self-start overflow-hidden text-ellipsis whitespace-nowrap">
                  {data.title}
                </p>
              </div>
              <div className="flex-center w-[25%]">{data.timestamp}</div>
            </Link>
          ))}
          {testData.notices.map((data) => (
            <Link href="./1/select" className="flex w-full py-5 border-b-2 md:text-base text-sm border-gray-5">
              <p className="flex-center w-[10%]">{data.noticeId}</p>
              <p className="w-[20%]" />
              <p className="w-[45%] text-center">{data.title}</p>
              <p className="flex-center w-[25%]">{data.timestamp}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
