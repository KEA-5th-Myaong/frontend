'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import testFollower from './_follow/follow.json';
import { UserProfileProps, FollowProps } from '../_types/blog';
import FollowButton from './_follow/FollowButton';
import FollowModal from './_follow/FollowModal';

export default function UserProfile({ userName, follower, following, isFollowed }: UserProfileProps) {
  const router = useRouter();
  const params = useParams();
  console.log();

  const [followerList, setFollowerList] = useState<FollowProps[]>([]);
  const [followingList, setFollowingList] = useState<FollowProps[]>([]);

  const [isFollowerOpen, setIsFollowerOpen] = useState(false);
  const [isFollowingOpen, setIsFollowingOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 팔로워 데이터 가져오기
        setFollowerList(testFollower);

        // 팔로잉 데이터 가져오기
        setFollowingList(testFollower);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div className="pt-[51px] pb-[41px] xl:px-5 px-2 rounded-2xl bg-white-0 md:border md:border-gray-2 h-fit">
        <div className="flex items-center sm:gap-0 gap-8">
          <div className="flex flex-col sm:flex-row  md:flex-col items-center gap-3 sm:gap-10 ">
            <div className="min-w-[50px] min-h-[50px] sm:min-w-[101px] sm:min-h-[101px] md:w-[180px] md:h-[180px] bg-pink-300 rounded-full" />

            <div className="hidden sm:flex flex-col items-start md:items-center md:gap-5 md:w-[300px] gap-3">
              <span className="text-2xl font-semibold md:text-primary-1 text-black-1 whitespace-nowrap">
                {userName}
                <span className="inline md:hidden">님의 블로그</span>
              </span>
              <div className="hidden sm:inline md:hidden w-full h-[1px] bg-gray-1" />
              <span>안녕하세요 김현중입니다. 저의 블로그에 방문해주셔서 감사합니다..........람쥐</span>
            </div>

            <div className="hidden md:flex justify-between self-stretch px-[58px] md:w-auto">
              <FollowButton count={follower} label="팔로워" onClick={() => setIsFollowerOpen(true)} />

              <div className="h-[53px] bg-gray-0 w-[2px]" />

              <FollowButton count={following} label="팔로잉" onClick={() => setIsFollowingOpen(true)} />
            </div>

            <button
              type="button"
              onClick={() => {
                router.push(`/${params.userId}/write`);
              }}
              className={`${isFollowed ? 'bg-gray-0' : 'bg-primary-1'} ml-0 sm:ml-10 
            md:ml-0 self-stretch text-lg h-fit py-[4.5px] 
            sm:py-[7.5px] md:py-[22px] px-4 sm:px-[30px] font-semibold primary-1-btn`}
            >
              글 작성하기
            </button>
          </div>

          <div className="flex flex-col items-start gap-3 sm:hidden md:gap-5 md:w-[300px] md:items-center">
            <span className="text-2xl font-semibold md:text-primary-1 text-black-1">
              {userName}
              <span className="inline md:hidden">님의 블로그</span>
            </span>
            <div className="hidden sm:inline md:hidden w-full h-[1px] bg-gray-1" />
            <span>안녕하세요 김현중입니다. 저의 블로그에 방문해주셔서 감사합니다..........람쥐</span>
          </div>
        </div>
      </div>

      {/* 팔로워/팔로잉 목록 모달 */}
      <FollowModal
        isOpen={isFollowerOpen}
        onClose={() => setIsFollowerOpen(false)}
        title={`${userName}님을 팔로우하는 유저`}
        list={followerList}
      />

      <FollowModal
        isOpen={isFollowingOpen}
        onClose={() => setIsFollowingOpen(false)}
        title={`${userName}님이 팔로우하는 유저`}
        list={followingList}
      />
    </>
  );
}
