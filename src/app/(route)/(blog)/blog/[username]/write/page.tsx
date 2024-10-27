'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import BackButton from '../../../../../_components/BackButton';
import { postPost } from '../_services/blogService';
import Modal, { initailModalState } from '@/app/_components/Modal';
import usePostWriteStore from '@/app/_store/postWirte';

export interface PostWriteProps {
  title: string;
  content: string;
}

export default function PostWrite() {
  const router = useRouter();
  const postData = usePostWriteStore((state) => state.postData);
  const resetPostData = usePostWriteStore((state) => state.resetPostData);

  const { register, handleSubmit } = useForm<PostWriteProps>({
    defaultValues: {
      title: '',
      content: postData || '',
    },
  });
  const [modalState, setModalState] = useState(initailModalState);

  useEffect(() => {
    return () => {
      resetPostData();
    };
  }, [resetPostData]);

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

  const onSubmit = async (data: PostWriteProps) => {
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
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <BackButton onBtnClick={handleBackBtnClick} className="flex w-full pt-12 px-5 mb-2" />

        <div className="flex-col w-full py-3 px-2.5">
          <p className="py-1">포스트 작성</p>

          <input
            type="text"
            {...register('title', {
              required: '제목은 필수입니다.',
            })}
            placeholder="제목을 입력해주세요"
            className="text-3xl font-semibold outline-none w-full my-3"
          />
        </div>

        <textarea
          {...register('content', { required: '내용은 필수입니다.' })}
          className="p-4 w-full min-w-[344px] max-w-[1000px] h-[438px] resize-none outline-none border-2 border-gray-5"
        />

        <div className="flex justify-end w-full pt-16">
          <button type="submit" className="py-[18px] px-6 rounded-[28px] primary-1-btn">
            작성 완료
          </button>
        </div>
      </form>

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
