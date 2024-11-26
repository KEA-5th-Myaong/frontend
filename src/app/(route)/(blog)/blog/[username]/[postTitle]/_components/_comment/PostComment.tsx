'use client';

import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { CommentProps } from '../../_types/post';
import CommentItem from './CommentItem';
import ReplyInput from './ReplyInput';
import useCustomMutation from '@/app/_hooks/useCustomMutation';
import { postComments, postReplies } from '../../../_services/blogService';

interface PostCommentProps {
  postId: string;
  comments: CommentProps[];
}

export default function PostComment({ postId, comments }: PostCommentProps) {
  const [commentLists, setCommentLists] = useState<CommentProps[]>([]);
  const [replyingTo, setReplyingTo] = useState<number | null>(null); // 답글을 작성중인 댓글의 id
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null); // 수정중인 댓글의 id
  const [newComment, setNewComment] = useState('');

  const queryClient = useQueryClient();

  useEffect(() => {
    setCommentLists(comments);
  }, [comments]);

  // 댓글 제출
  const postCommentMutation = useCustomMutation(postComments, {
    onMutate: async (commentData: { postId: string; comment: string }) => {
      // 진행 중인 쿼리를 취소
      await queryClient.cancelQueries({ queryKey: ['user-post', commentData.postId] });

      // 이전 데이터 백업
      const previousComments = queryClient.getQueryData(['user-post', commentData.postId]);

      // 낙관적 업데이트
      const optimisticComment = {
        comment: commentData.comment,
        nickname: '김현중',
        timestamp: '방금 전',
        profilePicUrl: '/mascot.png',
        memberId: null,
      };

      queryClient.setQueryData(['user-post', commentData.postId], (old: any) => ({
        ...old,
        comments: [...(old?.comments || []), optimisticComment],
      }));

      return { previousComments };
    },

    onError: (err, variables, context) => {
      // 에러 발생 시 이전 상태로 롤백
      if (context?.previousComments) {
        queryClient.setQueryData(['user-post', variables.postId], context.previousComments);
      }
    },
    onSuccess: (response, variables) => {
      setCommentLists((prev) => [...prev, response]); // response: 서버에서 반환한 새로 생성된 댓글 정보
    },
    onSettled: () => {
      // 성공이든 실패든 완료되면 쿼리를 리페치
      queryClient.invalidateQueries({ queryKey: ['user-post'] });
    },
  });

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

  const postReplyMutation = useCustomMutation(postReplies, {
    onMutate: async (commentData: { postId: string; comment: string; parentId: string }) => {
      // 진행 중인 쿼리를 취소
      await queryClient.cancelQueries({ queryKey: ['user-post', commentData.postId] });

      const previousComments = queryClient.getQueryData(['user-post', commentData.postId]);

      const optimisticComment = {
        comment: commentData.comment,
        nickname: '김현중',
        timestamp: '방금 전',
        profilePicUrl: null,
        memberId: null,
      };

      queryClient.setQueryData(['user-post', commentData.postId], (old: any) => ({
        ...old,
        comments: [...(old?.comments || []), optimisticComment],
      }));

      return { previousComments };
    },

    onError: (err, variables, context) => {
      // 에러 발생 시 이전 상태로 롤백
      if (context?.previousComments) {
        queryClient.setQueryData(['user-post', variables.postId], context.previousComments);
      }
    },
    onSuccess: (response, variables) => {
      setCommentLists((prev) => {
        const parentIndex = prev.findIndex((comment) => comment.commentId === variables.parentId);
        const newComments = [...prev];
        newComments.splice(parentIndex + 1, 0, response); // 부모 댓글 바로 다음에 삽입
        return newComments;
      });
    },
    onSettled: () => {
      // 성공이든 실패든 완료되면 쿼리를 리페치
      queryClient.invalidateQueries({ queryKey: ['user-post'] });
    },
  });

  // 답글 제출
  const handleReplySubmit = (parentId: string, content: string) => {
    if (!content.trim()) return;

    postReplyMutation.mutate({
      postId,
      comment: content,
      parentId,
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
        {isReplyInputVisible && <ReplyInput onSubmit={(content) => handleReplySubmit(comment.commentId, content)} />}
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
