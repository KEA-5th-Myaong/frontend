import Icons from '../../../../../../_components/ui/Icon';
import { FavorIcon, MoreIcon } from '../../../../../../_components/ui/iconPath';
import testPosts from '../../_components/test.json';

export default function PostContent() {
  return (
    <>
      <div className="flex justify-between items-center">
        <span className="text-[22px] font-semibold">{testPosts[0].postTitle}</span>
        <div className="cursor-pointer">
          <Icons name={MoreIcon} />
        </div>
      </div>

      <div className="flex items-center justify-between self-stretch mt-[7px] py-[22px] border-b border-gray">
        <div className="flex items-center gap-[10px]">
          <div id="profile" className="min-w-[29px] min-h-[29px] bg-pink-300 rounded-full" />
          <span>{testPosts[0].userName}</span>
        </div>
        <div className="ml-[62px] max-w-fit text-xs bg-primary-0 bg-opacity-25 text-primary-2 px-[9.5px] py-1 rounded-md whitespace-nowrap">
          {testPosts[0].userJob}
        </div>
      </div>

      <div className="mt-[19px] px-[7px]">
        <span>{testPosts[0].postContent}</span>
      </div>

      <div className="flex items-center justify-between mt-20 pb-10 border-b">
        <span className="text-sm text-gray-0">{testPosts[0].postDate}</span>
        <div className="flex gap-3">
          <div className="text-primary-1 blog-favor-frame">
            <div className="bg-primary-1 w-[18px] h-[18px] rounded-full" />
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
