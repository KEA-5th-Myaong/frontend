'use client';

import { useState } from 'react';
import Image from 'next/image';
import LinkItem from '../items/LinkItem';

export default function LinksSection() {
  const [linkItems, setLinkItems] = useState([<LinkItem key={0} />]);

  const addLinkItem = () => {
    setLinkItems([...linkItems, <LinkItem key={linkItems.length} />]);
  };

  return (
    <div className="mt-5">
      <div className="flex justify-between items-center">
        <h1 className="pre-3xl-semibold">링크</h1>
      </div>
      <div className="h-[2px] w-full bg-gray-5 my-[20px]" />
      <div className="flex flex-col items-center">
        {linkItems}
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
