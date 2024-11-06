export default function AdminMain() {
  return (
    <section className="flex-center min-h-screen bg-[#F5F5F5] pt-28 px-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 font-semibold min-w-[360px] w-full max-w-[768px] pb-14">
        {/* 관리자 */}
        <div className="flex-center flex-col bg-black-3 h-[286px] pt-10 pb-9 text-white-0 font-semibold w-full max-w-h-96 border-gray-3">
          <div className="w-[100px] min-h-[100px] bg-white-0 rounded-full" />
          <p className="mt-4">관리자</p>
          <p className="mt-3 font-medium">yeonilil@naver.com</p>
          <p className="mt-5">로그아웃</p>
        </div>

        {/* 알림 */}
        <div className="h-[286px] pl-10 pr-6 pt-9 border w-full max-w-h-96 border-gray-3 font-semibold bg-white-0">
          <div className="pb-2.5 border-b border-gray-0">
            <p>알림</p>
          </div>

          <div className="mt-6 w-full flex justify-between text-xs">
            <p>답변 대기 문의</p>
            <p className="text-red-0 pr-14">2건</p>
          </div>
        </div>

        {/* 콘텐츠 관리 */}
        <div className="py-8 pl-6 pr-[14px] bg-white-0 border w-full max-w-h-96 border-gray-3">콘텐츠 관리</div>

        {/* 콘텐츠 관리? */}
        <div className="py-8 pl-6 pr-[14px] bg-white-0 border w-full max-w-h-96 border-gray-3">콘텐츠 관리?</div>

        {/* 회원관리 */}
        <div className="py-8 pl-6 pr-[14px] bg-white-0 border w-full max-w-h-96 border-gray-3">회원 관리</div>

        {/* 회원 카테고리 관리 */}
        <div className="py-8 pl-6 pr-[14px] bg-white-0 border w-full max-w-h-96 border-gray-3">회원 카테고리 관리</div>

        {/* 문의 관리 */}
        <div className="py-8 pl-6 pr-[14px] bg-white-0 border w-full max-w-h-96 border-gray-3">문의 관리</div>

        {/* 공지 관리 */}
        <div className="py-8 pl-6 pr-[14px] bg-white-0 border w-full max-w-h-96 border-gray-3">공지 관리</div>
      </div>
    </section>
  );
}
