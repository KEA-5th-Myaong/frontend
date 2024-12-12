import Image from 'next/image';
import { useState } from 'react';
import Icons from '../../../../../../../_components/ui/Icon';
import { ReplyIcon } from '../../../../../../../_components/ui/iconPath';
import { CommentProps } from '../../_types/post';
import EditCommentInput from './EditCommentInput';
import { formatTime } from '@/app/_utils/formatDate';
import defaultProfilePic from '../../../../../../../../../public/mascot.png';
import { postReport } from '../../../_services/blogService';
import Modal, { initailModalState } from '@/app/_components/Modal';

interface CommentItemProps {
  comment: CommentProps;
  onReplyClick: (id: number) => void;
  onEditClick: (id: number) => void;
  onEditSubmit: (id: number, content: string) => void;
  onDelete: (id: number) => void;
  isReply?: boolean;
  isEditing?: boolean;
  isMine: boolean;
}

export default function CommentItem({
  comment,
  onReplyClick,
  onEditClick,
  onEditSubmit,
  onDelete,
  isReply = false,
  isEditing,
  isMine,
}: CommentItemProps) {
  const [modalState, setModalState] = useState(initailModalState);
  // 포스트 신고 함수
  const handleReportPost = async (commentId: number) => {
    try {
      await postReport({
        contentId: commentId,
        contentType: 'COMMENT',
      });

      setModalState((prev) => ({
        ...prev,
        topText: '신고가 완료되었습니다.',
        hasSubBtn: false,
        btnText: '확인',
        onBtnClick: () => setModalState(initailModalState),
      }));
    } catch (error) {
      setModalState((prev) => ({
        ...prev,
        topText: '이미 신고한 댓글입니다.',
        hasSubBtn: false,
        btnText: '확인',
        onBtnClick: () => setModalState(initailModalState),
      }));
    }
  };
  // 포스트,댓글 신고 버튼 누르면 나오는 모달
  const handleReportCommentClick = (commentId: number) => {
    setModalState((prev) => ({
      ...prev,
      open: true,
      hasSubBtn: true,
      topText: '해당 댓글을 신고하시겠습니까?',
      subBtnText: '취소',
      btnText: '신고',
      onSubBtnClick: () => setModalState(initailModalState),
      onBtnClick: () => handleReportPost(commentId),
    }));
  };
  return (
    <div className={`flex flex-col py-6 px-1.5 border-b ${isReply && 'pl-6'}`}>
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-2.5">
          {isReply && <Icons name={ReplyIcon} />}
          <Image
            className="min-w-[29px] min-h-[29px] rounded-full"
            src={comment.profilePicUrl || defaultProfilePic.src}
            alt="프로필 사진"
            width={29}
            height={29}
            unoptimized
          />
          <p>{comment.nickname}</p>
        </div>
        <div className="flex gap-2 text-xs text-gray-0">
          <button type="button" onClick={() => onReplyClick(comment.commentId)}>
            답글
          </button>

          {isMine ? (
            <>
              <button type="button" onClick={() => onEditClick(comment.commentId)}>
                수정
              </button>
              <button type="button" onClick={() => onDelete(comment.commentId)}>
                삭제
              </button>
            </>
          ) : (
            <button type="button" onClick={() => handleReportCommentClick(comment.commentId)}>
              신고
            </button>
          )}
        </div>
      </div>
      {isEditing ? (
        <EditCommentInput
          initialContent={comment.comment}
          onSubmit={(content) => onEditSubmit(comment.commentId, content)}
        />
      ) : (
        <>
          <div className={`${isReply ? 'ml-16' : 'ml-10'} mb-[18px] py-2 text-[13px] break-words`}>
            {comment.comment}
          </div>
          <div className={`${isReply ? 'ml-16' : 'ml-10'} text-xs text-gray-0`}>{formatTime(comment.timestamp)}</div>
        </>
      )}

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
    </div>
  );
}
