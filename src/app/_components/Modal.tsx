'use client';

export interface ModalProps {
  topText: string;
  subText?: string;

  btnText: string;
  onBtnClick: () => void;
  hasSubBtn?: boolean;
  subBtnText?: string;
  onSubBtnClick?: () => void;

  isWarn?: boolean;
}

export default function Modal({
  topText,
  subText = '',
  btnText,
  onBtnClick,
  hasSubBtn = false,
  subBtnText = '',
  onSubBtnClick = undefined,
  isWarn = false,
}: ModalProps) {
  return (
    <div className="fixed inset-0 flex-center z-50 bg-black-3 bg-opacity-25">
      <div className="flex m-4 min-w-[300px] max-w-[510px] w-full p-8 flex-col items-start gap-8 rounded bg-white-0 shadow-md">
        {/* 텍스트 */}
        <div className="flex items-center flex-col gap-2 self-stretch ">
          <span className="text-center text-lg font-medium break-words whitespace-pre-wrap">{topText}</span>
          {subText && <span className="text-center font-medium break-words whitespace-pre-wrap">{subText}</span>}
        </div>

        {/* 버튼 */}
        <div className="flex items-center gap-6 self-stretch">
          {/* 서브 버튼 */}
          {hasSubBtn && (
            <button type="button" onClick={onSubBtnClick} className="bg-gray-0 text-white-0 w-full">
              {subBtnText}
            </button>
          )}

          {/* 기본 버튼 */}
          <button
            type="button"
            onClick={onBtnClick}
            className={`mx-auto ${isWarn ? 'bg-yellow-0' : 'bg-green-1'} py-1 rounded text-white-0 ${hasSubBtn ? 'w-full' : 'w-1/2'}`}
          >
            {btnText}
          </button>
        </div>
      </div>
    </div>
  );
}
