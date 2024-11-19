import { useState, useEffect } from 'react';

interface UseWindowHeightParams {
  ratio?: number;
  defaultHeight?: string;
}

export default function useWindowHeight({ ratio = 0.55, defaultHeight = '400px' }: UseWindowHeightParams = {}) {
  const [height, setHeight] = useState(defaultHeight);

  useEffect(() => {
    const updateHeight = () => {
      const windowHeight = window.innerHeight;
      setHeight(`${windowHeight * ratio}px`);
    };

    updateHeight(); // 초기 높이 설정
    window.addEventListener('resize', updateHeight); // resize 이벤트 리스너 등록
    // cleanup 함수
    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, [ratio]);

  return height;
}
