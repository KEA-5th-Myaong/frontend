export interface UserProfileProps {
  userName: string;
  follower: number;
  following: number;
  isFollowed: boolean;
}

export default function UserProfile({ userName, follower, following, isFollowed }: UserProfileProps) {
  return (
    <div className="pt-[51px] pb-[41px] px-5 rounded-2xl bg-white-0 border border-gray-2">
      <div className="flex items-center sm:gap-0 gap-8">
        <div className="flex flex-col sm:flex-row  md:flex-col items-center gap-3 sm:gap-10 ">
          <div className="min-w-[50px] min-h-[50px] sm:min-w-[101px] sm:min-h-[101px] md:w-[180px] md:h-[180px] bg-pink-300 rounded-full" />

          <div className="hidden sm:flex flex-col items-start md:items-center md:gap-5 md:w-[300px] gap-3">
            <span className="text-2xl font-semibold md:text-green-1 text-black-1 whitespace-nowrap">
              {userName}
              <span className="inline md:hidden">님의 블로그</span>
            </span>
            <div className="hidden sm:inline md:hidden w-full h-[1px] bg-gray-1" />
            <span>안녕하세요 김현중입니다. 저의 블로그에 방문해주셔서 감사합니다..........람쥐</span>
          </div>

          <div className="hidden md:flex justify-between self-stretch px-[58px] md:w-auto">
            <div className="flex flex-col items-center gap-[10px]">
              <span className="text-xl">{follower}</span>
              <span>팔로워</span>
            </div>

            <div className="h-[53px] bg-gray-0 w-[2px]" />

            <div className="flex flex-col items-center gap-[10px]">
              <span className="text-xl">{following}</span>
              <span>팔로잉</span>
            </div>
          </div>

          <button
            type="button"
            className={`${isFollowed ? 'bg-green-1' : 'bg-gray-0'} ml-0 sm:ml-10 md:ml-0 py-[4.5px] self-stretch text-white-0 rounded-xl text-lg whitespace-nowrap h-fit sm:py-[7.5px] md:py-[22px] px-4 sm:px-[30px] md:px-0`}
          >
            팔로우
          </button>
        </div>

        <div className="flex flex-col items-start gap-3 sm:hidden md:gap-5 md:w-[300px] md:items-center">
          <span className="text-2xl font-semibold md:text-green-1 text-black-1">
            {userName}
            <span className="inline md:hidden">님의 블로그</span>
          </span>
          <div className="hidden sm:inline md:hidden w-full h-[1px] bg-gray-1" />
          <span>안녕하세요 김현중입니다. 저의 블로그에 방문해주셔서 감사합니다..........람쥐</span>
        </div>
      </div>
    </div>
  );
}
