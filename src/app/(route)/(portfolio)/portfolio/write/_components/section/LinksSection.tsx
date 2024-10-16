'use client';

import { useState } from 'react';
import Image from 'next/image';
import LinkItem from '../items/LinkItem';

interface LinkItemState {
  id: number;
  component: JSX.Element;
}

export default function LinksSection() {
  const deleteLinkItem = (id: number) => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    setLinkItems(linkItems.filter((item) => item.id !== id));
  };

  const [linkItems, setLinkItems] = useState<LinkItemState[]>([
    { id: 0, component: <LinkItem key={0} id={0} onDelete={deleteLinkItem} /> },
  ]);

  const addLinkItem = () => {
    const newItemId = linkItems.length;
    setLinkItems([
      ...linkItems,
      { id: newItemId, component: <LinkItem key={newItemId} id={newItemId} onDelete={deleteLinkItem} /> },
    ]);
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
          className="hover-animation mr-[10px] mt-[20px]"
          onClick={addLinkItem}
        />
      </div>
    </div>
  );
}
