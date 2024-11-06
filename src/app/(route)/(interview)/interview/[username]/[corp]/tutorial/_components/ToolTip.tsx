import Image from 'next/image';
import { motion } from 'framer-motion';
import { toolTipVariants } from '../../_utils/interviewVariants';

export default function Tooltip({ msg1, msg2, className }: { msg1: string; msg2: string; className?: string }) {
  return (
    <motion.div
      variants={toolTipVariants}
      initial="hidden"
      animate="visible"
      className={`absolute flex flex-col items-center pt-2 pb-4 px-6 bg-white-0 ${className || 'left-0 bottom-14'}  
                    border border-[#D8E6F1] rounded-[28px] text-center font-semibold text-[#8A8A8A] text-[11px] z-50`}
    >
      <div className="w-12 h-12 flex-shrink-0">
        <Image width={48} height={48} src="/mascot.png" alt="이미지" className="w-full h-full object-contain" />
      </div>
      <p>{msg1}</p>
      <p>{msg2}</p>
    </motion.div>
  );
}
