'use client';

import { useState } from 'react';
import Image from 'next/image';
import { UseFormRegister } from 'react-hook-form';
import LinkItem from '../items/LinkItem';
import { PortfolioProps } from '@/app/_types/portfolio';

interface LinkItemState {
  id: number;
  component: JSX.Element;
}

interface LinksSectionProps {
  register: UseFormRegister<PortfolioProps>;
}

export default function LinksSection({ register }: LinksSectionProps) {
  const deleteLinkItem = (id: number) => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    setLinkItems(linkItems.filter((item) => item.id !== id));
  };

  const [linkItems, setLinkItems] = useState<LinkItemState[]>([
    { id: 0, component: <LinkItem register={register} key={0} id={0} onDelete={deleteLinkItem} /> },
  ]);

  const addLinkItem = () => {
    if (linkItems.length < 50) {
      // 최대 20개로 제한
      const newItemId = linkItems.length;
      setLinkItems([
        ...linkItems,
        {
          id: newItemId,
          component: <LinkItem register={register} key={newItemId} id={newItemId} onDelete={deleteLinkItem} />,
        },
      ]);
    } else {
      alert('링크 항목은 최대 50개까지 추가할 수 있습니다.'); // 경고 메시지
    }
  };

  return (
    <div className="mt-10">
      <div className="flex justify-between items-center">
        <h1 className="pre-3xl-semibold">링크</h1>
      </div>
      <div className="h-[2px] w-full bg-gray-5 my-[20px]" />
      <div className="flex flex-col items-center">
        {linkItems.map((item) => item.component)}
        <Image
          src="/assets/add-button.svg"
          alt="링크 추가"
          width={40}
          height={40}
          className="hover-animation mr-2.5 mt-[20px]"
          onClick={addLinkItem}
        />
      </div>
    </div>
  );
}
