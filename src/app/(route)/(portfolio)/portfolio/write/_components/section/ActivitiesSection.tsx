'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import ActivityItem from '../items/ActivityItem';

interface ActivityItemState {
  id: number;
  component: JSX.Element;
}

export default function ActivitiesSection() {
  const deleteActivityItem = (id: number) => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    setActivityItems(activityItems.filter((item) => item.id !== id));
  };

  const [activityItems, setActivityItems] = useState<ActivityItemState[]>([
    { id: 0, component: <ActivityItem key={0} id={0} onDelete={deleteActivityItem} /> },
  ]);

  const addActivityItem = () => {
    if (activityItems.length < 20) {
      // 최대 20개로 제한
      const newItemId = activityItems.length;
      setActivityItems([
        ...activityItems,
        { id: newItemId, component: <ActivityItem key={newItemId} id={newItemId} onDelete={deleteActivityItem} /> },
      ]);
    } else {
      alert('활동은 최대 20개까지 추가할 수 있습니다.'); // 경고 메시지
    }
  };

  return (
    <div className="mt-10">
      <div className="flex justify-between items-center">
        <h1 className="pre-3xl-semibold">교육 | 대외활동</h1>
        <button type="button" onClick={addActivityItem} className="flex-center  hover:text-primary-4">
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
