'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
// import testFollower from './_follow/follow.json';
import { FollowedProps, FollowingProps } from '../_types/blog';
import FollowButton from './_follow/FollowButton';
import FollowModal from './_follow/FollowModal';
import useCustomQuery from '@/app/_hooks/useCustomQuery';
import { fetchFollowed, fetchFollowing } from '../_services/blogService';

export default function UserProfile() {
  const params = useParams();

  const { data: followingData } = useCustomQuery(['following', params.userId], () => fetchFollowing(params.userId, 10));
  const { data: followedData } = useCustomQuery(['followed', params.userId], () => fetchFollowed(params.userId, 10));

  const [followerList, setFollowerList] = useState<FollowedProps[]>([]);
  const [followingList, setFollowingList] = useState<FollowingProps[]>([]);

  const [isFollowerOpen, setIsFollowerOpen] = useState(false);
  const [isFollowingOpen, setIsFollowingOpen] = useState(false);

  const [isFollowed, setIsFollowd] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 팔로워 데이터 가져오기
        setFollowerList(followingData?.following);

        // 팔로잉 데이터 가져오기
        setFollowingList(followedData?.followed);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [followedData?.followed, followingData?.following]);
  return (
    <>
      <div className="pt-[51px] pb-[41px] xl:px-5 px-2 rounded-2xl bg-white-0 md:border md:border-gray-2 h-fit">
        <div className="flex items-center sm:gap-0 gap-8">
          <div className="flex flex-col sm:flex-row  md:flex-col items-center gap-3 sm:gap-3 md:gap-10 ">
            <div className="min-w-[50px] min-h-[50px] sm:min-w-[101px] sm:min-h-[101px] md:w-[180px] md:h-[180px] bg-pink-300 rounded-full" />

            <div className="hidden sm:flex flex-col items-start md:items-center md:gap-5 pl-0 sm:pl-3 md:pl-0 md:w-[300px] gap-3">
              <span className="text-2xl font-semibold md:text-primary-1 text-black-1 whitespace-nowrap">
                김현중
                <span className="inline md:hidden">님의 블로그</span>
              </span>
              <div className="hidden sm:inline md:hidden w-full h-[1px] bg-gray-1" />
              <span>안녕하세요 김현중입니다. 저의 블로그에 방문해주셔서 감사합니다..........람쥐</span>
            </div>

            <div className="hidden md:flex justify-between self-stretch px-[58px] md:w-auto">
              <FollowButton count={123} label="팔로워" onClick={() => setIsFollowerOpen(true)} />

              <div className="h-[53px] bg-gray-0 w-[2px]" />

              <FollowButton count={456} label="팔로잉" onClick={() => setIsFollowingOpen(true)} />
            </div>

            <Link
              type="button"
              href={`/blog/${params.userId}/write`}
              className={`${isFollowed ? 'bg-gray-0' : 'bg-primary-1'} flex justify-center ml-0 sm:ml-10 
            md:ml-0 self-stretch text-lg h-fit py-[4.5px] 
            sm:py-[7.5px] md:py-[22px] px-4 sm:px-[30px] font-semibold primary-1-btn`}
            >
              글 작성하기
            </Link>
          </div>

          {/* 작은 화면일 때 보이는 */}
          <div className="flex flex-col items-start gap-3 sm:hidden md:gap-5 md:w-[300px] md:items-center">
            <span className="text-lg md:text-2xl font-semibold md:text-primary-1 text-black-1">
              김현중
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
        title="김현중님을 팔로우하는 유저"
        list={followerList}
      />

      <FollowModal
        isOpen={isFollowingOpen}
        onClose={() => setIsFollowingOpen(false)}
        title="김현중님이 팔로우하는 유저"
        list={followingList}
      />
    </>
  );
}
