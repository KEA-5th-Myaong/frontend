'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import ActivityItem from '../items/ActivityItem';

interface ActivityItemState {
  id: number;
  component: JSX.Element;
}

function ActivitiesSection() {
  const deleteActivityItem = (id: number) => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    setActivityItems(activityItems.filter((item) => item.id !== id));
  };

  const [activityItems, setActivityItems] = useState<ActivityItemState[]>([
    { id: 0, component: <ActivityItem key={0} id={0} onDelete={deleteActivityItem} /> },
  ]);

  const addActivityItem = () => {
    const newItemId = activityItems.length;
    setActivityItems([
      ...activityItems,
      { id: newItemId, component: <ActivityItem key={newItemId} id={newItemId} onDelete={deleteActivityItem} /> },
    ]);
  };

  return (
    <div className="mt-5">
      <div className="flex justify-between items-center">
        <h1 className="pre-3xl-semibold">교육 | 대외활동</h1>
        <button type="button" onClick={addActivityItem} className="flex-center text-[16px] hover:text-primary-4">
          <Image
            src="/assets/add-button.svg"
            alt="교육 및 대외활동 추가"
            width={30}
            height={30}
            className="hover-animation mr-[10px]"
          />
          활동 추가
        </button>
      </div>
      <div className="h-[2px] w-full bg-gray-5 my-[20px]" />

      {activityItems.map((item) => item.component)}
    </div>
  );
}

export default ActivitiesSection;
