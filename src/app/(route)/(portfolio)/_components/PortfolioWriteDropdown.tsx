export default function PortfolioWriteDropdown() {
  return (
    <div className="absolute z-[100] flex-center flex-col right-0 top-[35px] p-2.5 bg-white-0 dark:bg-black-4 dark:border-black-5 text-sm rounded-lg border border-gray-5">
      <div className="dropdown-item">수정</div>
      <div className="dropdown-item">삭제</div>
      <div className="dropdown-item">공유</div>
    </div>
  );
}
