export default function AdminMain() {
  return (
    <section className="flex-center h-screen bg-[#F5F5F5]">
      <div className="flex flex-col gap-7 font-semibold">
        <div className="flex gap-4">
          <div className="flex-center flex-col bg-black-3 px-[132px] w-96 h-[286px] pt-10 pb-9 text-white-0 font-semibold">
            <div className="w-[100px] min-h-[100px] bg-white-0 rounded-full" />
            <p className="mt-4">관리자</p>
            <p className="mt-3 font-medium">yeonilil@naver.com</p>
            <p className="mt-5">로그아웃</p>
          </div>
          <div className="w-96 pl-10 pr-6 pt-9 h-[286px] border border-gray-3 font-semibold bg-white-0">
            <div className="pb-2.5 border-b border-gray-0">
              <p>알림</p>
            </div>

            <div className="mt-6 w-full flex justify-between text-xs">
              <p>답변 대기 문의</p>
              <p className="text-red-0">2건</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="py-8 pl-6 pr-[14px] w-96 bg-white-0 border border-gray-3">콘텐츠 관리</div>
          <div className="py-8 pl-6 pr-[14px] w-96 bg-white-0 border border-gray-3">콘텐츠 관리?</div>
        </div>

        <div className="flex gap-4">
          <div className="py-8 pl-6 pr-[14px] w-96 bg-white-0 border border-gray-3">회원 관리</div>
          <div className="py-8 pl-6 pr-[14px] w-96 bg-white-0 border border-gray-3">회원 카테고리 관리</div>
        </div>

        <div className="flex gap-4">
          <div className="py-8 pl-6 pr-[14px] w-96 bg-white-0 border border-gray-3">문의 관리</div>
          <div className="py-8 pl-6 pr-[14px] w-96 bg-white-0 border border-gray-3">공지 관리</div>
        </div>
      </div>
    </section>
  );
}
