import { PostDetailProps } from '../(route)/(main-page)/main/_types/main-page';
import Icons from './ui/Icon';
import { BookmarkIcon, FavorIcon } from './ui/iconPath';

export default function Post({
  title,
  // thumbnail,
  content,
  timestamp,
  // memberId,
  nickname,
  // profilePicUrl,
  isBookmarked,
  onUserClick,
  onContentClick,
  className,

  // 미구현
  userJob,
  isLoved,
  lovedCount,
}: PostDetailProps) {
  return (
    <div
      className={`flex flex-col gap-3 py-[30px] pl-[30px] pr-3 sm:p-[30px] bg-[#FBFBFB] rounded-2xl 
        border border-gray-4 hover:scale-105 transform transition-transform duration-200 ease-out ${className}`}
    >
      <div className="flex flex-col w-full">
        <div
          className="flex items-center w-full"
          role="button"
          onClick={onUserClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              onUserClick();
            }
          }}
          tabIndex={0}
        >
          <div id="profile" className="min-w-[42px] h-[42px] bg-black-3 rounded-full mr-5" />
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
        <div
          className="flex flex-col gap-4"
          role="button"
          onClick={onContentClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              onContentClick();
            }
          }}
          tabIndex={0}
        >
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
