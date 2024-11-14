'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BackButton from '../../../../../_components/BackButton';
import { postPost } from '../_services/blogService';
import Modal, { initailModalState } from '@/app/_components/Modal';
import usePostWriteStore from '@/app/_store/postWirte';
import useChatWriteStore from '@/app/_store/chatWrite';
import ToastEditor from '@/app/_components/ToastEditor';
import '@toast-ui/editor/dist/toastui-editor.css';

export interface PostWriteProps {
  title: string;
  content: string;
}

export default function PostWrite() {
  const router = useRouter();
  const postData = usePostWriteStore((state) => state.postData);
  const resetPostData = usePostWriteStore((state) => state.resetPostData);
  const messages = useChatWriteStore((state) => state.messages);
  const resetMessages = useChatWriteStore((state) => state.resetMessages);

  const formattedMessages = messages.map((msg) => `${msg.isAI ? '면접관' : '나'}: ${msg.text}`).join('\n\n'); // 모의면접에서 왔을 때

  const [modalState, setModalState] = useState(initailModalState);

  useEffect(() => {
    return () => {
      resetMessages();
      resetPostData();
    };
  }, [resetPostData, resetMessages]);

  const handleEditorChange = (value: string) => {
    console.log(value);
  };

  const handleBackBtnClick = () => {
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
  };

  const handleSubmit = async (data: PostWriteProps) => {
    await postPost(data);

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
  };

  return (
    <section className="flex mx-auto flex-col w-full min-w-[360px] max-w-[1000px] pb-12 px-5 pt-14 md:pt-0">
      <div className="w-full">
        <BackButton onBtnClick={handleBackBtnClick} className="flex w-full pt-12 px-5 mb-2" />

        <div className="flex-col w-full py-3 px-2.5">
          <p className="py-1">포스트 작성</p>

          <input
            type="text"
            placeholder="제목을 입력해주세요"
            className="text-3xl font-semibold outline-none w-full my-3"
          />
        </div>

        <ToastEditor initialValue="123" onChange={handleEditorChange} />

        <div className="flex justify-end w-full pt-16">
          <button
            type="button"
            onClick={() => handleSubmit({ title: '제목', content: '내용' })}
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
