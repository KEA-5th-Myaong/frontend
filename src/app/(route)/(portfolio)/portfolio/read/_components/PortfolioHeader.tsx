'use client';

import { useState } from 'react';

export default function PortfolioHeader() {
  const [selectedTitle, setSelectedTitle] = useState<string | null>('title1');

  const handleTitleClick = (title: string) => {
    setSelectedTitle(title);
    //TODO: 해당 링크로 이동
  };

  return (
    <div className="flex flex-col gap-2 w-full mt-10 sm:w-[calc(100%-28px)] md:w-[calc(100%-64px)] lg:w-[calc(100%-80px)] xl:w-[calc(100%-96px)]">
      <div className="flex justify-between w-full text-sm font-semibold">
        <button
          type="button"
          className={`cursor-pointer ${selectedTitle === 'title1' ? 'text-primary-0' : ''} hover-animation`}
          onClick={() => handleTitleClick('title1')}
        >
          포트폴리오 title1
          {selectedTitle === 'title1' && <div className="bg-primary-0 h-[2px] mt-1 w-full rounded-4" />}
        </button>
        <button
          type="button"
          className={`cursor-pointer ${selectedTitle === 'title2' ? 'text-primary-0' : ''} hover-animation`}
          onClick={() => handleTitleClick('title2')}
        >
          포트폴리오 title2
          {selectedTitle === 'title2' && <div className="bg-primary-0 h-[2px] mt-1 w-full rounded-4" />}
        </button>
        <button
          type="button"
          className={`cursor-pointer ${selectedTitle === 'title3' ? 'text-primary-0' : ''} hover-animation`}
          onClick={() => handleTitleClick('title3')}
        >
          포트폴리오 title3
          {selectedTitle === 'title3' && <div className="bg-primary-0 h-[2px] mt-1 w-full rounded-4" />}
        </button>
        <button
          type="button"
          className={`cursor-pointer ${selectedTitle === 'title4' ? 'text-primary-0' : ''} hover-animation`}
          onClick={() => handleTitleClick('title4')}
        >
          포트폴리오 title4
          {selectedTitle === 'title4' && <div className="bg-primary-0 h-[2px] mt-1 w-full rounded-4" />}
        </button>
      </div>
    </div>
  );
}
