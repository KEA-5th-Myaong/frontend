'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import portfolioTipsData from './portfolioTips.json'; // JSON 파일 정적 임포트

interface PortfolioTips {
  career: string[];
  activities: string[];
}

interface PortfolioTipsWrapper {
  portfolioTips: PortfolioTips;
}

interface TipsProps {
  item: keyof PortfolioTips;
}

export default function Tips({ item }: TipsProps) {
  const [tips, setTips] = useState<string[]>([]);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  useEffect(() => {
    // JSON 데이터에서 `portfolioTips` 추출
    const { portfolioTips } = portfolioTipsData as PortfolioTipsWrapper;

    if (portfolioTips[item]) {
      setTips(portfolioTips[item]); // 해당 카테고리의 팁만 저장
    } else {
      console.error(`카테고리 ${item}에 대한 팁을 찾을 수 없습니다.`);
    }
  }, [item]);

  useEffect(() => {
    // 팁을 2초마다 변경
    const interval = setInterval(() => {
      setCurrentTipIndex((prevIndex) => (tips.length > 0 ? (prevIndex + 1) % tips.length : 0));
    }, 2000);

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 제거
  }, [tips]);

  return (
    <div>
      <div className="custom-shadow absolute right-[-220px] top-[90px] flex flex-col items-center max-w-[200px] bg-white-0 text-gray-1 text-[14px] py-[16px] px-[25px] rounded-[10px]">
        <Image src="/mascot.png" alt="마스코트" width={70} height={63} className="mb-[17px]" />
        {tips.length > 0 ? (
          <motion.p
            key={currentTipIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="fade-in text-center"
          >
            {tips[currentTipIndex]}
          </motion.p>
        ) : (
          <p>팁을 불러오는 중...</p>
        )}
      </div>
    </div>
  );
}
