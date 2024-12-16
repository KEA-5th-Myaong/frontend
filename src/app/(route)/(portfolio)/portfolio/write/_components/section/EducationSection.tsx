'use client';

import { useState } from 'react';
import Image from 'next/image';
import { UseFormRegister } from 'react-hook-form';
import EducationItem from '../items/EducationItem';
import { PortfolioFormProps } from '@/app/_types/portfolio';

interface EducationItemState {
  id: number;
  component: JSX.Element;
}

interface EducationSectionProps {
  register: UseFormRegister<PortfolioFormProps>;
}

export default function EducationSection({ register }: EducationSectionProps) {
  const deleteEducationItem = (id: number) => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    setEducationItems(educationItems.filter((item) => item.id !== id));
  };

  const [educationItems, setEducationItems] = useState<EducationItemState[]>([
    { id: 0, component: <EducationItem register={register} key={0} id={0} onDelete={deleteEducationItem} /> },
  ]);

  const addEducationItem = () => {
    if (educationItems.length < 20) {
      // 최대 20개로 제한
      const newItemId = educationItems.length;
      setEducationItems([
        ...educationItems,
        {
          id: newItemId,
          component: (
            <EducationItem register={register} key={newItemId} id={newItemId} onDelete={deleteEducationItem} />
          ),
        },
      ]);
    }
  };
  return (
    <div className="mt-10">
      <div className="flex justify-between items-center">
        <h1 className="pre-3xl-semibold">학력</h1>
        <button type="button" onClick={addEducationItem} className="flex-center hover:text-primary-1 ">
          <Image
            src="/assets/add-button.svg"
            alt="학력 추가"
            width={30}
            height={30}
            className=" hover-animation mr-2.5 "
          />
          학력 추가
        </button>
      </div>
      <div className="h-[2px] w-full bg-gray-5  dark:bg-black-4 my-[20px]" />
      {educationItems.map((item) => item.component)}
    </div>
  );
}
