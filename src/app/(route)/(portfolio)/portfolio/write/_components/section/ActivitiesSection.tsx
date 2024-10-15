'use client';

import { useState } from 'react';
import Image from 'next/image';
import ActivityItem from '../items/ActivityItem';

export default function ActivitiesSection() {
  const [activityItems, setActivityItems] = useState([<ActivityItem key={0} />]);

  const addActivityItem = () => {
    setActivityItems([...activityItems, <ActivityItem key={activityItems.length} />]);
  };

  return (
    <div className="mt-5">
      <div className="flex justify-between items-center">
        <h1 className="pre-3xl-semibold">교육 | 대외활동</h1>
        <button type="button" onClick={addActivityItem} className="flex-center text-[16px] hover:text-primary-4 ">
          <Image
            src="/assets/add-button.svg"
            alt="교육 및 대외활동 추가"
            width={30}
            height={30}
            className=" hover-animation mr-[10px] "
          />
          활동 추가
        </button>
      </div>
      <div className="h-[2px] w-full bg-gray-5 my-[20px]" />
      {activityItems}
    </div>
  );
}
