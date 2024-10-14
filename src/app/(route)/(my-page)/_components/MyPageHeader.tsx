'use client';

export default function MyPageHeader() {
  return (
    <div className="flex items-center gap-16 w-full pt-4 pb-6 max-w-[1300px] border-b border-[#d9d9d9]">
      <p className="font-semibold text-[32px]">김현중 님</p>

      <div className="flex gap-12">
        <button className="font-bold" type="button">
          기본 정보 수정
        </button>
        <button className="font-bold" type="button">
          비밀번호 변경
        </button>
        <button className="font-bold" type="button">
          회원 탈퇴
        </button>
      </div>
    </div>
  );
}
