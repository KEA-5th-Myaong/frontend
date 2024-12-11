import Image from 'next/image';
import Icons from '../../../../../../../_components/ui/Icon';
import { ReplyIcon } from '../../../../../../../_components/ui/iconPath';
import { CommentProps } from '../../_types/post';
import EditCommentInput from './EditCommentInput';
import { formatTime } from '@/app/_utils/formatDate';
import defaultProfilePic from '../../../../../../../../../public/mascot.png';

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
            <div>신고</div>
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
    </div>
  );
}
