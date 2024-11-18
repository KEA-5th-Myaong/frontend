import Image from 'next/image';
import { PostDetailProps } from '../(route)/(main-page)/main/_types/main-page';
import Icons from './ui/Icon';
import { BookmarkIcon, FavorIcon } from './ui/iconPath';
import defaultProfilePic from '../../../public/mascot.png'; // 기본 프로필 이미지 import

export default function Post({
  title,
  // thumbnail,
  content,
  timestamp,
  // memberId,
  nickname,
  profilePicUrl,
  isBookmarked,
  onUserClick,
  onContentClick,
  className,

  // 미구현
  userJob,
  isLoved,
  lovedCount,
}: PostDetailProps) {
  const imageSource = profilePicUrl || defaultProfilePic;
  return (
    <div
      className={`flex flex-col gap-3 py-[30px] pl-[30px] pr-3 sm:p-[30px] bg-[#FBFBFB] rounded-2xl 
        border border-gray-4 hover:scale-105 transform transition-transform duration-200 ease-out ${className}`}
    >
      <div className="flex flex-col w-full">
        <div className="flex items-center w-full" onClick={onUserClick}>
          <Image className="rounded-full mr-5" src={imageSource} alt="프로필사진" width={42} height={42} unoptimized />
          <div className="flex justify-between w-full">
            <p>{nickname}</p>
            <Icons name={isBookmarked ? { ...BookmarkIcon, fill: '#41AED9' } : BookmarkIcon} className="mr-5" />
          </div>
        </div>
        <div className="ml-[62px] max-w-fit text-xs bg-primary-0 bg-opacity-25 text-primary-2 px-[9.5px] py-1 rounded-md whitespace-nowrap">
          {userJob}
        </div>
      </div>

      <div className="flex flex-col pl-[12px] sm:pl-[62px] pr-5 gap-7">
        <div className="flex flex-col gap-4" onClick={onContentClick}>
          <span className="text-[#030303] font-semibold">{title}</span>
          <span className="text-[#030303] overflow-hidden line-clamp-3">{content}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-1">{timestamp}</span>
          <div className="blog-favor-frame">
            <Icons name={FavorIcon} className={`${isLoved ? 'text-primary-1' : 'text-gray-1'}`} />
            <span className={`${isLoved ? 'text-primary-1' : 'text-gray-1'} text-sm mt-[1.5px]`}>{lovedCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
