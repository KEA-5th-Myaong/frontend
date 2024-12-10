'use client';

import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { CommentProps } from '../../_types/post';
import CommentItem from './CommentItem';
import ReplyInput from './ReplyInput';
import useCustomMutation from '@/app/_hooks/useCustomMutation';
import { postComments, postReplies } from '../../../_services/blogService';
import { User } from '@/app/_hooks/useMe';

interface PostCommentProps {
  userData: User;
  postId: string;
  comments: CommentProps[];
}

export default function PostComment({ userData, postId, comments }: PostCommentProps) {
  const [commentLists, setCommentLists] = useState<CommentProps[]>([]);
  const [replyingTo, setReplyingTo] = useState<number | null>(null); // 답글을 작성중인 댓글의 id
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null); // 수정중인 댓글의 id
  const [newComment, setNewComment] = useState('');
  const queryClient = useQueryClient();

  useEffect(() => {
    setCommentLists(comments);
  }, [comments]);

  // 댓글 제출
  const postCommentMutation = useCustomMutation(
    ({ comment }: { postId: string; comment: string }) => postComments({ postId, content: comment }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['url-post'] });
        setNewComment('');
      },
    },
  );
  // 댓글 제출
  const handleCommentSubmit = () => {
    if (!newComment.trim()) return;
    postCommentMutation.mutate({
      postId, // props에서 받은 postId 사용
      comment: newComment,
    });
    setNewComment(''); // 입력창 비우기
  };
  // 답글 버튼 클릭(답글 달기 시작)
  const handleReplyClick = (commentId: number) => {
    // 현재 답글을 작성 중인 댓글이 클릭된 댓글과 같은지 확인
    setReplyingTo(replyingTo === commentId ? null : commentId); // 이미 답글 작성 중이던 댓글을 다시 클릭하면, 답글 작성 UI를 닫음
  };

  const postReplyMutation = useCustomMutation(
    ({ content, commentId }: { postId: string; content: string; commentId: string }) =>
      postReplies({ postId, content, commentId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['url-post'] });
        setReplyingTo(null);
      },
    },
  );

  // 답글 제출
  const handleReplySubmit = (commentId: string, content: string) => {
    if (!content.trim()) return;
    postReplyMutation.mutate({
      postId,
      content,
      commentId,
    });
  };

  // 수정 버튼 클릭
  const handleEditClick = (commentId: number) => {
    setEditingCommentId(commentId); // 클릭된 댓글의 ID를 editingCommentId로 설정
  };

  // 수정 제출
  const handleEditSubmit = (commentId: number, newContent: string) => {
    if (newContent.trim()) {
      setCommentLists(
        commentLists.map((comment) =>
          comment.commentId === commentId ? { ...comment, comment: newContent, timestamp: '방금 전' } : comment,
        ),
      );
      setEditingCommentId(null); // 수정 종료(id를 null로)
    }
  };

  // 댓글과 그에 대한 답글을 렌더링
  const renderCommentWithReplies = (comment: CommentProps) => {
    // 현재 댓글에 대한 답글들을 필터링해서 새 배열로 받음
    const replies = commentLists.filter((reply) => reply.parentCommentId === comment.commentId);

    // 현재 댓글에 답글을 다는지, 답글에 답글을 다는지
    const isReplyInputVisible =
      replyingTo === comment.commentId || replies.some((reply) => replyingTo === reply.commentId);
    // * some 메소드: 배열의 요소 중 하나라도 주어진 조건을 만족하면 true를 반환
    return (
      <div key={comment.commentId}>
        {/* 일반 댓글 */}
        <CommentItem
          comment={comment}
          onReplyClick={handleReplyClick}
          onEditClick={handleEditClick}
          onEditSubmit={handleEditSubmit}
          isEditing={editingCommentId === comment.commentId}
        />
        {/* 여기는 답글 */}
        {replies.map((reply) => (
          <CommentItem
            key={reply.commentId}
            comment={reply}
            onReplyClick={handleReplyClick}
            onEditClick={handleEditClick}
            onEditSubmit={handleEditSubmit}
            isReply
            isEditing={editingCommentId === reply.commentId}
          />
        ))}
        {/* 답글 인풋 보이게 */}
        {isReplyInputVisible && (
          <ReplyInput onSubmit={(content) => handleReplySubmit(comment.commentId as unknown as string, content)} />
        )}
      </div>
    );
  };
  return (
    <div className="px-[9px]">
      {/* 최상위 댓글만 렌더링, 답글은 렌더링 함수 속에 있음 */}
      {commentLists?.filter((comment) => comment.parentCommentId === null).map(renderCommentWithReplies)}

      {/* 댓글 입력 인풋 */}
      <div className="flex flex-col mt-10 gap-2.5">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="resize-none px-[18px] py-2.5 w-full border min-h-[104px] rounded-[15px] placeholder:text-gray-3 focus:outline-none"
          placeholder="댓글을 작성해주세요"
          maxLength={255}
        />
        <button
          type="button"
          onClick={handleCommentSubmit}
          disabled={!newComment.trim()}
          className="self-end px-[21.5px] py-[7.5px] primary-1-btn"
        >
          댓글 등록
        </button>
      </div>
    </div>
  );
}
