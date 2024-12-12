import Image from 'next/image';
import { useMemo } from 'react';
import DOMPurify from 'dompurify';
import parse from 'html-react-parser';
import { PostProps } from '../(route)/(main-page)/main/_types/main-page';
import Icons from './ui/Icon';
import { BookmarkIcon, FavorIcon } from './ui/iconPath';
import defaultProfilePic from '../../../public/mascot.png'; // 기본 프로필 이미지 import

export default function Post({
  title,
  content,
  timestamp,
  nickname,
  profilePicUrl,
  isBookmarked,
  onUserClick,
  onContentClick,
  className,

  onBookmarkClick,
  prejob,
  isLiked,
  likeCount,
}: PostProps) {
  const imageSource = profilePicUrl || defaultProfilePic;

  const handleUserClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 상위 요소로의 이벤트 전파를 막기
    onUserClick();
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onBookmarkClick) {
      onBookmarkClick();
    }
  };

  const sanitizedContent = useMemo(() => {
    if (typeof content === 'string') {
      // img 태그에 스타일을 추가(일단은 none으로 안보이게)
      const modifiedContent = content.replace(/<img/g, '<img style="display:none;"');
      // img 태그를 아예 안보이게 하는 법
      // const contentWithoutImages = content.replace(/<img[^>]*>/g, '');
      return parse(
        DOMPurify.sanitize(modifiedContent, {
          ADD_ATTR: ['style'], // style 속성 허용
        }),
      );
    }
    return content;
  }, [content]);
  return (
    <div
      onClick={onContentClick}
      className={`flex flex-col gap-3 py-[30px] pl-[30px] pr-3 sm:p-[30px] bg-[#FBFBFB] dark:bg-black-1 rounded-2xl 
        border border-gray-4 hover:scale-105 transform transition-transform duration-200 ease-out cursor-pointer ${className}`}
    >
      <div className="flex flex-col w-full">
        <div className="flex items-center w-full" onClick={handleUserClick}>
          <Image
            className="rounded-full mr-5"
            src={imageSource}
            alt=""
            width={42}
            height={42}
            unoptimized
            loading="lazy"
          />
          <div className="flex justify-between w-full">
            <p>{nickname}</p>
            <Icons
              onClick={handleBookmarkClick}
              name={isBookmarked ? { ...BookmarkIcon, fill: '#41AED9' } : BookmarkIcon}
              className="mr-5"
            />
          </div>
        </div>
        <div className="ml-[62px] max-w-fit text-xs bg-primary-0 bg-opacity-25 text-primary-2 px-[9.5px] py-1 rounded-md whitespace-nowrap">
          {prejob}
        </div>
      </div>

      <div className="flex flex-col pl-[12px] sm:pl-[62px] pr-5 gap-7">
        <div className="flex flex-col gap-4">
          <span className="text-[#030303] font-semibold dark:text-white-1">{title}</span>
          <span className="text-[#030303] overflow-hidden line-clamp-3 dark:text-white-1">{sanitizedContent}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-1">{timestamp}</span>
          <div className="blog-favor-frame">
            <Icons name={FavorIcon} className={`${isLiked ? 'text-primary-1' : 'text-gray-1'}`} />
            <span className={`${isLiked ? 'text-primary-1' : 'text-gray-1'} text-sm mt-[1.5px]`}>{likeCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
