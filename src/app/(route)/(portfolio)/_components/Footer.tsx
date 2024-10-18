interface FooterProps {
  showPDF?: boolean;
  showLink?: boolean;
  showPreview?: boolean;
  showDone?: boolean;

  handlePdfClick?: () => void;
  handleLinkClick?: () => void;
  handlePreviewClick?: () => void;
  handleDoneClick?: () => void;
}

export default function Footer({
  showPDF,
  showLink,
  showPreview,
  showDone,

  handlePdfClick,
  handleLinkClick,
  handlePreviewClick,
  handleDoneClick,
}: FooterProps) {
  return (
    <div
      className={`fixed bottom-0 w-full flex items-center ${showPDF ? 'justify-between' : 'justify-end'} min-w-[360px] bg-white-0 py-4 px-4 sm:px-16 
      border border-t-gray-2 font-semibold whitespace-nowrap`}
    >
      <div className="flex-center gap-[20px]">
        {showPDF && (
          <button
            type="button"
            onClick={handlePdfClick}
            className="hidden sm:block rounded-[10px] border border-[#E1E1E1] py-2 px-6"
          >
            PDF로 저장
          </button>
        )}

        {showLink && (
          <button
            type="button"
            onClick={handleLinkClick}
            className="hidden sm:block rounded-[10px] border border-[#E1E1E1] py-2 px-6"
          >
            공유 링크 생성
          </button>
        )}
      </div>

      <div className="flex-center gap-[20px]">
        {showPreview && (
          <button
            type="button"
            onClick={handlePreviewClick}
            className="hidden sm:block rounded-[10px] border border-[#E1E1E1] py-2 px-6"
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
      </div>
    </div>
  );
}
