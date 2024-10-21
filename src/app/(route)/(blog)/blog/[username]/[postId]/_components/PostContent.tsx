'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import DOMPurify from 'dompurify';
import { useParams } from 'next/navigation';
import Icons from '../../../../../../_components/ui/Icon';
import { CommentIcon, FavorIcon, MoreIcon } from '../../../../../../_components/ui/iconPath';
import testPosts from '../../_components/test.json'; // 나중에 대체
import MoreOptions from '../../../../../../_components/MoreOptions';
import useClickOutside from '../../../../../../_hooks/useClickOutside';
import PostComment from './_comment/PostComment';
import formatDate from '@/app/_utils/formatDate';
import defaultProfilePic from '../../../../../../../../public/mascot.png';
import useCustomQuery from '@/app/_hooks/useCustomQuery';
import { fetchPostPostId } from '../../_services/blogService';

export default function PostContent() {
  const params = useParams();
  const { postId } = params;

  const { data } = useCustomQuery(['user-post', postId], () => fetchPostPostId(postId));
  console.log(postId, data);

  const [showDropDown, setShowDropDown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside({
    ref: dropdownRef,
    callback: () => setShowDropDown(false),
  });

  return (
    <>
      {/* 제목과 더보기 아이콘 */}
      <div className="flex justify-between items-center">
        <span className="text-[22px] font-semibold">{testPosts.title}</span>
        <div className="relative" ref={dropdownRef}>
          <Icons
            onClick={() => {
              setShowDropDown((prev) => !prev);
            }}
            className="cursor-pointer"
            name={MoreIcon}
          />

          {showDropDown && <MoreOptions />}
        </div>
      </div>

      {/* 작성자 프로필 */}
      <div className="flex items-center justify-between self-stretch mt-[7px] py-[22px] border-b border-gray">
        <div className="flex items-center gap-2.5">
          <div id="profile" className="" />
          <Image
            className="min-w-[29px] min-h-[29px] rounded-full"
            src={testPosts?.profilePic || defaultProfilePic.src}
            alt="프로필사진"
            width={29}
            height={29}
            unoptimized
          />

          <span>{testPosts.nickname}</span>
        </div>
        <div className="ml-[62px] max-w-fit text-xs bg-primary-0 bg-opacity-25 text-primary-2 px-[9.5px] py-1 rounded-md whitespace-nowrap">
          프론트엔드 개발자
        </div>
      </div>

      {/* 포스트 내용 */}
      <div className="mt-[19px] px-[7px]" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(testPosts.content) }} />

      {/* 작성일 댓글 좋아요 */}
      <div className="flex items-center justify-between mt-20 pb-10 border-b">
        <span className="text-sm text-gray-0">{formatDate(testPosts.timestamp)}</span>
        <div className="flex gap-3">
          <div className="text-primary-1 bg-[#252530] rounded-[100px] border border-[#353542] blog-favor-frame">
            <Icons name={CommentIcon} />
            <p className="text-sm">{testPosts.commentCount}</p>
          </div>
          <div className="text-gray-1 bg-[#252530] rounded-[100px] border border-[#353542] blog-favor-frame">
            <Icons name={FavorIcon} />
            <span className="text-sm">{testPosts.likeCount}</span>
          </div>
        </div>
      </div>

      {/* 댓글 */}
      <PostComment comments={testPosts.comments} />
    </>
  );
}
