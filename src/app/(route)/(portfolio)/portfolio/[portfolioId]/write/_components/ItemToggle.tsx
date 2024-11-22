import Icons from '@/app/_components/ui/Icon';
import { RequiredIcon } from '@/app/_components/ui/iconPath';
import Toggle from './Toggle';
import useToggleStore from '@/app/_store/portfolioToggle';

export default function ItemToggle() {
  const { toggles, setToggle } = useToggleStore();
  return (
    <div className="sticky top-20 custom-shadow z-20 w-[300px] h-[500px] y-[20px] px-[30px] py-5 bg-white-0 rounded-[10px] border border-gray-5 ">
      <div className="p-2.5 font-semibold  bg-gray-4 rounded-[10px]">항목 편집</div>
      <div className="p-2.5 flex items-center gap-2.5">
        <Icons name={RequiredIcon} />
        기본 정보
      </div>
      <div className="p-2.5  flex items-center gap-2.5">
        <Icons name={RequiredIcon} />
        학력
      </div>
      <div className="item-toggle ">관심 직무</div>
      <div className="item-toggle ">
        경력
        <Toggle onToggle={() => setToggle('experience')} isChecked={toggles.experience} />
      </div>
      <div className="item-toggle ">
        링크
        <Toggle onToggle={() => setToggle('links')} isChecked={toggles.links} />
      </div>
      <div className="item-toggle ">
        기술
        <Toggle onToggle={() => setToggle('skills')} isChecked={toggles.skills} />
      </div>
      <div className="item-toggle ">
        자격증
        <Toggle onToggle={() => setToggle('certifications')} isChecked={toggles.certifications} />
      </div>
      <div className="item-toggle ">
        교육 | 대외활동
        <Toggle onToggle={() => setToggle('activities')} isChecked={toggles.activities} />
      </div>
      <div className="item-toggle ">
        자기소개서
        <Toggle onToggle={() => setToggle('personalStatement')} isChecked={toggles.personalStatement} />
      </div>
    </div>
  );
}
