import { useRouter } from 'next/navigation';
import Icons from '../../../../../../_components/ui/Icon';
import { PlusIcon } from '../../../../../../_components/ui/iconPath';
import { User } from '@/app/_hooks/useMe';
import usePSStore from '@/app/(route)/(personal-statement)/_store/psStore';

export default function PSListHeader({ userData, psLength }: { userData: User | undefined; psLength: number }) {
  const router = useRouter();
  const { resetPSData } = usePSStore();

  function handleCreateButton() {
    resetPSData();
    router.push(`/personal-statement/${userData?.data.username}/create?edit=false`);
  }

  return (
    <div className="flex justify-between items-center w-full px-2 sm:pr-4 max-w-[1000px] min-w-[360px]">
      <div className="flex items-center">
        <div className="bg-black-0 w-[3px] h-10 mr-6" />
        <div className="flex flex-col justify-center w-full">
          <h1 className="font-semibold text-left">자기소개서 관리</h1>
          <p className="text-left text-gray-0 text-[12px]">최대 3개까지 생성 가능합니다</p>
        </div>
      </div>
      {psLength < 3 && (
        <button
          type="button"
          onClick={handleCreateButton}
          className="flex items-center gap-3 py-4 px-7 rounded-[28px] text-xs sm:text-base primary-1-btn"
        >
          <Icons name={{ ...PlusIcon, fill: '#fff', options: { ...PlusIcon.options, stroke: '#fff' } }} />

          <div className="flex">
            <p className="hidden sm:block">자기소개서</p>&nbsp; 추가
          </div>
        </button>
      )}
    </div>
  );
}
