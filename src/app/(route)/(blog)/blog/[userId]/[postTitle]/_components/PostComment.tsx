'use client';

import { useState, useEffect } from 'react';
import { CommentProps } from '../_types/post';
import testComments from './testComment.json';

export default function PostComment() {
  const [commentLists, setCommentLists] = useState<CommentProps[]>([]);
  useEffect(() => {
    setCommentLists(testComments);
  }, []);
  return (
    <div className="px-[9px]">
      {commentLists.map((comment) => (
        <div className="py-6 px-[6px] border-b">
          <div className="flex items-center justify-between ">
            <div className="flex items-center gap-[10px]">
              <div id="profile" className="min-w-[29px] min-h-[29px] bg-pink-300 rounded-full" />
              <span>{comment.userName}</span>
            </div>
            <div className="flex gap-2 text-xs text-gray-0 ">
              <div>수정</div>
              <div>삭제</div>
            </div>
          </div>
          <div className="ml-10 mb-[18px] py-2 text-[13px]">{comment.comment}</div>

          <div className="ml-10 text-xs text-gray-0">{comment.updatedAt}</div>
        </div>
      ))}

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
