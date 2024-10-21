import { useState, useEffect } from 'react';
import { CommentProps } from '../[postTitle]/_types/post';
import testComments from '../[postTitle]/_components/_comment/testComment.json';

export default function useComments() {
  const [commentLists, setCommentLists] = useState<CommentProps[]>([]);
  const [replyingTo, setReplyingTo] = useState<number | null>(null); // 답글을 작성중인 댓글의 id
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null); // 수정중인 댓글의 id

  useEffect(() => {
    setCommentLists(testComments);
  }, []);

  // 답글 버튼 클릭
  const handleReplyClick = (commentId: number) => {
    // 현재 답글을 작성 중인 댓글이 클릭된 댓글과 같은지 확인
    setReplyingTo(replyingTo === commentId ? null : commentId); // 이미 답글 작성 중이던 댓글을 다시 클릭하면, 답글 작성 UI를 닫음
  };

  // 답글 제출
  const handleReplySubmit = (parentId: number, content: string) => {
    if (content.trim()) {
      const newComment: CommentProps = {
        id: Math.max(...commentLists.map((c) => c.id)) + 1,
        parent_comment_id: parentId,
        userName: '김현중',
        comment: content,
        updatedAt: '방금 전',
      };
      setCommentLists([...commentLists, newComment]);
      setReplyingTo(null); // 답글 작성 종료(id를 null로)
    }
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
          comment.id === commentId ? { ...comment, comment: newContent, updatedAt: '방금 전' } : comment,
        ),
      );
      setEditingCommentId(null); // 수정 종료(id를 null로)
    }
  };

  return {
    commentLists,
    replyingTo,
    editingCommentId,
    handleReplyClick,
    handleReplySubmit,
    handleEditClick,
    handleEditSubmit,
  };
}
