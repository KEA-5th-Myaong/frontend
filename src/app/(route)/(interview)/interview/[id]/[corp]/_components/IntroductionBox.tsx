import { motion } from 'framer-motion';
import Icons from '../../../../../../_components/ui/Icon';
import { ArrowIcon } from '../../../../../../_components/ui/iconPath';
import { IntroductionBoxProps } from '../_types/corp';

export default function IntroductionBox({ introduction, onClick }: IntroductionBoxProps) {
  return (
    <motion.button
      className="flex gap-10 justify-between self-stretch w-full min-w-[333px] max-w-[735px] h-32 bg-gray-4 text-start rounded-[10px] pl-8 pr-3 pt-8 lg:pt-6 xl:pt-8 pb-4 lg:pb-6 overflow-scroll hide-scrollbar cursor-pointer"
      onClick={onClick}
      type="button"
    >
      <div className="flex flex-col h-full justify-between">
        <p className="font-semibold overflow-scroll hide-scrollbar">{introduction}</p>

        <div className="flex text-xs text-gray-0 gap-7">
          <p>작성일자 2024.10.16</p>
          <p>수정일자 2024.10.18</p>
        </div>
      </div>
      <div className="flex self-center items-center gap-2 font-semibold bg-primary-1 p-2 lg:py-3 lg:pl-5 lg:pr-2 text-white-0 whitespace-nowrap rounded-[28px]">
        <p className="hidden lg:block">면접 시작</p>
        <Icons fill="none" className="border border-gray-2 rounded-full rotate-180" name={ArrowIcon} />
      </div>
    </motion.button>
  );
}