interface PSFooterProps {
  showPDF?: boolean;
  showPreview?: boolean;
  showDone?: boolean;
  showBack?: boolean;

  handlePdfClick?: () => void;
  handlePreviewClick?: () => void;
  handleDoneClick?: () => void;
  handleBackClick?: () => void;
}

export default function PSFooter({
  showPDF,
  showPreview,
  showDone,
  showBack,

  handlePdfClick,
  handlePreviewClick,
  handleDoneClick,
  handleBackClick,
}: PSFooterProps) {
  return (
    <div
      className={`fixed bottom-0 w-full flex items-center ${showPDF ? 'justify-between' : 'justify-end'} 
     min-w-[360px] bg-white-0 py-4 px-4 sm:px-16 
    border border-t-gray-2 font-semibold whitespace-nowrap`}
    >
      {showPDF && (
        <button
          type="button"
          onClick={handlePdfClick}
          className="hidden sm:block rounded-[10px] border border-[#E1E1E1] py-2 px-6"
        >
          PDF로 저장
        </button>
      )}

      <div className="flex gap-5">
        {showPreview && (
          <button
            type="button"
            onClick={handlePreviewClick}
            className="rounded-[10px] border border-[#E1E1E1] py-2 px-6"
          >
            미리보기
          </button>
        )}

        {showDone && (
          <button
            type="button"
            onClick={handleDoneClick}
            className="bg-primary-1 text-white-0 rounded-[10px] border border-[#E1E1E1] py-2 px-6"
          >
            작성 완료
          </button>
        )}

        {showBack && (
          <button
            type="button"
            onClick={handleBackClick}
            className="bg-primary-1 text-white-0 rounded-[10px] border border-[#E1E1E1] py-2 px-6"
          >
            뒤로가기
          </button>
        )}
      </div>
    </div>
  );
}
