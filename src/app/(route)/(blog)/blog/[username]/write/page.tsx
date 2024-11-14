'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import BackButton from '../../../../../_components/BackButton';
import { postPost } from '../_services/blogService';
import Modal, { initailModalState } from '@/app/_components/Modal';
import { PostWriteProps } from '../_types/blog';
import usePostWriteStore from '@/app/_store/postWirte';
import useChatWriteStore from '@/app/_store/chatWrite';
import '@toast-ui/editor/dist/toastui-editor.css'; // toast ui의 기본 스타일

// Next.js의 dynamic import를 사용하여 ToastEditor 컴포넌트를 동적으로 불러옴, 동적으로 불러올 컴포넌트의 경로를 지정
const ToastEditor = dynamic(() => import('../../../../../_components/ToastEditor'), {
  ssr: false, // 서버사이드 렌더링 비활성화
  loading: () => <div className="w-full h-60 bg-gray-200 rounded-md animate-pulse" />,
});

export default function PostWrite() {
  const router = useRouter();
  const postData = usePostWriteStore((state) => state.postData);
  const resetPostData = usePostWriteStore((state) => state.resetPostData);
  const messages = useChatWriteStore((state) => state.messages);
  const resetMessages = useChatWriteStore((state) => state.resetMessages);

  const formattedMessages = useMemo(
    () => messages.map((msg) => `${msg.isAI ? '면접관' : '나'}: ${msg.text}`).join('\n\n'),
    [messages],
  );

  const [title, setTitle] = useState(''); // 포스트 제목
  const [content, setContent] = useState(postData || formattedMessages || ' '); // 포스트 내용
  const [modalState, setModalState] = useState(initailModalState);

  useEffect(() => {
    return () => {
      resetMessages();
      resetPostData();
    };
  }, [resetPostData, resetMessages]);

  const handleBackBtnClick = useCallback(() => {
    setModalState((prev) => ({
      ...prev,
      open: true,
      hasSubBtn: true,
      topText: '진행중인 내용이 삭제됩니다.',
      subText: '정말 뒤로 가시겠습니까?',
      subBtnText: '취소',
      btnText: '이동',
      onSubBtnClick: () => setModalState(initailModalState),
      onBtnClick: () => {
        resetPostData();
        router.back();
      },
    }));
  }, [resetPostData, router]);

  const handleSubmit = useCallback(
    async (data: PostWriteProps) => {
      try {
        if (!data.title.trim() || !data.content.trim()) {
          setModalState((prev) => ({
            ...prev,
            open: true,
            topText: '제목과 내용을 모두 입력해주세요.',
            btnText: '확인',
            onBtnClick: () => setModalState(initailModalState),
          }));
          return;
        }

        await postPost(data); // api 호출
        // api 호출 후 나오는 모달
        setModalState((prev) => ({
          ...prev,
          open: true,
          topText: '포스트가 작성되었습니다.',
          btnText: '닫기',
          onBtnClick: () => {
            resetPostData();
            router.push('/main');
          },
        }));
      } catch (error) {
        setModalState((prev) => ({
          ...prev,
          open: true,
          topText: '포스트 작성 중 오류가 발생했습니다.',
          btnText: '확인',
          onBtnClick: () => setModalState(initailModalState),
        }));
      }
    },
    [resetPostData, router],
  );
  return (
    <section className="flex mx-auto flex-col w-full min-w-[360px] max-w-[1000px] pb-12 px-5 pt-14 md:pt-0">
      <div className="w-full">
        <BackButton onBtnClick={handleBackBtnClick} className="flex w-full pt-12 px-5 mb-2" />

        <div className="flex-col w-full py-3 px-2.5">
          <p className="py-1">포스트 작성</p>
          <input
            type="text"
            placeholder="제목을 입력해주세요"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            className="text-3xl font-semibold outline-none w-full my-3"
          />
        </div>

        <ToastEditor initialValue={content} onChange={(value: string) => setContent(value)} height="400px" />

        <div className="flex justify-end w-full pt-16">
          <button
            type="button"
            onClick={() => handleSubmit({ title, content })}
            className="py-[18px] px-6 rounded-[28px] primary-1-btn"
          >
            작성 완료
          </button>
        </div>
      </div>

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
    </section>
  );
}
