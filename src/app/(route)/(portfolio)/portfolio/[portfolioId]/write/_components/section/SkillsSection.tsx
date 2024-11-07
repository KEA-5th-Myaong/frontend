import { useState, ChangeEvent, KeyboardEvent } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import Icons from '@/app/_components/ui/Icon';
import { XIcon } from '@/app/_components/ui/iconPath';

interface SkillSectionProps<T extends FieldValues> {
  register: UseFormRegister<T>;
}

export default function SkillsSection<T extends FieldValues>({ register }: SkillSectionProps<T>) {
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
      <div className="h-0.5 w-full bg-gray-5 my-5" />
      <input
        type="text"
        value={skill}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        maxLength={50}
        placeholder="기술 스택을 입력해주세요"
        className="w-full bg-white-0 mt-2 px-5 py-3 text-sm font-semibold text-black-0 border border-gray-5 rounded-[10px] focus:outline-none focus:border-primary-1 focus:border-2"
      />
      <ul className="flex gap-2.5 mt-4">
        {skills.map((skillItem) => (
          <li className="flex items-center bg-gray-4 px-[15px] py-2 rounded-[15px] mb-1 gap-2.5">
            {skillItem}
            <Icons name={XIcon} className="cursor-pointer" onClick={() => handleDeleteSkill(skillItem)} />
          </li>
        ))}
      </ul>
    </div>
  );
}
