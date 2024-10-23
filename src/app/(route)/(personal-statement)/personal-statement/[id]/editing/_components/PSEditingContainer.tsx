'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import BackButton from '../../../../../../_components/BackButton';
import Modal, { initailModalState } from '../../../../../../_components/Modal';
import PSHeader from '../../../../_components/PSHeader';
import PSEditingBox from './PSEditingBox';
import { fetchPSEditing } from '@/app/(route)/(personal-statement)/_services/psServices';
import useCustomQuery from '@/app/_hooks/useCustomQuery';

interface PSEditingProps {
  reason: string;
  position: string;
  content: string;
  title: string;
}

export default function PSEditingContainer() {
  const router = useRouter();
  const params = useParams();

  const [modalState, setModalState] = useState(initailModalState);

  const [edState, setEdtate] = useState<PSEditingProps>({
    content: '',
    position: '',
    reason: '',
    title: '',
  });

  const getPostId = (param: string | string[]): string => {
    if (Array.isArray(param)) {
      return param[0];
    }
    return param;
  };
  const postId = decodeURI(getPostId(params.id));
  const { data: edData } = useCustomQuery(['ed', postId], () => fetchPSEditing(postId));

  useEffect(() => {
    console.log(edData?.data);
    setEdtate(edData?.data);
  }, [edData]);

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
              router.push('/blog/khj0930/write');
            }}
          />
          {/* 메인 컨텐츠 */}
          <div className="flex flex-col sm:flex-row gap-5 w-full">
            <PSEditingBox
              label="작성한 자기소개서"
              content="저는 웹 개발에 대한 열정과 사용자 경험을 향상시키는 데 기여하고 싶은 목표로 프론트엔드 개발자로서 커리어를 쌓아왔습니다. 웹사이트가 단순한 정보 전달을 넘어서 사용자와 소통하고, 브랜드 가치를 전달하는 중요한 매체로 자리잡는 과정에서 프론트엔드 개발자의 역할이 매우 중요하다는 것을 깨달았습니다. 그동안 React, Vue.js와 같은 프레임워크를 사용하며 인터랙티브하고 반응형 웹사이트를 구축하면서 사용자 경험을 극대화할 수 있다는 사실에 매료되었습니다. 귀사의 프로젝트가 사용자의 필요와 트렌드를 반영하며, 혁신적인 기술을 통해 더 나은 웹 경험을 제공하려는 비전을 보았고, 이에 함께 기여하고 싶어 지원하게 되었습니다."
            />

            <PSEditingBox label="AI 첨삭 자기소개서" content={edState.content} isEditing />
          </div>
          {/* 안내문구 */}
          <div className="flex gap-4 items-center w-full text-[10px] sm:text-base mt-4 px-11 py-5 bg-[#F3F3F3] text-gray-0">
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
        <div className="flex flex-col gap-3 mt-44">
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
