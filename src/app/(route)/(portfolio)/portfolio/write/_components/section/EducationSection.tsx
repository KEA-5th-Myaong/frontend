'use client';

import { useState } from 'react';
import Image from 'next/image';
import EducationItem from '../items/EducationItem';

export default function EducationSection() {
  const [educationItems, setEducationItems] = useState([<EducationItem key={0} />]);

  const addEducationItem = () => {
    setEducationItems([...educationItems, <EducationItem key={educationItems.length} />]);
  };

  return (
    <div className="mt-5">
      <div className="flex justify-between items-center">
        <h1 className="pre-3xl-semibold">학력</h1>
        <button type="button" onClick={addEducationItem} className="flex-center text-[16px] hover:text-primary-4 ">
          <Image
            src="/assets/add-button.svg"
            alt="학력 추가"
            width={30}
            height={30}
            className=" hover-animation mr-[10px] "
          />
          학력 추가
        </button>
      </div>
      <div className="h-[2px] w-full bg-gray-5 my-[20px]" />
      {educationItems}
    </div>
  );
}
