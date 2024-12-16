'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import BackButton from '../../../../../../_components/BackButton';
import Modal, { initailModalState } from '../../../../../../_components/Modal';
import PSHeader from '../../../../_components/PSHeader';
import PSEditingBox from './PSEditingBox';
import { fetchPSEditing } from '@/app/(route)/(personal-statement)/_services/psServices';
import useCustomQuery from '@/app/_hooks/useCustomQuery';
import useMe from '@/app/_hooks/useMe';
import { usePersonalStatementStore } from '@/app/(route)/(personal-statement)/_store/psStore';
import { PSEditingProps } from '@/app/(route)/(personal-statement)/_types/ps';

export default function PSEditingContainer() {
  const { data: userData } = useMe();
  const router = useRouter();
  const [modalState, setModalState] = useState(initailModalState);

  const [edState, setEdtate] = useState<PSEditingProps>({
    psId: 0,
    originalContent: '',
    highlightedContent: '',
  });

  const postId = usePersonalStatementStore((state) => state.psId);

  const { data: edData } = useCustomQuery(['ed', postId], () => fetchPSEditing(postId as unknown as string));

  useEffect(() => {
    setEdtate(edData?.data);
  }, [edData?.data]);

  const handleBackClick = () => {
    setModalState((prev) => ({
      ...prev,
      open: true,
      hasSubBtn: true,
      topText: '포스트를 생성하지 않으면 다시 첨삭 내용을 볼 수 없습니다.',
      subText: '정말 페이지를 나가시겠습니까?',
      subBtnText: '취소',
      btnText: '확인',
      onSubBtnClick: () => setModalState(initailModalState),
      onBtnClick: () => router.back(),
    }));
  };
  return (
    <>
      <BackButton onBtnClick={handleBackClick} className="self-start pb-4" />
      {edState ? (
        <div className="flex-col w-full h-full">
          <PSHeader
            title=""
            mode="editing"
            onButtonClick={() => {
              router.push(`/blog/${userData?.data.username}/write`);
            }}
          />
          {/* 메인 컨텐츠 */}
          <div className="flex flex-col sm:flex-row gap-5 w-full">
            <PSEditingBox label="작성한 자기소개서" content={edData?.data.originalContent} />
            <PSEditingBox label="AI 첨삭 자기소개서" content={edData?.data.highlightedContent} isEditing />
          </div>
          {/* 안내문구 */}
          <div className="flex gap-4 items-center w-full text-[10px] sm:text-base mt-4 px-11 py-5 bg-[#F3F3F3] dark:bg-black-4 text-gray-0 dark:text-white-0">
            <p id="임시" className="h-4 text-xs text-white-0 bg-gray-0 rounded-full px-1.5">
              !
            </p>
            <div>
              <p>
                첨삭 내용을 다시 확인하려면 포스트를 반드시 생성해야 합니다. 포스트를 생성하지 않으면 첨삭 내용을 다시
                볼 수 없습니다.
              </p>
              <p className="hidden md:block">
                추상적인 설명보다는 구체적인 경험이나 성과를 통해 자신을 어필하세요. 이를 통해 신뢰성과 설득력을 높일 수
                있습니다.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-center flex-col gap-3 mt-44">
          <Image className="animate-bounce" src="/mascot.png" alt="마스코트" width={204} height={193} />
          <p className="text-gray-0">불러오는 중 입니다</p>
        </div>
      )}
      {modalState.open && (
        <Modal
          hasSubBtn={modalState.hasSubBtn}
          topText={modalState.topText}
          subText={modalState.subText}
          subBtnText={modalState.subBtnText}
          btnText={modalState.btnText}
          onSubBtnClick={modalState.onSubBtnClick}
          onBtnClick={modalState.onBtnClick}
        />
      )}
    </>
  );
}
