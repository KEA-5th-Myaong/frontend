'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { modalMotion } from '@/app/_components/Modal';
import Overlay from '@/app/_components/Overlay';
import { fetchPSList } from '@/app/(route)/(personal-statement)/_services/psServices';
import useCustomQuery from '@/app/_hooks/useCustomQuery';
import { PSListBoxProps } from '@/app/(route)/(personal-statement)/personal-statement/[username]/list/_types/psList';
import Image from 'next/image';

interface LoadPSModalProps {
  onOverlayClick?: () => void;
}

export default function LoadPSModal({ onOverlayClick }: LoadPSModalProps) {
  const handleOverlayClick = () => {
    if (onOverlayClick) {
      onOverlayClick();
    }
  };

  // 자기소개서 목록 불러오기
  const [personalStatement, setPersonalStatement] = useState<PSListBoxProps[]>([]);
  const { data: psListData } = useCustomQuery(['psList'], () => fetchPSList());

  return (
    <Overlay onClick={handleOverlayClick}>
      <motion.div
        onClick={(e) => e.stopPropagation()} // 클릭 이벤트가 Overlay까지 전달되지 않도록
        {...modalMotion}
        className="flex m-4 min-w-[300px]  max-w-[1000px] hide-scrollbar overflow-y-scroll w-full pb-6 px-[65px] pt-[58px] flex-col items-start gap-6 rounded-2xl bg-white-0 shadow-md"
      >
        <h1 className="pre-2xl-semibold">자기소개서 불러오기</h1>
        {personalStatement.length === 0 ? (
          <>
            <div className="flex flex-col gap-3 mt-10 ml-[350px]">
              <Image className="animate-bounce" src="/mascot.png" alt="마스코트" width={204} height={193} />
              <p className="text-gray-0">자기소개서를 작성해보세요</p>
            </div>
            {/* <Link href={`personal-statement/{id}/create`}> <- 작성 화면으로 이동 추가*/}
            <button
              type="button"
              className=" ml-[370px] flex items-center h-[50px] py-[13px] gap-2.5 md:py-[19px] px-5 md:px-7 rounded-[30px] primary-1-btn hover-animation"
            >
              작성하러 가기
            </button>
            {/* </Link> */}
          </>
        ) : (
          personalStatement.map((ps) => (
            <section className="flex justify-between px-6 pb-4 pt-6 sm:px-8 sm:pb-4 sm:pt-10 border border-gray-2 rounded-lg bg-white-0 cursor-pointer">
              <div>
                <div className="flex items-center gap-4">
                  <p className="font-semibold text-lg sm:text-xl line-clamp-2">{ps.title}</p>
                  <div className="hidden sm:block bg-primary-1 rounded-md px-5 py-1 text-[11px] text-white-0">
                    지원직무 : {ps.position}
                  </div>
                </div>

                <p className="mr-5 text-gray-0 text-sm line-clamp-5 mt-3">{ps.content}</p>
                <p className="text-gray-0 text-xs sm:text-sm pt-4">{ps.timestamp} 등록</p>
              </div>
              <button
                type="button"
                className="mt-9 flex items-center h-[50px] py-[13px] gap-2.5 md:py-[19px] px-5 md:px-7 rounded-[30px] primary-1-btn hover-animation"
              >
                불러오기
              </button>
            </section>
          ))
        )}
      </motion.div>
    </Overlay>
  );
}
