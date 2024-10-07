import { motion } from 'framer-motion';
import { FollowProps } from '../../_types/blog';
import Overlay from '../../../../../../_components/Overlay';

interface FollowModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  list: FollowProps[];
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

  return (
    <Overlay onClick={onClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        {...followMotion}
        className="flex m-4 min-w-[300px] max-w-[510px] w-full pt-14 pb-4 px-10 flex-col items-start gap-8 rounded-2xl bg-white-0 shadow-md"
      >
        <p className="font-semibold text-2xl">{title}</p>

        <div className="flex flex-col gap-6 w-full h-[514px] overflow-scroll pb-2 hide-scrollbar">
          {list.map((followList) => (
            <div key={followList.id} className="flex items-center gap-5">
              <div className="w-[52px] h-[52px] min-w-[52px] max-h-[52px] bg-purple-300 rounded-full " />
              <p className="font-medium text-lg whitespace-nowrap text-ellipsis">{followList.name}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </Overlay>
  );
}
