import Image from 'next/image';
import { motion } from 'framer-motion';
import Overlay from '../../../../../../_components/Overlay';
import defaultProfilePic from '../../../../../../../../public/mascot.png';

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

export default function FollowModal({ isOpen, onClose, title, list }: FollowModalProps) {
  if (!isOpen) return null;

  const dummyList = ['김현중', '곽서연', '최현준', '조기헌', '강수진', '양시훈', '김민형', '먀옹', '카엔프'];
  return (
    <Overlay onClick={onClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        {...followMotion}
        className="flex m-4 min-w-[300px] max-w-[510px] w-full pt-14 pb-4 px-10 flex-col items-start gap-8 rounded-2xl bg-white-0 shadow-md"
      >
        <p className="font-semibold text-2xl">{title}</p>

        <div className="flex flex-col gap-6 w-full h-[514px] overflow-scroll pb-2 hide-scrollbar">
          {dummyList?.map((followList, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <Image
                  className="rounded-full mr-5"
                  src={defaultProfilePic.src}
                  alt="프로필사진"
                  width={52}
                  height={52}
                  unoptimized
                />
                <p className="font-medium min-w-[180px] max-w-[240px] text-lg overflow-hidden text-ellipsis whitespace-nowrap flex-grow">
                  {dummyList[index]}
                </p>
              </div>

              <button
                type="button"
                className="pre-2xl-medium primary-1-btn py-2 px-6 rounded-[10px] hover:bg-primary-2"
              >
                팔로잉
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </Overlay>
  );
}
