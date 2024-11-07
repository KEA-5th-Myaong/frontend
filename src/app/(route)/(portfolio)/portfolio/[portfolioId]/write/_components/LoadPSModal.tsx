'use client';

import { motion } from 'framer-motion';
import { modalMotion } from '@/app/_components/Modal';
import Overlay from '@/app/_components/Overlay';

interface LoadPSModalProps {
  onOverlayClick?: () => void;
}

export default function LoadPSModal({ onOverlayClick }: LoadPSModalProps) {
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
        className="flex m-4 min-w-[300px]  max-w-[1000px] h-[500px] hide-scrollbar overflow-y-scroll w-full pb-6 px-[65px] pt-[58px] flex-col items-start gap-6 rounded-2xl bg-white-0 shadow-md"
      >
        <h1 className="pre-2xl-semibold">자기소개서 불러오기</h1>
        <section className="flex justify-between px-6 pb-4 pt-6 sm:px-8 sm:pb-4 sm:pt-10 border border-gray-2 rounded-lg bg-white-0 cursor-pointer">
          <div>
            <div className="flex items-center gap-4">
              <p className="font-semibold text-lg sm:text-xl line-clamp-2">자기소개서 제목</p>
              <div className="hidden sm:block bg-primary-1 rounded-md px-5 py-1 text-[11px] text-white-0">
                지원직무 : 프론트엔드 개발자
              </div>
            </div>

            <p className="mr-5 text-gray-0 text-sm line-clamp-5 mt-3">
              안녕하세요. 저는 사용자 경험을 중요시하는 프론트엔드 개발자 곽서연입니다. 웹 개발에 대한 열정은 고등학교
              시절 아두이노 프로젝트를 진행하면서 생겼고, 이후 인공지능학과에 진학하면서 더 넓은 범위의 기술을 배우게
              되었습니다. 학부 3학년 때 웹 개발의 매력에 빠져, React와 Next.js 등의 최신 기술을 익히며, 다양한
              프로젝트를 통해 실력을 쌓았습니다.
            </p>
            <p className="text-gray-0 text-xs sm:text-sm pt-4">2024.03.02 등록</p>
          </div>
          <button
            type="button"
            className="mt-9 flex items-center h-[50px] py-[13px] gap-2.5 md:py-[19px] px-5 md:px-7 rounded-[30px] primary-1-btn hover-animation"
          >
            불러오기
          </button>
        </section>

        <section className="flex justify-between px-6 pb-4 pt-6 sm:px-8 sm:pb-4 sm:pt-10 border border-gray-2 rounded-lg bg-white-0 cursor-pointer">
          <div>
            <div className="flex items-center gap-4">
              <p className="font-semibold text-lg sm:text-xl line-clamp-2">자기소개서 제목</p>
              <div className="hidden sm:block bg-primary-1 rounded-md px-5 py-1 text-[11px] text-white-0">
                지원직무 : 프론트엔드 개발자
              </div>
            </div>

            <p className="mr-5 text-gray-0 text-sm line-clamp-5 mt-3">
              안녕하세요. 저는 사용자 경험을 중요시하는 프론트엔드 개발자 곽서연입니다. 웹 개발에 대한 열정은 고등학교
              시절 아두이노 프로젝트를 진행하면서 생겼고, 이후 인공지능학과에 진학하면서 더 넓은 범위의 기술을 배우게
              되었습니다. 학부 3학년 때 웹 개발의 매력에 빠져, React와 Next.js 등의 최신 기술을 익히며, 다양한
              프로젝트를 통해 실력을 쌓았습니다.
            </p>
            <p className="text-gray-0 text-xs sm:text-sm pt-4">2024.03.02 등록</p>
          </div>
          <button
            type="button"
            className="mt-9 flex items-center h-[50px] py-[13px] gap-2.5 md:py-[19px] px-5 md:px-7 rounded-[30px] primary-1-btn hover-animation"
          >
            불러오기
          </button>
        </section>

        <section className="flex justify-between px-6 pb-4 pt-6 sm:px-8 sm:pb-4 sm:pt-10 border border-gray-2 rounded-lg bg-white-0 cursor-pointer">
          <div>
            <div className="flex items-center gap-4">
              <p className="font-semibold text-lg sm:text-xl line-clamp-2">자기소개서 제목</p>
              <div className="hidden sm:block bg-primary-1 rounded-md px-5 py-1 text-[11px] text-white-0">
                지원직무 : 프론트엔드 개발자
              </div>
            </div>

            <p className="mr-5 text-gray-0 text-sm line-clamp-5 mt-3">
              안녕하세요. 저는 사용자 경험을 중요시하는 프론트엔드 개발자 곽서연입니다. 웹 개발에 대한 열정은 고등학교
              시절 아두이노 프로젝트를 진행하면서 생겼고, 이후 인공지능학과에 진학하면서 더 넓은 범위의 기술을 배우게
              되었습니다. 학부 3학년 때 웹 개발의 매력에 빠져, React와 Next.js 등의 최신 기술을 익히며, 다양한
              프로젝트를 통해 실력을 쌓았습니다.
            </p>
            <p className="text-gray-0 text-xs sm:text-sm pt-4">2024.03.02 등록</p>
          </div>
          <button
            type="button"
            className="mt-9 flex items-center h-[50px] py-[13px] gap-2.5 md:py-[19px] px-5 md:px-7 rounded-[30px] primary-1-btn hover-animation"
          >
            불러오기
          </button>
        </section>
      </motion.div>
    </Overlay>
  );
}
