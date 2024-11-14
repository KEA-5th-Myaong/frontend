'use client';

import { motion } from 'framer-motion';
import Overlay from '@/app/_components/Overlay';
import { ModalProps } from '@/app/_types/common';
import { modalMotion } from '@/app/_components/Modal';

export default function AdminModal({
  topText,
  subText = '',
  btnText,
  onBtnClick,
  hasSubBtn = false,
  subBtnText = '',
  onSubBtnClick,
  placeholder,
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
        className="flex m-4 min-w-[300px] max-w-[510px] w-full px-12 py-9 flex-col items-start gap-[30px] rounded-[10px] bg-black-3 shadow-md"
      >
        {/* 텍스트 */}
        <div className="flex items-center flex-col gap-2 self-stretch ">
          <span className="admin-modal-text">{topText}</span>
          {subText && <span className="admin-modal-text">{subText}</span>}
        </div>

        {/* 인풋 */}
        {hasInput && (
          <input
            className="flex self-center w-full max-w-[70%] py-1 px-2 rounded-[5px] focus:outline-none"
            value={value}
            placeholder={placeholder}
            onChange={onChange}
          />
        )}

        {/* 버튼 */}
        <div className="flex self-center w-full max-w-[70%] gap-3">
          {/* 서브 버튼 */}
          {hasSubBtn && (
            <button
              type="button"
              onClick={onSubBtnClick}
              className="w-full px-5 py-1 rounded-lg bg-white-0 text-black-3 whitespace-nowrap"
            >
              {subBtnText}
            </button>
          )}

          {/* 기본 버튼 */}
          <button
            type="button"
            onClick={onBtnClick}
            className="w-full px-5 py-1 rounded-lg bg-white-0 text-black-3 whitespace-nowrap"
          >
            {btnText}
          </button>
        </div>
      </motion.div>
    </Overlay>
  );
}
