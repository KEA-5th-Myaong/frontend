'use client';

import { useEffect, useState } from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useQueryClient } from '@tanstack/react-query';
import Icons from '../../../_components/ui/Icon';
import { PlusIcon, TriangleIcon, XIcon } from '../../../_components/ui/iconPath';
import useCustomQuery from '@/app/_hooks/useCustomQuery';
import { deleteInterview, fetchInterviewHistoryLists } from '../_services/interviewService';
import Modal, { initailModalState } from '@/app/_components/Modal';
import { useInterviewIdStore } from '../_store/interviewStore';

interface HistoryItem {
  interviewId: string;
  title: string;
}

export default function InterviewHistory() {
  const router = useRouter();
  const params = useParams();
  const { username } = params;
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const { setInterviewId } = useInterviewIdStore();

  const { data, isLoading } = useCustomQuery(['interview-history', username], () => fetchInterviewHistoryLists());

  // includes를 사용하지 않은 이유는, 사용자의 아이디에 chat이 들어갈 경우도 true를 반환해서
  const isChat = pathname.endsWith('/chat');

  const [historyLists, setHistoryLists] = useState<HistoryItem[]>([]);
  const [showMore, setShowMore] = useState(false);
  const [modalState, setModalState] = useState(initailModalState);

  useEffect(() => {
    if (data?.data) {
      setHistoryLists([...data.data].reverse().slice(0, 5)); // 역순으로 5개까지 출력
    }
  }, [data]);

  // 과거의 면접 선택
  const handleSelectHistory = (title: string, interviewId: string) => {
    setInterviewId(interviewId);
    router.replace(`/interview/${username}/history/${title}`);
  };

  // 면접 기록 삭제
  const handleDeleteHistory = async (interviewId: string) => {
    try {
      await deleteInterview(interviewId); // deleteInterview 완료를 기다림
      await queryClient.invalidateQueries({ queryKey: ['interview-history', username] });
    } catch (error) {
      console.error('면접 기록 삭제 실패:', error);
    } finally {
      setModalState(initailModalState); // 모달 닫기
      router.push(`/interview/${username}/select`);
    }
  };
  // 삭제 아이콘 누르면 모달 나오기
  const handleDeleteClick = (interviewId: string) => {
    setModalState((prev) => ({
      ...prev,
      open: true,
      hasSubBtn: true,
      topText: '해당 면접을 삭제하시겠습니까?',
      subBtnText: '취소',
      btnText: '삭제',
      onSubBtnClick: () => setModalState(initailModalState),
      onBtnClick: () => handleDeleteHistory(interviewId),
    }));
  };

  return (
    <section
      className={`bg-white-0 dark:bg-black-4 md:max-w-[253px] md:w-full self-stretch max-h-fit dark:border-black-6 border-2 
    ${!isChat && !showMore && 'mt-10 md:mt-0'} pt-[29px] pb-[22px] px-5 
    md:px-2 lg:px-5 rounded-2xl font-semibold z-10`}
    >
      <button
        type="button"
        onClick={() => {
          setShowMore((prev) => !prev);
        }}
        className="flex justify-between w-full"
      >
        <p className={`pl-[13px] ${showMore ? 'mb-5' : 'mb-0'} md:mb-5`}>면접 기록</p>
        <Icons name={TriangleIcon} className={`${showMore ? '' : 'rotate-180'} mt-1.5 block md:hidden`} />
      </button>

      <div className={`${showMore ? 'flex' : 'hidden'} md:flex flex-col mb-14`}>
        {isLoading ? (
          <p className="pl-[13px] font-medium">면접 기록 불러오는중...</p>
        ) : (
          historyLists?.map((item: HistoryItem) => (
            <div
              key={item.interviewId}
              className="bg-white-0 dark:bg-black-4 hover:bg-[#F3F3F3] dark:hover:bg-gray-3 dark:hover:text-black-0 cursor-pointer interview-history"
            >
              <div onClick={() => handleSelectHistory(item.title, item.interviewId)} className="interview-history-text">
                {item.title}
              </div>
              <div
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  handleDeleteClick(item.interviewId);
                }}
                className="pl-2 py-2"
              >
                <Icons name={XIcon} className="" />
              </div>
            </div>
          ))
        )}
      </div>

      <Link
        href={`/interview/${username}/select`}
        className={`${showMore ? 'flex' : 'hidden'} md:flex items-center gap-2 pl-[13px]`}
        replace
      >
        <Icons name={PlusIcon} className="mb-1" />
        면접 생성
      </Link>

      {modalState.open && (
        <Modal
          isWarn
          hasSubBtn={modalState.hasSubBtn}
          topText={modalState.topText}
          subBtnText={modalState.subBtnText}
          btnText={modalState.btnText}
          onSubBtnClick={modalState.onSubBtnClick}
          onBtnClick={modalState.onBtnClick}
        />
      )}
    </section>
  );
}
