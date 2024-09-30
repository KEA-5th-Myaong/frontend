'use client';

import { useState } from 'react';
import { IconPathTypes } from '../../_types/icon';

interface IconsProps {
  name: IconPathTypes;
  hoverFill?: string;
  className?: string;
  onClick?: () => void;
}

// Icons 컴포넌트 정의
export default function Icons({ name, className, hoverFill, onClick }: IconsProps) {
  const [isHovered, setIsHovered] = useState(false);

  // name prop에서 필요한 속성들을 구조 분해 할당
  const { width, height, fill, path, options } = name;

  // 마우스가 아이콘 위에 올라갔을 때 실행되는 함수
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // 마우스가 아이콘에서 벗어났을 때 실행되는 함수
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <svg
      width={width} // SVG의 너비
      height={height} // SVG의 높이
      viewBox={`0 0 ${width} ${height}`} // SVG의 뷰포트 설정
      onClick={onClick} // 클릭 이벤트 핸들러
      fill={isHovered ? hoverFill || fill : fill} // 호버 상태에 따른 채우기 색상
      className={className} // CSS 클래스
      onMouseEnter={handleMouseEnter} // 마우스 진입 이벤트 핸들러
      onMouseLeave={handleMouseLeave} // 마우스 이탈 이벤트 핸들러
    >
      {Array.isArray(path) ? path.map((p) => <path key={p} d={p} {...options} />) : <path d={path} {...options} />}
    </svg>
  );
}
