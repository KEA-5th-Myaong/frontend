'use client';

import { useRouter } from 'next/navigation';
import Icons from '../../../../../../_components/ui/Icon';
import { EyeIcon } from '../../../../../../_components/ui/iconPath';

export default function BackButton() {
  const router = useRouter();
  return (
    <div className="flex items-center gap-[9px] pb-6 font-semibold">
      <Icons className="cursor-pointer" onClick={router.back} name={EyeIcon} />
      뒤로가기
    </div>
  );
}
