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

export const initailModalState = {
  open: false,
  topText: '',
  subText: '',
  btnText: '',
  onBtnClick: () => {},
  hasSubBtn: false,
  subBtnText: '',
  onSubBtnClick: () => {},
  isWarn: false,
  onOverlayClick: () => {},
  hasInput: false,
  value: '',
  onChange: () => {},
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
  hasInput,
  value,
  onChange,
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
        className="flex m-4 min-w-[300px] max-w-[510px] w-full pb-6 px-10 pt-10 flex-col items-start gap-12 rounded-2xl bg-white-0 shadow-md"
      >
        {/* 텍스트 */}
        <div className="flex items-center flex-col gap-2 self-stretch ">
          <span className="modal-text">{topText}</span>
          {subText && <span className="modal-text">{subText}</span>}
        </div>

        {/* 인풋 */}
        {hasInput && (
          <input
            className="flex justify-center self-stretch py-6 px-5 w-full rounded-lg border border-primary-2"
            value={value}
            onChange={onChange}
          />
        )}

        {/* 버튼 */}
        <div className="flex items-center gap-6 self-stretch">
          {/* 서브 버튼 */}
          {hasSubBtn && (
            <button
              type="button"
              onClick={onSubBtnClick}
              className="bg-gray-3 text-white-0 w-full mx-auto py-4 rounded-lg"
            >
              {subBtnText}
            </button>
          )}

          {/* 기본 버튼 */}
          <button
            type="button"
            onClick={onBtnClick}
            className={`w-full ${isWarn ? 'bg-red-0' : 'bg-primary-1'} mx-auto py-4 rounded-lg text-white-0`}
          >
            {btnText}
          </button>
        </div>
      </motion.div>
    </Overlay>
  );
}
