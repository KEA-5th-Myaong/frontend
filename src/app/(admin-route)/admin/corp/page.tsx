'use client';

import { useState } from 'react';
import Icons from '@/app/_components/ui/Icon';
import { SearchIcon, ArrowCircleIcon, TrashIcon, EditIcon } from '@/app/_components/ui/iconPath';
import testData from './test.json';
import { initailModalState } from '@/app/_components/Modal';

export default function AdminCorp() {
  const [editModalOpen, setEditModalOpen] = useState(initailModalState);

  function handleEditModal() {
    console.log(editModalOpen);
    setEditModalOpen((prev) => ({
      ...prev,
      open: true,
      topText: '숨김 처리가 해제 되었습니다.',
      btnText: '확인',
      onBtnClick: () => setEditModalOpen(initailModalState),
    }));
  }

  return (
    <div className="flex gap-2.5 w-full pl-12 pb-40">
      <div className="w-full min-w-[545px] px-6 py-8 bg-white-0 border border-gray-5">
        {/* title */}
        <div className="text-2xl border-b border-gray-5 pb-4 mb-5 w-full font-semibold ">기업 관리</div>
        {/* 검색 */}
        <div className="flex border-b-2 border-black-0 w-full max-w-[25%]">
          <div className="flex justify-start  py-5  ">
            <Icons name={{ ...SearchIcon, fill: '#00000' }} />
          </div>
        </div>
        <div className="flex-col mt-2 h-[600px] max-w-[50%] border-gray-5 border">
          <div className="flex px-12 bg-gray-5 py-4 w-full text-sm font-semibold">기업명</div>
          <div className="my-2">
            {testData.corpList.map((item) => (
              <div className="flex items-center w-full h-11">
                <Icons name={ArrowCircleIcon} className="flex justify-center h-5 w-[10%]" />
                <div className="flex w-[76%] item-center">
                  {item.name}
                  <button type="button" onClick={handleEditModal} className="flex gap-1.5 items-center">
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
        </div>
      </div>
    </div>
  );
}
