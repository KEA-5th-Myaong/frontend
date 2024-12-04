'use client';

import Icons from '@/app/_components/ui/Icon';
import { SearchIcon, ArrowCircleIcon, TrashIcon, EditIcon } from '@/app/_components/ui/iconPath';
import testData from './test.json';

export default function AdminCorp() {
  // 임시* 이름 편집 함수
  function handleEdit() {}

  return (
    <div className="flex gap-2.5 w-full pl-12 pb-40">
      <div className="w-full min-w-[545px] px-6 py-8 bg-white-0 border border-gray-5">
        {/* title */}
        <div className="text-2xl border-b border-gray-5 pb-4 mb-5 w-full font-semibold ">기업 관리</div>
        {/* 검색 */}
        <div className="flex border-b-2 border-black-0 w-full max-w-[25%]">
          <div className="flex justify-start  py-2  ">
            <Icons name={{ ...SearchIcon, fill: '#00000' }} />
            {/* 검색어 입력시 / hover 색상 변경 필요 */}
            <textarea className="resize-none ml-3 px-[18px] w-full max-h-[30px]  placeholder:text-gray-3 focus:outline-none" />
          </div>
        </div>
        <div className="flex-col mt-2 h-[500px] max-w-[50%] border-gray-5 border">
          <div className="flex px-12 bg-gray-5 py-4 w-full text-sm font-semibold">기업명</div>
          <div className="my-2 h-full">
            <div className="flex-col h-[75%]">
              {testData.corpList.map((item) => (
                <div className="flex items-center w-full h-11">
                  <Icons name={ArrowCircleIcon} className="flex justify-center h-5 w-[15%]" />
                  <div className="flex w-[74%] item-center">
                    {item.name}
                    <button type="button" onClick={handleEdit} className="flex gap-1.5 items-center">
                      <Icons
                        name={{
                          ...EditIcon,
                          options: { ...EditIcon.options, stroke: '#757575', strokeWidth: 2 },
                        }}
                        className="h-full ml-3"
                      />
                    </button>
                  </div>
                  <Icons name={TrashIcon} className="h-6 w-[10%]" />
                </div>
              ))}
            </div>
            {/* 기업생성 */}
            <div className="flex h-[10%] items-center px-5">
              <textarea
                className="resize-none border-gray-2 px-[18px] py-2.5 w-full border max-h-[45px] rounded-xl placeholder:text-gray-3 focus:outline-none"
                placeholder="기업명"
              />
              <button
                type="button"
                className="px-14 ml-2 rounded-xl text-sm bg-black-3 text-white-0 h-full whitespace-nowrap"
              >
                기업생성
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
