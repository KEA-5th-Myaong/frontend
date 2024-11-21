'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import DOMPurify from 'dompurify'; // 추후에 수정
import { useParams, useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import Icons from '../../../../../../_components/ui/Icon';
import { CommentIcon, FavorIcon, MoreIcon } from '../../../../../../_components/ui/iconPath';
import MoreOptions from '../../../../../../_components/MoreOptions';
import useClickOutside from '../../../../../../_hooks/useClickOutside';
import PostComment from './_comment/PostComment';
import { formatDate } from '@/app/_utils/formatDate';
import defaultProfilePic from '../../../../../../../../public/mascot.png';
import useCustomQuery from '@/app/_hooks/useCustomQuery';
import { deletePost, fetchPostPostId, fetchURLPost } from '../../_services/blogService';
import usePostWriteStore from '@/app/_store/postWirte';
import Modal, { initailModalState } from '@/app/_components/Modal';

export default function PostContent() {
  const router = useRouter();
  const params = useParams();
  const { username, postTitle } = params;

  const queryClient = useQueryClient();
  const setTitle = usePostWriteStore((state) => state.setPostTitle);
  const setPost = usePostWriteStore((state) => state.setPostData);
  const [modalState, setModalState] = useState(initailModalState);

  const { data: postURLData } = useCustomQuery(['url-post'], () =>
    fetchURLPost(username as string, postTitle as string),
  );
  const postId = postURLData?.postId;

  const { data } = useCustomQuery(['user-post', postId], () => fetchPostPostId(postId as string));

  const [showDropDown, setShowDropDown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside({
    ref: dropdownRef,
    callback: () => setShowDropDown(false),
  });

  // 포스트 수정, 의존성이 변경되지 않는 한 함수가 재생성되지 않음
  const handleEditClick = useCallback(() => {
    router.push(`/blog/${username}/write?edit=true&postId=${postId}`);
    setTitle(data?.data.title);
    setPost(data?.data.content);
  }, [username, postId, data?.data.title, setTitle, data?.data.content, setPost, router]);

  // 포스트 삭제, 자식 컴포넌트의 불필요한 리렌더링 방지
  const handleDeletePost = useCallback(
    async (id: string) => {
      try {
        await deletePost(id as string);
        await queryClient.invalidateQueries({ queryKey: ['user-post', postId] });
      } catch (error) {
        console.error('포스트 삭제 실패:', error);
      } finally {
        setModalState(initailModalState); // 모달 닫기
        router.push(`/blog/${username}`);
      }
    },
    [postId, queryClient, router, username],
  );

  // 삭제 버튼 누르면 나오는 모달
  const handleDeleteClick = useCallback(() => {
    setModalState((prev) => ({
      ...prev,
      open: true,
      hasSubBtn: true,
      topText: '해당 포스트를 삭제하시겠습니까?',
      subBtnText: '취소',
      btnText: '삭제',
      onSubBtnClick: () => setModalState(initailModalState),
      onBtnClick: () => handleDeletePost(postId as string),
    }));
  }, [handleDeletePost, postId]);

  // 컨텐츠 sanitize 메모이제이션
  const sanitizedContent = useMemo(
    () => ({ __html: DOMPurify.sanitize(data?.data.content || '') }),
    [data?.data.content],
  );
  return (
    <>
      {/* 제목과 더보기 아이콘 */}
      <div className="flex justify-between items-center">
        <span className="text-[22px] font-semibold">{data?.data.title}</span>
        <div className="relative" ref={dropdownRef}>
          <Icons
            onClick={() => {
              setShowDropDown((prev) => !prev);
            }}
            className="cursor-pointer"
            name={MoreIcon}
          />

          {showDropDown && <MoreOptions handleEditClick={handleEditClick} handleDeleteClick={handleDeleteClick} />}
        </div>
      </div>

      {/* 작성자 프로필 */}
      <div className="flex items-center justify-between self-stretch mt-[7px] py-[22px] border-b border-gray">
        <div className="flex items-center gap-2.5">
          <div id="profile" className="" />
          <Image
            className="min-w-[29px] min-h-[29px] rounded-full"
            src={data?.data.profilePicUrl || defaultProfilePic.src}
            alt="프로필사진"
            width={29}
            height={29}
            unoptimized
          />
          <span>{data?.data.nickname}</span>
        </div>
        <div className="ml-[62px] max-w-fit text-xs bg-primary-0 bg-opacity-25 text-primary-2 px-[9.5px] py-1 rounded-md whitespace-nowrap">
          프론트엔드 개발자
        </div>
      </div>

      {/* 포스트 내용 */}
      <div className="mt-[19px] px-[7px]" dangerouslySetInnerHTML={sanitizedContent} />

      {/* 작성일 댓글 좋아요 */}
      <div className="flex items-center justify-between mt-20 pb-10 border-b">
        <span className="text-sm text-gray-0">{formatDate(data?.data.timestamp)}</span>
        <div className="flex gap-3">
          <div className="text-primary-1 bg-[#252530] rounded-[100px] border border-[#353542] blog-favor-frame">
            <Icons name={CommentIcon} />
            <p className="text-sm">{data?.data.commentCount}</p>
          </div>
          <div className="text-gray-1 bg-[#252530] rounded-[100px] border border-[#353542] blog-favor-frame">
            <Icons name={FavorIcon} />
            <span className="text-sm">{data?.data.likeCount}</span>
          </div>
        </div>
      </div>

      {/* 댓글 */}
      <PostComment comments={data?.data.comments} />

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
    </>
  );
}
