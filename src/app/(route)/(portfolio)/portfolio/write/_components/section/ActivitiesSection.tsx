'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { UseFormRegister } from 'react-hook-form';
import ActivityItem from '../items/ActivityItem';
import { PortfolioFormProps } from '@/app/_types/portfolio';

interface ActivityItemState {
  id: number;
  component: JSX.Element;
}

interface ActivitiesSectionProps {
  register: UseFormRegister<PortfolioFormProps>;
}

export default function ActivitiesSection({ register }: ActivitiesSectionProps) {
  const deleteActivityItem = (id: number) => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    setActivityItems(activityItems.filter((item) => item.id !== id));
  };

  const [activityItems, setActivityItems] = useState<ActivityItemState[]>([
    { id: 0, component: <ActivityItem register={register} key={0} id={0} onDelete={deleteActivityItem} /> },
  ]);

  const addActivityItem = () => {
    if (activityItems.length < 20) {
      // 최대 20개로 제한
      const newItemId = activityItems.length;
      setActivityItems([
        ...activityItems,
        {
          id: newItemId,
          component: <ActivityItem register={register} key={newItemId} id={newItemId} onDelete={deleteActivityItem} />,
        },
      ]);
    } else {
      alert('활동은 최대 20개까지 추가할 수 있습니다.'); // 경고 메시지
    }
  };

  return (
    <div className="mt-10">
      <div className="flex justify-between items-center">
        <h1 className="pre-3xl-semibold">교육 | 대외활동</h1>
        <button type="button" onClick={addActivityItem} className="flex-center  hover:text-primary-1">
          <Image
            src="/assets/add-button.svg"
            alt="교육 및 대외활동 추가"
            width={30}
            height={30}
            className="hover-animation mr-2.5"
          />
          활동 추가
        </button>
      </div>
      <div className="h-[2px] w-full bg-gray-5  dark:bg-black-4  my-[20px]" />

      {activityItems.map((item) => item.component)}
    </div>
  );
}
