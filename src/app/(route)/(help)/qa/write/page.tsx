'use client';

import { useState } from 'react';
import Link from 'next/link';
import BackButton from '@/app/_components/BackButton';
import Icons from '@/app/_components/ui/Icon';
import { CheckIcon } from '@/app/_components/ui/iconPath';

export default function QAWrite() {
  const [isLock, setIsLock] = useState(false);
  const [contentsData, setContentsData] = useState('');
  const [countLength, setCountLength] = useState(0);

  function handleContentChange(e: { target: { value: string } }) {
    const { value } = e.target;
    setContentsData(value);
    setCountLength(value.length);
  }

  return (
    <div className="relative flex-col w-full max-w-[1000px] min-w-[360px]: mx-10 md:my-7 my-32 ">
      {/* 문의작성 title */}
      <div className="flex-col h-24 py-1">
        <BackButton />
        <div className="relative flex w-full font-semibold text-3xl pt-7 py-10">
          문의 작성
          <div>
            <div className="absolute right-2 font-light text-sm pt-10">
              <div className="flex row-auto items-center">
                <button
                  type="button"
                  className="relative p-1.5 border-2 border-black-1 mr-1 rounded-sm"
                  onClick={() => {
                    setIsLock((prev) => !prev);
                  }}
                >
                  <div className="absolute top-0 left-0">
                    {isLock && <Icons name={CheckIcon} className="flex w-3 h-3" />}
                  </div>
                </button>
                비밀글로 작성
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full pt-7 pb-4">
        <textarea
          className="resize-none px-[18px] pt-5 w-full border min-h-[60px] placeholder:text-gray-3 focus:outline-none text-lg"
          placeholder="문의 제목을 입력해주세요."
          maxLength={50}
        />
      </div>
      <div className="flex w-full pb-2">
        <textarea
          className="resize-none px-[18px] pt-6 w-full border h-[420px] placeholder:text-gray-3 focus:outline-none text-lg"
          placeholder="문의 내용을 입력해주세요."
          maxLength={1000}
          onChange={handleContentChange}
          value={contentsData}
        />
      </div>
      <div>{countLength}/1000</div>
      <div className="absolute right-1">
        <Link href="/qa/write">
          <div className="flex-center py-4 px-10 rounded-[28px] primary-1-btn hover-animation">작성 완료</div>
        </Link>
      </div>
    </div>
  );
}
