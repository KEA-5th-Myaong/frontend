import { motion } from 'framer-motion';
import React from 'react';

interface MotionWrapperProps {
  children: React.ReactNode; // 자식 요소를 받을 프로퍼티
}

export default function MotionWrapper({ children }: MotionWrapperProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }} // 초기 상태: 투명하고 아래에 위치
      animate={{ opacity: 1, y: 0 }} // 보이는 상태: 완전한 불투명도와 원래 위치
      exit={{ opacity: 0, y: 10 }} // 사라지는 상태: 투명하고 아래로 이동
      transition={{ duration: 0.3 }} // 애니메이션 시간
      className="relative w-full py-[20px] px-[30px] bg-gray-4  dark:bg-black-4  rounded-[10px] mb-4"
    >
      {children}
    </motion.section>
  );
}
