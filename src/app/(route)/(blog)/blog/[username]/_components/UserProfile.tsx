'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import FollowButton from './_follow/FollowButton';
import FollowModal from './_follow/FollowModal';
import useCustomQuery from '@/app/_hooks/useCustomQuery';
import { fetchFollowed, fetchFollowing, fetchMemberInfo } from '../_services/blogService';
import { fetchMemberUsername } from '@/app/_services/membersService';
import defaultProfilePic from '../../../../../../../public/mascot.png';

export default function UserProfile() {
  const params = useParams();

  const getUsername = (param: string | string[]): string => {
    if (Array.isArray(param)) {
      return param[0]; // 배열인 경우 첫 번째 요소를 사용
    }
    return param;
  };

  const userName = decodeURI(getUsername(params.username));

  // url의 username을 가지고 memberId 가져오기
  const { data: userNameData } = useCustomQuery(['user-name', userName], () => fetchMemberUsername(userName)); // 현재 유저 정보
  const memberId = userNameData?.data.memberId; // 멤버 아이디

  // 블로그 주인장 데이터
  const { data: blogUserData } = useCustomQuery(['blog-user', userName], () => fetchMemberInfo(memberId));

  const { data: followedData } = useCustomQuery(['followed', memberId], () => fetchFollowed(memberId, '10'));
  const { data: followingData } = useCustomQuery(['following', memberId], () => fetchFollowing(memberId, '10'));

  const [followedList, setFollowedList] = useState([]);
  const [followingList, setFollowingList] = useState([]);

  const [isFollowerOpen, setIsFollowerOpen] = useState(false);
  const [isFollowingOpen, setIsFollowingOpen] = useState(false);

  const [isFollowed, setIsFollowd] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 팔로워 데이터 가져오기
        setFollowedList(followedData?.data.followedDTOList);

        // 팔로잉 데이터 가져오기
        setFollowingList(followingData?.data.followingDTOList);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [followedData?.data.followedDTOList, followingData?.data.followingDTOList]);
  return (
    <>
      <div className="pt-[51px] pb-[41px] xl:px-5 px-2 rounded-2xl bg-white-0 md:border md:border-gray-2 h-fit">
        <div className="flex items-center sm:gap-0 gap-8">
          <div className="flex flex-col sm:flex-row  md:flex-col items-center gap-3 sm:gap-3 md:gap-10 ">
            <Image
              className="min-w-[50px] min-h-[50px] sm:min-w-[101px] sm:min-h-[101px] md:w-[180px] md:h-[180px] rounded-full"
              src={blogUserData?.data.profilePicUrl || defaultProfilePic.src}
              alt="프로필사진"
              width={52}
              height={52}
              unoptimized
            />

            <div className="hidden sm:flex flex-col items-start md:items-center md:gap-5 pl-0 sm:pl-3 md:pl-0 md:w-[300px] gap-3">
              <span className="text-2xl font-semibold md:text-primary-1 text-black-1 whitespace-nowrap">
                {blogUserData?.data.nickname}
                <span className="inline md:hidden">님의 블로그</span>
              </span>
              <div className="hidden sm:inline md:hidden w-full h-[1px] bg-gray-1" />
              <span> {blogUserData?.data.nickname}의 블로그입니다.</span>
            </div>

            <div className="hidden md:flex justify-between self-stretch px-[58px] md:w-auto">
              <FollowButton
                count={blogUserData?.data.followerCount}
                label="팔로워"
                onClick={() => setIsFollowerOpen(true)}
              />

              <div className="h-[53px] bg-gray-0 w-[2px]" />

              <FollowButton
                count={blogUserData?.data.followingCount}
                label="팔로잉"
                onClick={() => setIsFollowingOpen(true)}
              />
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
              {blogUserData?.data.nickname}
              <span className="inline md:hidden">님의 블로그</span>
            </span>
            <div className="hidden sm:inline md:hidden w-full h-[1px] bg-gray-1" />
            <span>회원2의 블로그입니다.</span>
          </div>
        </div>
      </div>

      {/* 팔로워/팔로잉 목록 모달 */}
      <FollowModal
        isOpen={isFollowerOpen}
        onClose={() => setIsFollowerOpen(false)}
        title={`${blogUserData?.data.nickname}님을 팔로우하는 유저`}
        list={followedList}
      />

      <FollowModal
        isOpen={isFollowingOpen}
        onClose={() => setIsFollowingOpen(false)}
        title={`${blogUserData?.data.nickname}님이 팔로우하는 유저`}
        list={followingList}
      />
    </>
  );
}
