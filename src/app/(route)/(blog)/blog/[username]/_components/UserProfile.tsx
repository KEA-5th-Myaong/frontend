'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useQueryClient } from '@tanstack/react-query';
import FollowButton from './_follow/FollowButton';
import FollowModal from './_follow/FollowModal';
import useCustomQuery from '@/app/_hooks/useCustomQuery';
import { fetchFollowed, fetchFollowing, fetchMemberInfo, fetchProfile, postFollow } from '../_services/blogService';
import defaultProfilePic from '../../../../../../../public/mascot.png';
import useMe from '@/app/_hooks/useMe';
import useCustomMutation from '@/app/_hooks/useCustomMutation';

export default function UserProfile() {
  const params = useParams();
  const router = useRouter();
  const { username } = params;
  const queryClient = useQueryClient();

  // url의 username을 가지고 memberId 가져오기
  const { data: userNameData } = useCustomQuery(['user-profile', username], () => fetchProfile(username as string)); // 현재 유저 정보
  const memberId = userNameData?.data.memberId; // 멤버 아이디

  const { data: userData } = useMe();
  const [isMe, setIsMe] = useState(false);
  useEffect(() => {
    if (userData?.data.username === username) {
      setIsMe(true);
    }
  }, [isMe, userData?.data.username, username]);

  // 블로그 주인장 데이터
  const { data: blogMemberData, isLoading: isBlogMemberLoading } = useCustomQuery(['blog-user', username], () =>
    fetchMemberInfo(memberId),
  );
  const { data: followedData, isLoading: isFollowedLoading } = useCustomQuery(['followed', memberId], () =>
    fetchFollowed(memberId, '10'),
  );
  const { data: followingData, isLoading: isFollowingLoading } = useCustomQuery(['following', memberId], () =>
    fetchFollowing(memberId, '10'),
  );
  // 모든 로딩 한 번에 관리
  const isLoading = isBlogMemberLoading || isFollowedLoading || isFollowingLoading;

  const [followedList, setFollowedList] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const [isFollowerOpen, setIsFollowerOpen] = useState(false);
  const [isFollowingOpen, setIsFollowingOpen] = useState(false);

  const [isFollowed, setIsFollowed] = useState(false);
  useEffect(() => {
    if (blogMemberData?.data.isFollowing) {
      setIsFollowed(true);
    }
  }, [blogMemberData?.data.isFollowing]);

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
  // 팔로우 뮤테이션(낙관적 업데이트)
  const followMutation = useCustomMutation(postFollow, {
    onMutate: async () => {
      // 낙관적 업데이트
      setIsFollowed((prev) => !prev);

      // 팔로워 수 업데이트
      if (blogMemberData?.data) {
        const newCount = isFollowed ? blogMemberData.data.followerCount - 1 : blogMemberData.data.followerCount + 1;

        blogMemberData.data.followerCount = newCount;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-user', username] });
      queryClient.invalidateQueries({ queryKey: ['followed', memberId] });
      queryClient.invalidateQueries({ queryKey: ['following', memberId] });
    },
    onError: () => {
      // 에러 발생 시 원래 상태로 롤백
      setIsFollowed((prev) => !prev);
      if (blogMemberData?.data) {
        const newCount = isFollowed ? blogMemberData.data.followerCount + 1 : blogMemberData.data.followerCount - 1;

        blogMemberData.data.followerCount = newCount;
      }
    },
  });

  // 팔로우 버튼 누르기
  const handleFollow = () => {
    if (!memberId) return;
    followMutation.mutate(memberId);
  };
  return (
    <>
      <div className="pt-[51px] pb-[41px] xl:px-5 px-2 rounded-2xl bg-white-0 md:border md:border-gray-2 h-fit">
        <div className="flex items-center sm:gap-0 gap-8">
          {isLoading ? (
            <div className="flex flex-col sm:flex-row md:flex-col min-w-[100px] md:min-w-[250px] items-center gap-3 sm:gap-3 md:gap-10">
              <Image
                className="min-w-[50px] min-h-[50px] sm:min-w-[101px] sm:min-h-[101px] md:w-[180px] md:h-[180px] rounded-full animate-spin"
                src={defaultProfilePic.src}
                alt="프로필사진"
                width={52}
                height={52}
                unoptimized
              />
              불러오는중...
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row md:flex-col items-center gap-3 sm:gap-3 md:gap-10">
              <Image
                className="min-w-[50px] min-h-[50px] sm:min-w-[101px] sm:min-h-[101px] md:w-[180px] md:h-[180px] rounded-full"
                src={blogMemberData?.data.profilePicUrl || defaultProfilePic.src}
                alt="프로필사진"
                width={52}
                height={52}
                unoptimized
              />

              <div className="hidden sm:flex flex-col items-start md:items-center md:gap-5 pl-0 sm:pl-3 md:pl-0 md:w-[300px] gap-3">
                <span className="text-2xl font-semibold md:text-primary-1 text-black-1 whitespace-nowrap">
                  {blogMemberData?.data.nickname}
                  <span className="inline md:hidden">님의 블로그</span>
                </span>
                <div className="hidden sm:inline md:hidden w-full h-[1px] bg-gray-1" />
                <span> {blogMemberData?.data.blogIntro}</span>
              </div>

              <div className="hidden md:flex justify-between self-stretch px-[58px] md:w-auto">
                <FollowButton
                  count={blogMemberData?.data.followerCount}
                  label="팔로워"
                  onClick={() => setIsFollowerOpen(true)}
                />

                <div className="h-[53px] bg-gray-0 w-[2px]" />

                <FollowButton
                  count={blogMemberData?.data.followingCount}
                  label="팔로잉"
                  onClick={() => setIsFollowingOpen(true)}
                />
              </div>
              {isMe ? (
                <button
                  type="button"
                  onClick={() => router.push(`/blog/${username}/write`)}
                  className="bg-primary-1 hover:bg-primary-2 user-profile-btn"
                >
                  글 작성하기
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleFollow}
                  className={`${isFollowed ? 'bg-gray-0 hover:bg-gray-1' : 'bg-primary-1 hover:bg-primary-2'} user-profile-btn`}
                >
                  {isFollowed ? '언팔로우' : '팔로우'}
                </button>
              )}
            </div>
          )}

          {/* 작은 화면일 때 보이는 */}
          <div className="flex flex-col items-start gap-3 sm:hidden md:gap-5 md:w-[300px] md:items-center">
            <span className="text-lg md:text-2xl font-semibold md:text-primary-1 text-black-1">
              {blogMemberData?.data.nickname}
              <span className="inline md:hidden">님의 블로그</span>
            </span>
            <div className="hidden sm:inline md:hidden w-full h-[1px] bg-gray-1" />
            <span>{blogMemberData?.data.blogIntro}</span>
          </div>
        </div>
      </div>

      {/* 팔로워/팔로잉 목록 모달 */}
      <FollowModal
        isOpen={isFollowerOpen}
        onClose={() => setIsFollowerOpen(false)}
        title={`${blogMemberData?.data.nickname}님을 팔로우하는 유저`}
        list={followedList}
      />
      <FollowModal
        isOpen={isFollowingOpen}
        onClose={() => setIsFollowingOpen(false)}
        title={`${blogMemberData?.data.nickname}님이 팔로우하는 유저`}
        list={followingList}
      />
    </>
  );
}
