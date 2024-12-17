import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Overlay from '../../../../../../_components/Overlay';
import defaultProfilePic from '../../../../../../../../public/mascot.png';
import { User } from '@/app/_hooks/useMe';

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
interface FollowUserProps {
  followed?: boolean;
  following?: boolean; // following 추가
  memberId: number;
  nickname: string;
  profilePicUrl: string;
}

interface FollowModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  list: FollowUserProps[];
  userData: User | undefined;
  isMe?: boolean;
  handleFollow: (memberId: number) => void;
}

export default function FollowModal({ isOpen, onClose, title, list, userData, isMe, handleFollow }: FollowModalProps) {
  const [followState, setFollowState] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    // 초기 following 상태를 state에 설정
    const initialState = list?.reduce(
      (acc, user) => ({
        ...acc,
        [user.memberId]: user.following || user.followed || false,
      }),
      {},
    );
    setFollowState(initialState || {});
  }, [list]);

  if (!isOpen) return null;
  const MyId = userData?.data?.memberId;

  const handleFollowClick = (memberId: number) => {
    setFollowState((prev) => ({
      ...prev,
      [memberId]: !prev[memberId],
    }));
    handleFollow(memberId);
  };

  return (
    <Overlay onClick={onClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        {...followMotion}
        className="flex m-4 min-w-[300px] max-w-[510px] w-full pt-14 pb-4 px-10 flex-col items-start gap-8 rounded-2xl dark:bg-black-4 bg-white-0 shadow-md"
      >
        <p className="font-semibold text-2xl">{title}</p>

        <div className="flex flex-col gap-6 w-full h-[514px] overflow-scroll pb-2 hide-scrollbar">
          {list?.map((followList) => (
            <div key={followList.memberId} className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <Image
                  className="rounded-full mr-5"
                  src={followList.profilePicUrl || defaultProfilePic.src}
                  alt="프로필사진"
                  width={52}
                  height={52}
                  unoptimized
                />
                <p className="font-medium min-w-[180px] max-w-[240px] text-lg overflow-hidden text-ellipsis whitespace-nowrap flex-grow">
                  {followList.nickname}
                </p>
              </div>
              {!isMe && MyId !== followList?.memberId && (
                <button
                  type="button"
                  onClick={() => handleFollowClick(followList.memberId)}
                  className={`pre-2xl-medium text-white-0 ${
                    followState[followList.memberId] ? 'bg-gray-0 hover:bg-gray-1' : 'bg-primary-1 hover:bg-primary-2'
                  } py-2 px-6 rounded-[10px]`}
                >
                  {followState[followList.memberId] ? '언팔로우' : '팔로우'}
                </button>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </Overlay>
  );
}
