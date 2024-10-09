'use client';

import { useRouter } from 'next/navigation';
import Icons from './ui/Icon';
import { ArrowIcon } from './ui/iconPath';

export default function BackButton({ className }: { className?: string }) {
  const router = useRouter();
  return (
    <div className={`flex items-center gap-[9px] pb-6 font-semibold ${className}`}>
      <Icons className="cursor-pointer border border-gray-1 rounded-full" onClick={router.back} name={ArrowIcon} />
      뒤로가기
    </div>
  );
}
