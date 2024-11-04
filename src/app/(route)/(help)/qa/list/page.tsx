import testData from './test.json';

export default function QAList() {
  return (
    <div className="flex-col w-full h-hull px-80 py-24">
      {/* 문의게시판 title */}
      <div className="flex w-full h-24">
        <div className="font-semibold text-2xl">
          문의게시판
          <div className="font-light text-sm py-4 text-gray-0">문의메일 : pplog@pplog.com</div>
        </div>
      </div>

      <div>
        <div className="flex row-auto py-5 border-y-2 border-gray-0">
          <div className="flex-center w-[10%] ">번호</div>
          <div className="flex-center w-[50%] ">제목</div>
          <div className="flex-center w-[25%]">작성자</div>
          <div className="flex-center w-[15%] ">날짜</div>
        </div>
        <div>
          {testData.inquiries.map((data) => (
            <div className="flex row-auto py-5 border-b-2 border-gray-5">
              <div className="flex-center w-[10%] ">{data.inquiryId}</div>
              <div className="flex-center w-[50%] ">{data.title}</div>
              <div className="flex-center w-[25%] ">{data.userName}</div>
              <div className="flex-center w-[15%] ">{data.timestamp}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
