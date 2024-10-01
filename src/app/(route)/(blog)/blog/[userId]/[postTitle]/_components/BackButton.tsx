'use client';

import { useRouter } from 'next/navigation';
import Icons from '../../../../../../_components/ui/Icon';
import { ArrowIcon } from '../../../../../../_components/ui/iconPath';

export default function BackButton() {
  const router = useRouter();
  return (
    <div className="flex items-center gap-[9px] pb-6 font-semibold">
      <Icons className="cursor-pointer border border-gray-1 rounded-full" onClick={router.back} name={ArrowIcon} />
      뒤로가기
    </div>
  );
}
