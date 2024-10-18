'use client';

import { useRouter } from 'next/navigation';
import Icons from './ui/Icon';
import { ArrowIcon } from './ui/iconPath';

export default function BackButton({ className, onBtnClick }: { className?: string; onBtnClick?: () => void }) {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={onBtnClick || router.back}
      className={`flex items-center gap-[9px] font-semibold ${className}`}
    >
      <Icons className="cursor-pointer border border-gray-1 rounded-full" name={ArrowIcon} />
      뒤로가기
    </button>
  );
}
