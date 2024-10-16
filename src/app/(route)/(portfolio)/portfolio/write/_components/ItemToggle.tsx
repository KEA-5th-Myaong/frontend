import Icons from '@/app/_components/ui/Icon';
import { RequiredIcon } from '@/app/_components/ui/iconPath';
import Toggle from './Toggle';

export default function ItemToggle() {
  return (
    <div className="w-[250px] h-auto y-[20px] px-[30px] py-[20px] bg-white-0 rounded-[10px] border border-[1px] border-gray-5 ">
      <div className="px-[10px] py-[10px] font-semibold text-[16px] bg-gray-4 rounded-[10px]">항목 편집</div>
      <div className="px-[10px] py-[10px] flex items-center gap-[10px]">
        <Icons name={RequiredIcon} />
        기본 정보
      </div>
      <div className="px-[10px] py-[10px]  flex items-center gap-[10px]">
        <Icons name={RequiredIcon} />
        학력
      </div>
      <div className="flex justify-between items-center pl-[10px] py-[10px]">
        관심 직무
        <Toggle />
      </div>
      <div className="flex justify-between items-center pl-[10px] py-[10px]">
        경력
        <Toggle />
      </div>
      <div className="flex justify-between items-center pl-[10px] py-[10px]">
        링크
        <Toggle />
      </div>
      <div className="flex justify-between items-center pl-[10px] py-[10px]">
        기술
        <Toggle />
      </div>
      <div className="flex justify-between items-center pl-[10px] py-[10px]">
        자격증
        <Toggle />
      </div>
      <div className="flex justify-between items-center pl-[10px] py-[10px]">
        교육 | 대외활동
        <Toggle />
      </div>
      <div className="flex justify-between items-center pl-[10px] py-[10px]">
        자기소개서
        <Toggle />
      </div>
    </div>
  );
}
