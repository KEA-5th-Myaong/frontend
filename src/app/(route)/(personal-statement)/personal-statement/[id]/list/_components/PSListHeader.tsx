'use client';

import { useRouter } from 'next/navigation';
import Icons from '../../../../../../_components/ui/Icon';
import { PlusIcon } from '../../../../../../_components/ui/iconPath';

export default function PSListHeader({ psLength }: { psLength: number }) {
  const router = useRouter();
  return (
    <div className="flex justify-between items-center w-full px-2 sm:pr-4 max-w-[1000px] min-w-[360px]">
      <div className="flex flex-col justify-between h-full pl-2 sm:pl-4 pt-3">
        <p className="font-semibold">자기소개서 관리</p>
        <p className="text-xs text-gray-0">최대 3개까지 생성 가능합니다.</p>
      </div>
      {psLength < 3 && (
        <button
          type="button"
          onClick={() => router.push('/personal-statement/1/create')}
          className="flex items-center gap-3 p-2 sm:p-4 rounded-[28px] text-xs sm:text-base primary-1-btn"
        >
          <Icons name={{ ...PlusIcon, fill: '#fff', options: { ...PlusIcon.options, stroke: '#fff' } }} />
          자기소개서 추가
        </button>
      )}
    </div>
  );
}
