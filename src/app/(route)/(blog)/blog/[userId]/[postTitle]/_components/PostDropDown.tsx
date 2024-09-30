export default function PostDropDown() {
  return (
    <div className="absolute border rounded-lg p-[10px] bg-white-0 right-0">
      <button type="button" className="px-8 py-[6px] font-normal primary-1-btn">
        수정
      </button>
      <button type="button" className="px-8 py-[6px] text-gray-0">
        삭제
      </button>
    </div>
  );
}
