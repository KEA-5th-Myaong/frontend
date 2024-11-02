'use client';

import { useState } from 'react';
import Icons from '@/app/_components/ui/Icon';
import { ArrowIcon, PlusIcon, TriangleIcon, XIcon } from '@/app/_components/ui/iconPath';

export default function Tutorial() {
  const [num, setNum] = useState(1);
  return (
    <div className="fixed inset-0 flex-center bg-black-3 bg-opacity-25 z-50">
      {/* 왼쪽에 그거 */}
      <div className="hidden md:block mt-24 mr-4 md:max-w-[253px] md:w-full self-stretch max-h-fit border-2 border-gray-5 pt-[29px] pb-[22px] px-5 md:px-2 lg:px-5 rounded-2xl font-semibold">
        <div className="flex justify-between w-full">
          <p className="pl-[13px] mb-0 md:mb-5">면접 기록</p>
          <Icons name={TriangleIcon} className="mt-1.5 block md:hidden" />
        </div>

        <div className="md:flex flex-col gap-1 mb-14">
          <div className="text-start rounded-lg pl-[13px] pr-2 py-[7px] flex items-center justify-between">
            <span className="overflow-hidden text-ellipsis whitespace-nowrap flex-grow">카카오 엔터프라이즈</span>
            <Icons name={XIcon} className="flex-shrink-0 ml-2" />
          </div>
        </div>

        <div className="flex md:flex items-center gap-2 pl-[13px]">
          <Icons name={PlusIcon} className="mb-1" />
          면접 생성
        </div>
      </div>
      {/* 여까지 */}

      <section className="relative bg-[#CBCBCE] flex flex-col pb-8 pt-6 sm:pt-3.5 interview-container px-4 min-w-[360px] z-50">
        <p className="font-semibold self-start">모의 면접</p>
        <div className="flex flex-col self-stretch pt-2 w-full pb-8">
          <p className="text-sm">선택 기업</p>

          <div className="flex gap-3 justify-between pt-3 whitespace-nowrap">
            <div className="relative w-full max-w-64 py-4 px-4 sm:px-5 bg-gray-4 font-bold rounded-[28px] z-30 bg-opacity-25 ">
              위볼린
            </div>
            <div className="py-4 px-7 lg:px-9 rounded-[28px] primary-1-btn bg-opacity-25 ">포스트 작성</div>
          </div>
        </div>

        {/* 여기부터 채팅창 */}
        <div className="flex flex-col w-full relative min-w-[360px] max-w-[735px] px-4 border-t border-gray-2">
          <div className="fixed left-12 bottom-12 z-30">
            <div className="py-4  px-6 rounded-[28px] primary-1-btn mt-2 md:block hidden bg-opacity-25">
              AI 표정 분석
            </div>
          </div>
          <div className="flex flex-col gap-7">
            {/* 면접관 질문 */}
            <div className="flex flex-col items-start">
              <p className="font-semibold pb-3 mt-4">면접관</p>

              <div className="flex gap-3 max-w-[90%] sm:max-w-[80%]">
                <div className="break-words chat-msg-text bg-gray-4 bg-opacity-25 ">
                  Q. 위볼린이 속한 산업에서의 최신 기술 트렌드를 어떻게 따라가고 계신가요?
                </div>
              </div>
            </div>

            {/* 내 답변 */}
            <div className="flex flex-col items-end">
              <div className="flex gap-3 max-w-[90%] sm:max-w-[80%]">
                <div className="break-words chat-msg-text bg-primary-0 bg-opacity-25 ">
                  저는 위볼린이 속한 산업에서 최신 기술 트렌드를 파악하기 위해 여러 가지 방법을 활용하고 있습니다. 첫째,
                  관련 분야의 최신 논문이나 기술 블로그를 정기적으로 구독하고 읽습니다. 특히 위볼린이 속한 산업에서
                  중요한 역할을 하는 AI, 클라우드 기술, 또는 데이터 분석 관련 기술 트렌드에 주목하고 있습니다. 둘째,
                  기술 컨퍼런스나 세미나에 참여하여 실시간으로 변하는 기술적 흐름을 파악하려고 노력하고 있습니다.
                </div>
              </div>

              {/* 질문 버튼들 */}
              <div className="flex items-center gap-4 pt-4">
                <div className="chat-msg-btn bg-opacity-25 flex md:hidden">
                  AI 표정 분석 <Icons className="rotate-180 border rounded-full" name={ArrowIcon} />
                </div>
                <div className="chat-msg-btn bg-opacity-25 ">
                  꼬리 질문 받기 <Icons className="rotate-180 border rounded-full" name={ArrowIcon} />
                </div>
                <div className="chat-msg-btn bg-opacity-25 ">
                  새 질문 생성 <Icons className="rotate-180 border rounded-full" name={ArrowIcon} />
                </div>
              </div>
            </div>

            {/* 채팅입력 */}
            <div className="flex items-center py-2 w-full border border-primary-1 rounded-xl mt-auto bg-white-0 bg-opacity-25 ">
              <textarea
                className="flex-grow pl-5 md:pl-8 pr-2 py-2 focus:outline-none rounded-xl resize-none bg-gray-2 bg-opacity-25 "
                placeholder="답변을 입력해주세요"
              />
              <div className="pr-2 sm:pr-3 md:pr-4 cursor-pointer">
                <Icons className="rotate-180 border rounded-full" name={ArrowIcon} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
