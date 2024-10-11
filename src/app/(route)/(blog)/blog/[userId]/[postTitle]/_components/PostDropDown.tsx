export default function PostDropDown() {
  return (
    <div className="absolute border rounded-lg p-[10px] bg-white-0 right-0">
      <button
        type="button"
        className="px-2 sm:px-4 md:px-8 py-[6px] whitespace-nowrap rounded-lg text-gray-0 hover:bg-primary-1 hover:text-white-0"
      >
        수정
      </button>
      <button
        type="button"
        className="px-2 sm:px-4 md:px-8 py-[6px] whitespace-nowrap rounded-lg text-gray-0 hover:bg-primary-1 hover:text-white-0"
      >
        삭제
      </button>
    </div>
  );
}
