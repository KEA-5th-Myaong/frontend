import { useRef, useState } from 'react';
import Overlay from '@/app/_components/Overlay';

export default function TutorialBox({ onBtnClick }: { onBtnClick: () => void }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesRef = useRef(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev !== 3 ? prev + 1 : prev));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev !== 0 ? prev - 1 : prev));
  };
  return (
    <Overlay onClick={() => {}}>
      <div
        className="w-full min-w-[360px] max-w-full sm:max-w-[75%] md:max-w-[55%] 
      bg-white-0 px-8 py-6 mx-4 rounded-[28px] whitespace-nowrap shadow-xl"
      >
        <p className="text-3xl font-bold mb-6">모의 면접은 이렇게 진행돼요</p>

        <div className="flex flex-col overflow-hidden">
          <div className="flex items-center relative">
            <button
              type="button"
              className="absolute left-0 bottom-0 h-[400px] min-w-5 bg-gray-0 opacity-20 z-10"
              onClick={prevSlide}
            >
              <p className="font-extrabold">&lt;</p>
            </button>
            <div
              ref={slidesRef}
              className="flex items-center transition-transform duration-1000 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              <div className="w-full flex-shrink-0">
                <div className="text-2xl font-semibold mb-4 bg-white-0 z-20">모의 면접관의 질문 확인하고 답변하기</div>
                <div id="모의면접하는 이미지" className="w-full h-[400px] max-w-1/3 bg-white-1" />
              </div>

              <div className="w-full flex-shrink-0">
                <p className="text-2xl font-semibold mb-4">표정 분석 어쩌구</p>
                <div id="표정 분석하는 이미지" className="w-full h-[400px] max-w-1/3 bg-red-200" />
              </div>

              <div className="w-full flex-shrink-0">
                <p className="text-2xl font-semibold mb-4">새 질문 혹은 꼬리 질문 생성하기</p>
                <div id="새 질문 꼬리 질문 이미지" className="w-full h-[400px] max-w-1/3 bg-blue-200" />
              </div>

              <div className="w-full flex-shrink-0">
                <p className="text-2xl font-semibold mb-4">포스트 작성하러가기</p>
                <div id="포스트 작성하는 이미지" className="w-full h-[400px] max-w-1/3 bg-green-200" />
              </div>
            </div>
            <button
              type="button"
              className="absolute right-0 bottom-0 h-[400px] min-w-5 bg-gray-0 opacity-20 z-10"
              onClick={nextSlide}
            >
              &gt;
            </button>
          </div>
          {currentSlide === 3 && (
            <button
              type="button"
              className="mx-auto w-fit px-4 py-2 mt-3 hover:bg-primary-2 primary-1-btn"
              onClick={onBtnClick}
            >
              시작하기
            </button>
          )}
        </div>
      </div>
    </Overlay>
  );
}
