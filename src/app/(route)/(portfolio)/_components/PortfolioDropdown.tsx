export default function PortfolioDropdown() {
  return (
    <div className="absolute flex-center flex-col right-[30px] top-[60px] p-[10px] bg-white-0 text-[14px] rounded-[8px] border border-[1px] border-gray-5">
      <div className="dropdown-item">수정</div>
      <div className="dropdown-item">삭제</div>
      <div className="dropdown-item">공유</div>
    </div>
  );
}
