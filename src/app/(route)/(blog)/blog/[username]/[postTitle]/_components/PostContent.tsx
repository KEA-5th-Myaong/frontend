'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import DOMPurify from 'dompurify'; // 추후에 수정
import { useParams, useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import Icons from '../../../../../../_components/ui/Icon';
import { BookmarkIcon, CommentIcon, FavorIcon, MoreIcon, SirenIcon } from '../../../../../../_components/ui/iconPath';
import MoreOptions from '../../../../../../_components/MoreOptions';
import useClickOutside from '../../../../../../_hooks/useClickOutside';
import PostComment from './_comment/PostComment';
import { formatDate } from '@/app/_utils/formatDate';
import defaultProfilePic from '../../../../../../../../public/mascot.png';
import useCustomQuery from '@/app/_hooks/useCustomQuery';
import { deletePost, fetchMemberInfo, fetchURLPost } from '../../_services/blogService';
import usePostWriteStore from '@/app/_store/postWirte';
import Modal, { initailModalState } from '@/app/_components/Modal';
import useLoveAndBookmark from '@/app/_hooks/useLoveAndBookmark';
import { PostProps } from '@/app/(route)/(main-page)/main/_types/main-page';
import useMe from '@/app/_hooks/useMe';

export default function PostContent() {
  const router = useRouter();
  const params = useParams();
  const { username, postTitle } = params;
  const { data: userData } = useMe();

  const queryClient = useQueryClient();
  const setTitle = usePostWriteStore((state) => state.setPostTitle);
  const setPost = usePostWriteStore((state) => state.setPostData);
  const [modalState, setModalState] = useState(initailModalState);

  const { data: postURLData } = useCustomQuery(['url-post', postTitle], () =>
    fetchURLPost(username as string, postTitle as string),
  );

  const isMe = postURLData?.data.memberId === userData?.data.memberId; // 본인의 게시글인지 확인
  // 유저의 직군 표시하기 위해 블로그 주인장 데이터 가져옴
  const { data: blogUserNameData } = useCustomQuery(['blog-user', username], () =>
    fetchMemberInfo(postURLData?.data.memberId),
  );

  const [posts, setPosts] = useState<PostProps[]>([]); // 포스트 목록 상태
  useEffect(() => {
    if (postURLData && postURLData.success && postURLData.data && Array.isArray(postURLData.data.posts)) {
      setPosts(postURLData.data.posts);
    }
  }, [postURLData]);

  const postId = postURLData?.data.postId;

  const [showDropDown, setShowDropDown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside({
    ref: dropdownRef,
    callback: () => setShowDropDown(false),
  });

  const { loveMutation, bookmarkMutation } = useLoveAndBookmark(posts, setPosts, userData?.data.memberId, postId);
  const [isLiked, setIsLiked] = useState(postURLData?.data.liked); // 낙관적 업데이트를 위한 state

  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (postURLData?.data) {
      setIsLiked(postURLData.data.liked);

      setIsBookmarked(postURLData.data.bookmarked);
    }
  }, [postURLData?.data]);

  // 좋아요 클릭 핸들러
  const handleLikeClick = () => {
    if (!postId) return;
    // 낙관적 업데이트
    setIsLiked((prev: boolean) => !prev);

    loveMutation.mutate(postId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['url-post', postTitle] });
      },
      onError: () => {
        setIsLiked((prev: boolean) => !prev);
      },
    });
  };

  // bookmark 클릭 핸들러
  const handleBookmarkClick = () => {
    if (!postId) return;

    bookmarkMutation.mutate(postId, {
      onSuccess: () => {
        setIsBookmarked((prev) => !prev);
        // 새로운 북마크 상태를 서버 응답으로부터 받아서 설정
        queryClient.invalidateQueries({ queryKey: ['url-post', postTitle] });
      },
      onError: (error) => {
        console.error('Bookmark error:', error);
        setIsBookmarked((prev) => !prev); // 에러 발생 시 원래 상태로 되돌림
      },
    });
  };

  // 포스트 수정, 의존성이 변경되지 않는 한 함수가 재생성되지 않음
  const handleEditClick = useCallback(() => {
    router.push(`/blog/${username}/write?edit=true&postId=${postId}`);
    setTitle(postURLData?.data.title);
    setPost(postURLData?.data.content);
  }, [username, postId, postURLData?.data.title, setTitle, postURLData?.data.content, setPost, router]);

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

  // 포스트 신고 함수
  const handleReportPost = () => {};

  // 포스트 신고 버튼 누르면 나오는 모달
  const handleReportPostClick = () => {
    setModalState((prev) => ({
      ...prev,
      open: true,
      hasSubBtn: true,
      topText: '해당 포스트를 신고하시겠습니까?',
      subBtnText: '취소',
      btnText: '신고',
      onSubBtnClick: () => setModalState(initailModalState),
      onBtnClick: () => handleReportPost(),
    }));
  };

  // 컨텐츠 sanitize 메모이제이션
  const sanitizedContent = useMemo(
    () => ({ __html: DOMPurify.sanitize(postURLData?.data.content || '') }),
    [postURLData?.data.content],
  );
  return (
    <>
      {/* 제목과 더보기 아이콘 */}
      <div className="flex justify-between items-center">
        <span className="text-[22px] font-semibold">{postURLData?.data.title}</span>

        {isMe ? (
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
        ) : (
          <div className="relative flex items-end gap-5">
            <div onClick={handleReportPostClick} className="flex items-end gap-0.5 text-gray-0 text-xs">
              <Icons className="cursor-pointer" name={SirenIcon} />
              신고
            </div>

            <Icons
              onClick={handleBookmarkClick}
              name={{ ...BookmarkIcon, fill: isBookmarked ? '#41AED9' : 'none' }}
              className="pt-0.5 cursor-pointer"
            />
          </div>
        )}
      </div>

      {/* 작성자 프로필 */}
      <div className="flex items-center justify-between self-stretch mt-[7px] py-[22px] border-b border-gray">
        <div
          className="flex items-center gap-2.5 cursor-pointer"
          onClick={() => {
            router.push(`/blog/${postURLData?.data.username}`);
          }}
        >
          <Image
            className="min-w-[29px] min-h-[29px] rounded-full ml-2.5"
            src={postURLData?.data.profilePicUrl || defaultProfilePic.src}
            alt="프로필사진"
            width={29}
            height={29}
            unoptimized
          />
          <span>{postURLData?.data.nickname}</span>
        </div>
        <div className="ml-[62px] max-w-fit text-xs bg-primary-0 bg-opacity-25 text-primary-2 px-[9.5px] py-1 rounded-md whitespace-nowrap">
          {blogUserNameData?.data?.prejob?.[0]}
        </div>
      </div>

      {/* 포스트 내용 */}
      <div className="mt-[19px] px-[7px]" dangerouslySetInnerHTML={sanitizedContent} />

      {/* 작성일 댓글 좋아요 */}
      <div className="flex items-center justify-between mt-20 pb-10 border-b">
        <span className="text-sm text-gray-0">{formatDate(postURLData?.data.timestamp)}</span>
        <div className="flex gap-3">
          <div className="text-primary-1 bg-[#252530] rounded-[100px] border border-[#353542] blog-favor-frame">
            <Icons name={CommentIcon} />
            <p className="text-sm">{postURLData?.data.commentCount}</p>
          </div>
          <div
            onClick={handleLikeClick}
            className={`${isLiked ? 'text-primary-1' : 'text-gray-1'} bg-[#252530] rounded-[100px] border border-[#353542] blog-favor-frame`}
          >
            <Icons name={{ ...FavorIcon, fill: isLiked ? '#41AED9' : 'currentColor' }} />
            <span className="text-sm">{postURLData?.data.likeCount}</span>
          </div>
        </div>
      </div>

      {/* 댓글 */}
      <PostComment postId={postId} comments={postURLData?.data.comments} currentUserId={userData?.data.memberId} />

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
