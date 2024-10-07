'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Overlay from '../../../../../_components/Overlay';
import testFollowers from './follower.json';
import testFollowing from './following.json';
import { UserProfileProps, FollowProps } from '../_types/blog';

const followMotion = {
  variants: {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  },
  transition: {
    type: 'spring',
    stiffness: 300,
    damping: 30,
    duration: 0.3,
  },
};

export default function UserProfile({ userName, follower, following, isFollowed }: UserProfileProps) {
  const [followerList, setFollowerList] = useState<FollowProps[]>([]);
  const [followingList, setFollowingList] = useState<FollowProps[]>([]);

  const [isFollowerOpen, setIsFollowerOpen] = useState(false);
  const [isFollowingOpen, setIsFollowingOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 팔로워 데이터 가져오기
        setFollowerList(testFollowers);

        // 팔로잉 데이터 가져오기
        setFollowingList(testFollowing);
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
              <button
                type="button"
                className="flex flex-col items-center gap-[10px]"
                onClick={() => {
                  setIsFollowerOpen(true);
                }}
              >
                <p className="text-xl">{follower}</p>
                <p>팔로워</p>
              </button>

              <div className="h-[53px] bg-gray-0 w-[2px]" />

              <button
                type="button"
                className="flex flex-col items-center gap-[10px]"
                onClick={() => {
                  setIsFollowingOpen(true);
                }}
              >
                <span className="text-xl">{following}</span>
                <span>팔로잉</span>
              </button>
            </div>

            <button
              type="button"
              className={`${isFollowed ? 'bg-gray-0' : 'bg-primary-1'} ml-0 sm:ml-10 
            md:ml-0 self-stretch text-lg h-fit py-[4.5px] 
            sm:py-[7.5px] md:py-[22px] px-4 sm:px-[30px] font-semibold primary-1-btn`}
            >
              팔로우
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

      {isFollowerOpen && (
        <Overlay
          onClick={() => {
            setIsFollowerOpen(false);
          }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()} // 클릭 이벤트가 Overlay까지 전달되지 않도록
            {...followMotion}
            className="flex m-4 min-w-[300px] max-w-[510px] w-full pt-14 pb-4 px-10 flex-col items-start gap-8 rounded-2xl bg-white-0 shadow-md"
          >
            <p className="font-semibold text-2xl">김현중님을 팔로우하는 유저</p>

            <div className="flex flex-col gap-6 w-full h-[514px] overflow-scroll pb-2 hide-scrollbar">
              {followerList.map((fo) => (
                <div className="flex items-center gap-5">
                  <div className="w-[52px] h-[52px] bg-purple-300 rounded-full" />
                  <p className="font-medium text-lg">{fo.name}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </Overlay>
      )}

      {isFollowingOpen && (
        <Overlay
          onClick={() => {
            setIsFollowingOpen(false);
          }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            {...followMotion}
            className="flex m-4 min-w-[300px] max-w-[510px] w-full pt-14 pb-4 px-10 flex-col items-start gap-8 rounded-2xl bg-white-0 shadow-md"
          >
            <p className="font-semibold text-2xl">김현중님이 팔로우하는 유저</p>

            <div className="flex flex-col gap-6 w-full h-[514px] overflow-scroll pb-2 hide-scrollbar">
              {followingList.map((fo) => (
                <div key={fo.id} className="flex items-center gap-5">
                  <div className="w-[52px] h-[52px] bg-purple-300 rounded-full" />
                  <p className="font-medium text-lg">{fo.name}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </Overlay>
      )}
    </>
  );
}
