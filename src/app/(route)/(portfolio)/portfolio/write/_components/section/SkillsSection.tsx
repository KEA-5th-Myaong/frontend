import Icons from '@/app/_components/ui/Icon';
import { XIcon } from '@/app/_components/ui/iconPath';
import { useState, ChangeEvent, KeyboardEvent } from 'react';

export default function SkillsSection() {
  const [skill, setSkill] = useState<string>('');
  const [skills, setSkills] = useState<string[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSkill(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && skill.trim() !== '') {
      setSkills((prevSkills) => [...prevSkills, skill]);
      setSkill(''); // 입력 후 입력 필드를 비움
    }
  };

  const handleDeleteSkill = (skillToDelete: string) => {
    setSkills((prevSkills) => prevSkills.filter((skillItem) => skillItem !== skillToDelete));
  };

  return (
    <div className="mt-5">
      <div className="flex justify-between items-center">
        <h1 className="pre-3xl-semibold">기술</h1>
      </div>
      <div className="h-[2px] w-full bg-gray-5 my-[20px]" />
      <input
        type="text"
        value={skill}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="기술 스택을 입력해주세요"
        className="w-full bg-white-0 mt-[8px] px-[20px] py-[12px] text-[14px] font-semibold text-black-0 border border-[1px] border-gray-5 rounded-[10px] focus:outline-none focus:border-primary-4 focus:border-[2px]"
      />
      <ul className="flex gap-[10px] mt-4">
        {skills.map((skillItem) => (
          <li className="flex items-center bg-gray-4 px-[15px] py-[8px] rounded-[15px] mb-1 gap-[10px]">
            {skillItem}
            <Icons name={XIcon} className="cursor-pointer" onClick={() => handleDeleteSkill(skillItem)} />
          </li>
        ))}
      </ul>
    </div>
  );
}
