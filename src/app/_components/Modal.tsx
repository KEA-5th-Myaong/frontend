'use client';

import { motion } from 'framer-motion';
import Overlay from './Overlay';
import { ModalProps } from '../_types/common';

const modalMotion = {
  variants: {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  },
  transition: {
    type: 'spring',
    stiffness: 300,
    damping: 30,
    duration: 0.3,
  },
};

export default function Modal({
  topText,
  subText = '',
  btnText,
  onBtnClick,
  hasSubBtn = false,
  subBtnText = '',
  onSubBtnClick,
  isWarn = false,
  onOverlayClick,
}: ModalProps) {
  const handleOverlayClick = () => {
    if (onOverlayClick) {
      onOverlayClick();
    }
  };
  return (
    <Overlay onClick={handleOverlayClick}>
      <motion.div
        onClick={(e) => e.stopPropagation()} // 클릭 이벤트가 Overlay까지 전달되지 않도록
        {...modalMotion}
        className="flex m-4 min-w-[300px] max-w-[510px] w-full p-8 flex-col items-start gap-8 rounded bg-white-0 shadow-md"
      >
        {/* 텍스트 */}
        <div className="flex items-center flex-col gap-2 self-stretch ">
          <span className="text-lg modal-text">{topText}</span>
          {subText && <span className="modal-text">{subText}</span>}
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
            className={`${hasSubBtn ? 'w-full' : 'w-1/2'} ${isWarn ? 'bg-yellow-0' : 'bg-green-1'} mx-auto py-1 rounded text-white-0`}
          >
            {btnText}
          </button>
        </div>
      </motion.div>
    </Overlay>
  );
}
