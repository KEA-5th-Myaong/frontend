'use client';

import { useState } from 'react';
import Image from 'next/image';
import { UseFormRegister } from 'react-hook-form';
import ExperienceItem from '../items/ExperienceItem';
import { PortfolioFormProps } from '@/app/_types/portfolio';

interface ExperienceItemState {
  id: number;
  component: JSX.Element;
}

interface ExperienceSectionProps {
  register: UseFormRegister<PortfolioFormProps>;
}

export default function ExperienceSection({ register }: ExperienceSectionProps) {
  const deleteExperienceItem = (id: number) => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    setExperienceItems(experienceItems.filter((item) => item.id !== id));
  };

  const [experienceItems, setExperienceItems] = useState<ExperienceItemState[]>([
    { id: 0, component: <ExperienceItem register={register} key={0} id={0} onDelete={deleteExperienceItem} /> },
  ]);
  const addExperienceItem = () => {
    if (experienceItems.length < 20) {
      // 최대 20개로 제한
      const newItemId = experienceItems.length;
      setExperienceItems([
        ...experienceItems,
        {
          id: newItemId,
          component: (
            <ExperienceItem register={register} key={newItemId} id={newItemId} onDelete={deleteExperienceItem} />
          ),
        },
      ]);
    }
  };

  return (
    <div className="mt-10">
      <div className="flex justify-between items-center">
        <h1 className="pre-3xl-semibold">경력</h1>
        <button type="button" onClick={addExperienceItem} className="flex-center hover:text-primary-1 ">
          <Image
            src="/assets/add-button.svg"
            alt="경력 추가"
            width={30}
            height={30}
            className=" hover-animation mr-2.5 "
          />
          경력 추가
        </button>
      </div>
      <div className="h-[2px] w-full bg-gray-5  dark:bg-black-4  my-[20px]" />

      {experienceItems.map((item) => item.component)}
    </div>
  );
}
