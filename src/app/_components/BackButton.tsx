'use client';

import { useRouter } from 'next/navigation';
import Icons from './ui/Icon';
import { ArrowIcon } from './ui/iconPath';

export default function BackButton({ className, onBtnClick }: { className?: string; onBtnClick?: () => void }) {
  const router = useRouter();
  return (
    <div className={`flex items-center gap-[9px] font-semibold ${className}`}>
      <Icons
        className="cursor-pointer border border-gray-1 rounded-full"
        onClick={onBtnClick || router.back}
        name={ArrowIcon}
      />
      뒤로가기
    </div>
  );
}
