interface PortfolioDropdownProps {
  id: string;
  onDelete: (id: string) => void;
}

export default function PortfolioDropdown({ id, onDelete }: PortfolioDropdownProps) {
  return (
    <div
      onClick={(e) => e.stopPropagation()} // 이벤트 버블링 방지
      className="absolute flex-center flex-col right-[30px] top-[60px] p-2.5 bg-white-0 text-sm rounded-lg border  border-gray-5"
    >
      <div className="dropdown-item">수정</div>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation(); // 이벤트 버블링 방지
          console.log('Delete button clicked'); // 디버깅 메시지
          onDelete(id); // 삭제 함수 호출
        }}
        className="dropdown-item"
      >
        삭제
      </button>
      <div className="dropdown-item">공유</div>
    </div>
  );
}
