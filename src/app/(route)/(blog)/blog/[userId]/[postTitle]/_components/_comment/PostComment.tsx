'use client';

import useComments from '../../../_hooks/useComments';
import { CommentProps } from '../../_types/post';
import CommentItem from './CommentItem';
import ReplyInput from './ReplyInput';

export default function PostComment() {
  const {
    commentLists,
    replyingTo, // 답글을 작성중인 댓글의 id
    editingCommentId,
    handleReplyClick,
    handleReplySubmit,
    handleEditClick,
    handleEditSubmit,
  } = useComments();

  // 댓글과 그에 대한 답글을 렌더링
  const renderCommentWithReplies = (comment: CommentProps) => {
    // 현재 댓글에 대한 답글들을 필터링해서 새 배열로 받음
    const replies = commentLists.filter((reply) => reply.parent_comment_id === comment.id);

    // 현재 댓글에 답글을 다는지, 답글에 답글을 다는지
    const isReplyInputVisible = replyingTo === comment.id || replies.some((reply) => replyingTo === reply.id);
    // * some 메소드: 배열의 요소 중 하나라도 주어진 조건을 만족하면 true를 반환

    return (
      <div key={comment.id}>
        {/* 일반 댓글 */}
        <CommentItem
          comment={comment}
          onReplyClick={handleReplyClick}
          onEditClick={handleEditClick}
          onEditSubmit={handleEditSubmit}
          isEditing={editingCommentId === comment.id}
        />
        {/* 여기는 답글 */}
        {replies.map((reply) => (
          <CommentItem
            key={reply.id}
            comment={reply}
            onReplyClick={handleReplyClick}
            onEditClick={handleEditClick}
            onEditSubmit={handleEditSubmit}
            isReply
            isEditing={editingCommentId === reply.id}
          />
        ))}
        {/* 답글 인풋 보이게 */}
        {isReplyInputVisible && <ReplyInput onSubmit={(content) => handleReplySubmit(comment.id, content)} />}
      </div>
    );
  };
  return (
    <div className="px-[9px]">
      {/* 최상위 댓글만 렌더링, 답글은 렌더링 함수 속에 있음 */}
      {commentLists.filter((comment) => comment.parent_comment_id === null).map(renderCommentWithReplies)}

      {/* 댓글 입력 인풋 */}
      <div className="flex flex-col mt-10 gap-[10px]">
        <textarea
          className="resize-none px-[18px] py-[10px] w-full border min-h-[104px] rounded-lg placeholder:text-gray-3"
          placeholder="댓글을 작성해주세요"
        />
        <button type="button" className="self-end px-[21.5px] py-[7.5px] primary-1-btn">
          댓글 등록
        </button>
      </div>
    </div>
  );
}
