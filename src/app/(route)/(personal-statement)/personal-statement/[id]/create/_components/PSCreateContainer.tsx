export default function PSCreateContainer() {
  return (
    <div className="self-start w-full">
      <p className="w-full font-semibold text-[28px] pb-5 mb-9 border-b-2 border-gray-[#D9D9D9]">자기소개서</p>

      <div className="flex flex-col gap-[18px] bg-gray-4 pt-5 px-14 pb-10 rounded-[10px]">
        {/* 제목 */}
        <div className="flex flex-col gap-[6px] w-full">
          <p className="font-semibold text-[13px]">제목</p>
          <input
            className="bg-gray-[#F9F9F9] px-5 py-[10px] text-[13px] border border-gray-[#D9D9D9] rounded-[10px] placeholder:text-gray-[#DEDEDE]"
            placeholder="제목을 입력해주세요"
          />
        </div>

        {/* 지원직무 */}
        <div className="flex flex-col gap-[6px] w-full">
          <p className="font-semibold text-[13px]">지원직무</p>
          <input
            className="bg-gray-[#F9F9F9] px-5 py-[10px] text-[13px] border border-gray-[#D9D9D9] rounded-[10px] placeholder:text-gray-[#DEDEDE]"
            placeholder="지원 직무를 입력해주세요"
          />
        </div>

        {/* 지원사유 */}
        <div className="flex flex-col gap-[6px] w-full">
          <div className="flex justify-between w-full font-semibold text-[13px]">
            <p>지원사유</p>
            <p>123/500</p>
          </div>
          <textarea
            className="resize-none h-32 bg-gray-[#F9F9F9] px-5 py-4 text-[13px] border border-gray-[#D9D9D9] rounded-[10px] placeholder:text-gray-[#DEDEDE]"
            placeholder="지원 사유를 입력해주세요"
          />
        </div>

        {/* 자기소개 */}
        <div className="flex flex-col gap-[6px] w-full">
          <div className="flex justify-between w-full font-semibold text-[13px]">
            <p>자기소개</p>
            <p>234/2000</p>
          </div>
          <textarea
            className="resize-none h-64 bg-gray-[#F9F9F9] px-5 py-4 text-[13px] border border-gray-[#D9D9D9] rounded-[10px] placeholder:text-gray-[#DEDEDE]"
            placeholder="자기소개서 내용을 입력해주세요"
          />
        </div>
      </div>

      <div className="mt-4 mb-24 px-11 py-5 bg-[#F3F3F3] text-gray-0 text-xs">
        ! 자기소개서는 최대 2000자까지 입력 가능합니다.
      </div>
    </div>
  );
}
