'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Icons from '@/app/_components/ui/Icon';
import { ArrowIcon, PlayIcon, PlusIcon, RefreshIcon, TriangleIcon, XIcon } from '@/app/_components/ui/iconPath';
import Tooltip from './_components/ToolTip';

export default function Tutorial() {
  const router = useRouter();
  const params = useParams();
  const { username } = params;
  const selectedCorp = params.corp as string;
  const corp = decodeURI(selectedCorp); // 기업명은 url에서 가져옴

  const [num, setNum] = useState(1); // 모여줄 툴팁, 7되면 링크 이동

  const handleClick = async () => {
    setNum((prev) => prev + 1);
    // setState는 비동기적으로 작동해서 num이 6일 때 체크해야 실제로 7이 되었을 때 라우팅이 발생
    if (num === 6) {
      router.replace(`/interview/${username}/${corp}/chat`);
    }
  };
  return (
    <div
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
      tabIndex={-1}
      onClick={handleClick}
      className="fixed inset-0 flex-center bg-black-3 bg-opacity-25 z-50"
    >
      {/* 면접 기록 */}
      <div className="hidden md:block mt-24 mr-4 md:max-w-[253px] md:w-full self-stretch max-h-fit border-2 border-gray-3 border-opacity-25 pt-[29px] pb-[22px] px-5 md:px-2 lg:px-5 rounded-2xl font-semibold">
        <div className="flex justify-between w-full">
          <p className="pl-[13px] mb-0 md:mb-5">면접 기록</p>
          <Icons name={TriangleIcon} className="mt-1.5 block md:hidden" />
        </div>

        <div className="md:flex flex-col gap-1 mb-14">
          <div className="interview-history">
            <p className="interview-history-text">위볼린</p>
            <Icons name={XIcon} className="flex-shrink-0 ml-2" />
          </div>
          <div className="interview-history">
            <p className="interview-history-text text-gray-0">카카오 엔터프라이즈</p>
            <Icons name={XIcon} className="flex-shrink-0 ml-2" />
          </div>
        </div>
        <div className="flex md:flex items-center gap-2 pl-[13px] opacity-50">
          <Icons name={PlusIcon} className="mb-1" />
          면접 생성
        </div>
      </div>
      {/* 본문 */}
      <section className="relative bg-[#CBCBCE] flex flex-col pb-8 pt-6 sm:pt-3.5 interview-container px-4 min-w-[360px] z-50">
        <p className="font-semibold self-start">모의 면접</p>
        <div className="flex flex-col self-stretch pt-2 w-full pb-8">
          <p className="text-sm">선택 기업</p>
          <div className="flex gap-3 justify-between pt-3 whitespace-nowrap">
            <div className="relative w-full max-w-64 py-4 px-4 sm:px-5 bg-gray-4 font-bold rounded-[28px] bg-opacity-25">
              위볼린
            </div>
            <div className={`relative py-4 px-7 lg:px-9 rounded-[28px] primary-1-btn ${num !== 3 && 'bg-opacity-25'}`}>
              {num === 3 && (
                <Tooltip msg1="면접 내용을 바탕으로" msg2="포스트 작성이 가능해요" className="right-40 bottom-0" />
              )}
              포스트 작성
            </div>
          </div>
        </div>
        {/* 여기부터 채팅창 */}
        <div className="flex flex-col w-full relative min-w-[360px] max-w-[735px] px-4 border-t border-gray-2">
          {/* 비디오 튜토리얼 */}
          {(num === 5 || num === 6) && (
            <div className="fixed md:left-12 md:bottom-12 min-w-[360px] z-10">
              <div className="relative bg-white-0 px-10 rounded-xl max-w-[460px] border border-gray-5 pt-5 pb-11">
                <div className="w-full flex justify-between pb-[14px] border-b border-gray-5">
                  <p className="font-semibold">면접 연습하기</p>
                  <div className="flex items-center border border-primary-3 py-1 px-4 rounded-[28px]">
                    <Icons name={PlayIcon} />
                    녹화 시작
                  </div>
                </div>

                <Image width={360} height={208} src="/assets/videoImage.png" alt="표정분석사람 이미지" />
                <div className="w-full flex justify-between mt-5 ">
                  <p className="font-semibold">AI 표정 분석 결과</p>
                  <div className="flex items-center border border-primary-3 py-1 px-4 rounded-[28px]">
                    <Icons name={RefreshIcon} />
                    다시 보기
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="w-12 h-12 flex-shrink-0">
                    <Image className="w-full h-full" width={33} height={33} src="/mascot.png" alt="이미지" />
                  </div>
                  <div className="mt-3 font-medium text-[11px] bg-[#F5F5F5] rounded-[20px] py-4 px-8">
                    <p>
                      면접 초반의 간단한 질문에 대해 미소와 안정적인 표정을 유지하며 긍정적인 태도가 잘 나타났습니다.
                      이는 지원자의 자신감과 호감도를 높이는 데 도움이 됩니다.
                    </p>
                    <p className="hidden md:block">
                      어려웠던 경험을 설명해 주세요 질문에 대한 답변 도중, 순간적으로 긴장도가 높아지며 눈 깜박임 빈도와
                      입술을 다무는 행동이 관찰되었습니다. 이와 같은 표정은 불안감이나 스트레스를 드러낼 수 있습니다.
                    </p>
                  </div>
                </div>
              </div>
              {num === 5 && (
                <Tooltip
                  msg1="면접 영상을 녹화해"
                  msg2="다시 볼 수 있어요"
                  className="right-0 bottom-[480px] md:bottom-[540px]"
                />
              )}
              {num === 6 && (
                <Tooltip
                  msg1="AI 표정 분석 결과도"
                  msg2="확인 가능해요!"
                  className="right-8 md:-right-36 bottom-7 md:bottom-20"
                />
              )}
            </div>
          )}

          <div className="fixed left-12 bottom-12">
            <div
              className={`py-4  px-6 rounded-[28px] primary-1-btn mt-2 md:block hidden ${num !== 4 && 'bg-opacity-25'}`}
            >
              {num === 4 && (
                <Tooltip
                  msg1="입력한 답변을 말해보며"
                  msg2="AI로 표정 분석을 받을 수 있어요"
                  className="left-0 bottom-16"
                />
              )}
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
                <div className="break-words chat-msg-text bg-primary-0 bg-opacity-25">
                  저는 위볼린이 속한 산업에서 최신 기술 트렌드를 파악하기 위해 여러 가지 방법을 활용하고 있습니다. 첫째,
                  관련 분야의 최신 논문이나 기술 블로그를 정기적으로 구독하고 읽습니다. 특히 위볼린이 속한 산업에서
                  중요한 역할을 하는 AI, 클라우드 기술, 또는 데이터 분석 관련 기술 트렌드에 주목하고 있습니다. 둘째,
                  기술 컨퍼런스나 세미나에 참여하여 실시간으로 변하는 기술적 흐름을 파악하려고 노력하고 있습니다.
                </div>
              </div>

              {/* 질문 버튼들 */}
              <div className="flex items-center gap-4 pt-4">
                <div className={`chat-msg-btn flex md:hidden relative ${num !== 4 && 'bg-opacity-25'}`}>
                  {num === 4 && <Tooltip msg1="입력한 답변을 말해보며" msg2="AI로 표정 분석을 받을 수 있어요" />}
                  AI 표정 분석 <Icons className="tail-new-facial-icon" name={ArrowIcon} />
                </div>
                <div className={`chat-msg-btn ${num !== 1 && 'bg-opacity-25'} relative`}>
                  {num === 1 && <Tooltip msg1="답변에 대한" msg2="꼬리 질문을 받을 수 있어요" />}
                  꼬리 질문 받기 <Icons className="tail-new-facial-icon" name={ArrowIcon} />
                </div>
                <div className={`chat-msg-btn relative ${num !== 2 && 'bg-opacity-25'}`}>
                  {num === 2 && <Tooltip msg1="새로운 질문 생성도" msg2="가능해요" />}
                  새 질문 생성 <Icons className="tail-new-facial-icon" name={ArrowIcon} />
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
