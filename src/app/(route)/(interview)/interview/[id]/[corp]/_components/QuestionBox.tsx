import { motion } from 'framer-motion';
import Icons from '../../../../../../_components/ui/Icon';
import { ArrowIcon } from '../../../../../../_components/ui/iconPath';
import { QuestionBoxProps } from '../_types/corp';

export default function QuestionBox({ question, onClick }: QuestionBoxProps) {
  return (
    <motion.button
      className="flex gap-10 justify-between self-stretch w-full min-w-[333px] max-w-[735px] h-32 text-start border border-primary-1 rounded-[10px] pl-8 pr-3 py-8 lg:py-6 xl:py-8 overflow-scroll hide-scrollbar cursor-pointer"
      onClick={onClick}
      type="button"
    >
      <p className="font-semibold overflow-scroll hide-scrollbar">{question}</p>
      <div className="flex gap-2 font-semibold text-gray-2 whitespace-nowrap">
        <p className="hidden lg:block">면접 생성</p>
        <Icons className="border border-gray-2 rounded-full rotate-180" name={ArrowIcon} />
      </div>
    </motion.button>
  );
}
