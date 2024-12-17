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
  const [isMe, setIsMe] = useState(false); // 현재 조회하는 블로그가 본인의 블로그인지
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
    fetchFollowed(memberId, '0'),
  );
  const { data: followingData, isLoading: isFollowingLoading } = useCustomQuery(['following', memberId], () =>
    fetchFollowing(memberId, '0'),
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
  // UserProfile 컴포넌트
  const profileFollowMutation = useCustomMutation(postFollow, {
    onMutate: async () => {
      // 프로필 페이지 주인에 대한 팔로우/언팔로우일 때만 낙관적 업데이트
      setIsFollowed((prev) => !prev);

      if (blogMemberData?.data) {
        const newCount = isFollowed ? blogMemberData.data.followerCount - 1 : blogMemberData.data.followerCount + 1;

        blogMemberData.data.followerCount = newCount;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-user', username] });
      queryClient.invalidateQueries({ queryKey: ['followed', memberId] });
      queryClient.invalidateQueries({ queryKey: ['following', memberId] });
      queryClient.invalidateQueries({ queryKey: ['notifications'], refetchType: 'all' });
    },
    onError: () => {
      setIsFollowed((prev) => !prev);
      if (blogMemberData?.data) {
        const newCount = isFollowed ? blogMemberData.data.followerCount + 1 : blogMemberData.data.followerCount - 1;

        blogMemberData.data.followerCount = newCount;
      }
    },
  });

  const modalFollowMutation = useCustomMutation(postFollow, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-user', username] });
      queryClient.invalidateQueries({ queryKey: ['followed', memberId] });
      queryClient.invalidateQueries({ queryKey: ['following', memberId] });
      queryClient.invalidateQueries({ queryKey: ['notifications'], refetchType: 'all' });
    },
  });

  // 팔로우 버튼 누르기
  const handleFollow = (targetMemberId?: number) => {
    const idToFollow = targetMemberId || memberId;
    if (!idToFollow) return;

    // 프로필 주인의 팔로우/언팔로우인 경우
    if (idToFollow === memberId) {
      profileFollowMutation.mutate(idToFollow);
    } else {
      // 모달 내의 다른 유저 팔로우/언팔로우인 경우
      modalFollowMutation.mutate(idToFollow);
    }
  };
  return (
    <>
      <div className="xl:pt-[51px] xl:pb-[41px] md:py-3 xl:px-5 pt-12 px-2 rounded-2xl bg-white-0 dark:bg-black-4 dark:border-black-6 md:border md:border-gray-2 h-fit">
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
                <span className="sm:text-lg md:text-2xl font-semibold md:text-primary-1 text-black-1 whitespace-nowrap">
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
                  onClick={() => handleFollow()}
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
        userData={userData}
        handleFollow={handleFollow}
      />
      <FollowModal
        isOpen={isFollowingOpen}
        onClose={() => setIsFollowingOpen(false)}
        title={`${blogMemberData?.data.nickname}님이 팔로우하는 유저`}
        list={followingList}
        userData={userData}
        isMe={isMe}
        handleFollow={handleFollow}
      />
    </>
  );
}
