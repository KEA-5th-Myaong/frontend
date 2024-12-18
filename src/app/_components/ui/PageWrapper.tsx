'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PageWrapperProps {
  children?: ReactNode;
  className?: string;
}

export default function PageWrapper({ children, className = '' }: PageWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }} // 오른쪽에서 시작
      animate={{ opacity: 1, x: 0 }} // 중앙으로 이동
      exit={{ opacity: 0, x: -200 }} // 왼쪽으로 사라짐
      transition={{
        duration: 0.5,
        ease: 'easeInOut', // 부드러운 가속/감속
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
