'use client';

import { useRef, useState } from 'react';
import Icons from '../../../../../../_components/ui/Icon';
import { FavorIcon, MoreIcon } from '../../../../../../_components/ui/iconPath';
import testPosts from '../../_components/test.json';
import MoreOptions from '../../../../../../_components/MoreOptions';
import useClickOutside from '../../../../../../_hooks/useClickOutside';

export default function PostContent() {
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
        <span className="text-[22px] font-semibold">{testPosts[0].postTitle}</span>
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
        <div className="flex items-center gap-[10px]">
          <div id="profile" className="min-w-[29px] min-h-[29px] bg-pink-300 rounded-full" />
          <span>{testPosts[0].userName}</span>
        </div>
        <div className="ml-[62px] max-w-fit text-xs bg-primary-0 bg-opacity-25 text-primary-2 px-[9.5px] py-1 rounded-md whitespace-nowrap">
          {testPosts[0].userJob}
        </div>
      </div>

      {/* 포스트 내용 */}
      <div className="mt-[19px] px-[7px]">
        <span>{testPosts[0].postContent}</span>
      </div>

      {/* 작성일 댓글 좋아요 */}
      <div className="flex items-center justify-between mt-20 pb-10 border-b">
        <span className="text-sm text-gray-0">{testPosts[0].postDate}</span>
        <div className="flex gap-3">
          <div className="text-primary-1 blog-favor-frame">
            <div id="commentIcon" className="bg-primary-1 w-[18px] h-[18px] rounded-full" />
            <p className="text-sm">10</p>
          </div>
          <div className="text-gray-1 blog-favor-frame">
            <Icons name={FavorIcon} />
            <span className="text-sm">{testPosts[0].lovedCount}</span>
          </div>
        </div>
      </div>
    </>
  );
}
