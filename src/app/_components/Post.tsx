export interface PostProps {
  userName: string;
  userJob: string;
  postTitle: string;
  postContent: string;
  postDate: string;
  isLoved: boolean;
  lovedCount: string | number;
}

export default function Post({ userName, userJob, postTitle, postContent, postDate, isLoved, lovedCount }: PostProps) {
  return (
    <div className="flex flex-col gap-3 py-[30px] pl-[30px] pr-3 sm:p-[30px] bg-[#FBFBFB] rounded-2xl border border-gray-2 ">
      <div className="flex flex-col">
        <div className="flex items-center">
          <div id="profile" className="min-w-[42px] h-[42px] bg-black-3 rounded-full mr-5" />
          <span>{userName}</span>
        </div>
        <div className="ml-[62px] max-w-fit text-xs bg-primary-0 bg-opacity-25 text-primary-2 px-[9.5px] py-1 rounded-md whitespace-nowrap">
          {userJob}
        </div>
      </div>

      <div className="flex flex-col pl-[12px] sm:pl-[62px] pr-5 gap-7">
        <div className="flex flex-col gap-4">
          <span className="text-[#030303] font-semibold">{postTitle}</span>
          <span className="text-[#030303] overflow-hidden line-clamp-3">{postContent}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-sm text-gray-1">{postDate}</span>
          <div className="flex bg-black-2 min-w-[70px] px-3 py-[6px] rounded-3xl items-center gap-[6px]">
            <div id="goodIcon" className={`${isLoved ? 'bg-primary-2' : 'bg-gray-1'} w-[18px] h-[18px] rounded-full`} />
            <span className={`${isLoved ? 'text-primary-2' : 'text-gray-1'}`}>{lovedCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
