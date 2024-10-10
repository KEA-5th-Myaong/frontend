import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import MoreOptions from '../../../../../../_components/MoreOptions';
import Icons from '../../../../../../_components/ui/Icon';
import { MoreIcon } from '../../../../../../_components/ui/iconPath';
import useClickOutside from '../../../../../../_hooks/useClickOutside';
import { PSListBoxProps } from '../_types/psList';

export default function PSListBox({ id, title, job, content, created_at }: PSListBoxProps) {
  const router = useRouter();
  const [showDropDown, setShowDropDown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside({
    ref: dropdownRef,
    callback: () => setShowDropDown(false),
  });

  const handlePSListBoxClick = () => {
    router.push(`/personal-statement/${id}/read`);
  };

  return (
    <div
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handlePSListBoxClick();
        }
      }}
      onClick={handlePSListBoxClick}
      className="flex justify-between px-8 pb-4 pt-10 border border-gray-2 rounded-lg bg-white-0 cursor-pointer"
      tabIndex={0}
    >
      <div className="flex flex-col gap-3 w-2/3">
        <div className="flex items-center gap-4">
          <p className="font-semibold text-xl">{title}</p>
          <div className="bg-primary-1 rounded-md px-5 py-1 text-xs text-white-0">지원직무 : {job}</div>
        </div>

        <p className="text-gray-0 text-sm">{content}</p>
        <p className="text-gray-0 text-sm pt-4">{created_at} 등록</p>
      </div>

      <div className="relative" ref={dropdownRef}>
        <Icons
          onClick={() => {
            setShowDropDown((prev) => !prev);
          }}
          className="cursor-pointer"
          name={MoreIcon}
        />

        {showDropDown && <MoreOptions />}
      </div>
    </div>
  );
}
