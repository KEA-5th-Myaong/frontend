import { useEffect, RefObject } from 'react';

interface UseClickOutsideProps {
  ref: RefObject<HTMLElement>; // ref: DOM 요소에 대한 참조, HTMLElement의 하위 타입을 모두 허용
  callback: () => void; // callback: 외부 클릭 시 실행될 함수
}

export default function useClickOutside({ ref, callback }: UseClickOutsideProps): void {
  useEffect(() => {
    // MouseEvent 타입의 event 매개변수를 받음
    function handleClickOutside(event: MouseEvent): void {
      // ref.current(참조된 요소)가 존재하고
      // 클릭된 요소(event.target)가 참조된 요소의 자식이 아닌 경우
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }

    document.addEventListener('mousedown', handleClickOutside); // document에 mousedown 이벤트 리스너를 추가
    return () => {
      // 클린업 함수를 반환
      document.removeEventListener('mousedown', handleClickOutside); // document에서 mousedown 이벤트 리스너를 제거
    };
  }, [ref, callback]);
}
