interface PSFooterProps {
  handlePdfClick: () => void;
  handlePreviewClick?: () => void;
  handleDoneClick?: () => void;
}

export default function PSFooter({ handlePdfClick, handlePreviewClick, handleDoneClick }: PSFooterProps) {
  return (
    <div
      className="fixed bottom-0 w-full flex items-center justify-between bg-white-0 py-4 px-16 
    border border-t-gray-2 font-semibold whitespace-nowrap"
    >
      <button type="button" onClick={handlePdfClick} className="rounded-[10px] border border-[#E1E1E1] py-2 px-6">
        PDF로 저장
      </button>

      <div className="flex gap-5">
        <button type="button" onClick={handlePreviewClick} className="rounded-[10px] border border-[#E1E1E1] py-2 px-6">
          미리보기
        </button>
        <button
          type="button"
          onClick={handleDoneClick}
          className="bg-primary-1 text-white-0 rounded-[10px] border border-[#E1E1E1] py-2 px-6"
        >
          작성 완료
        </button>
      </div>
    </div>
  );
}
