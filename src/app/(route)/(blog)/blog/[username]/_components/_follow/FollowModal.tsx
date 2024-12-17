import Image from 'next/image';
import { motion } from 'framer-motion';
import Overlay from '../../../../../../_components/Overlay';
import defaultProfilePic from '../../../../../../../../public/mascot.png';
import { User } from '@/app/_hooks/useMe';

interface FollowUserProps {
  followed: boolean;
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

export default function FollowModal({ isOpen, onClose, title, list, userData, isMe, handleFollow }: FollowModalProps) {
  if (!isOpen) return null;
  const MyId = userData?.data?.memberId;
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
                  onClick={() => handleFollow(followList.memberId)}
                  className="pre-2xl-medium primary-1-btn py-2 px-6 rounded-[10px] hover:bg-primary-2"
                >
                  팔로잉
                </button>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </Overlay>
  );
}
