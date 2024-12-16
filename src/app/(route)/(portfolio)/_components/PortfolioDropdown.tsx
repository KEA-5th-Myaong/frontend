interface PortfolioDropdownProps {
  id: string;
  onDelete: (id: string) => void;
  onModify: (id: string) => void;
}

export default function PortfolioDropdown({ id, onDelete, onModify }: PortfolioDropdownProps) {
  return (
    <div className="absolute flex-center flex-col right-[5px] top-[35px] p-2.5 bg-white-0 dark:bg-black-4 dark:border-black-5 text-sm rounded-lg border  border-gray-5">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation(); // 이벤트 버블링 방지
          onModify(id); // 수정 함수 호출
        }}
        className="dropdown-item"
      >
        수정
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation(); // 이벤트 버블링 방지
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
