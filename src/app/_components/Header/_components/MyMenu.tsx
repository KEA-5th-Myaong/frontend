import { useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useQueryClient } from '@tanstack/react-query';
import Icons from '../../ui/Icon';
import { ArrowIcon, SearchIcon, UserIcon } from '../../ui/iconPath';
import useClickOutside from '../../../_hooks/useClickOutside';
import { User } from '@/app/_hooks/useMe';
import Alarm from './Alarm';
import SubMenu from './SubMenu';
import ThemeToggle from '../../ThemeToggle';
import { useTheme } from '../../ThemeProvider';

interface MyMenuProps {
  handleMenuOpen: (menu: string | null) => void;
  openMenu: string | null;
  userData?: User;
}

export default function MyMenu({ handleMenuOpen, openMenu, userData }: MyMenuProps) {
  const { theme } = useTheme();
  const router = useRouter();
  const isLogined = userData?.data?.nickname;
  const queryClient = useQueryClient();

  const myPageMenuRef = useRef<HTMLDivElement>(null);
  const alarmRef = useRef<HTMLDivElement>(null);

  const [isOpenAlarm, setIsOpenAlarm] = useState(false);
  const [moreButtonOpen, setMoreButtonOpen] = useState(false);

  useClickOutside({
    ref: myPageMenuRef,
    callback: () => {
      handleMenuOpen(null);
    },
  });

  const handleLogout = async () => {
    try {
      // 로그아웃 처리
      Cookies.remove('accessToken');
      // 모든 관련 쿼리 무효화
      await queryClient.invalidateQueries({ queryKey: ['me'] });

      // 캐시된 사용자 데이터 제거
      queryClient.setQueryData(['me'], null);
      // 다른 관련된 쿼리들도 초기화
      queryClient.clear();
      handleMenuOpen(null);
      router.push('/log-in');
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
    }
  };

  return (
    <div className="md:items-center hidden md:flex md:justify-end w-full gap-8">
      <ThemeToggle />
      <Icons
        onClick={() => router.push('/main/search')}
        name={{
          ...SearchIcon,
          fill: theme === 'dark' ? 'white' : 'black',
        }}
        className="cursor-pointer"
      />
      {/* 유저 아이콘 */}
      {isLogined ? (
        <>
          <div className="flex-center w-30">
            <div ref={myPageMenuRef} className="relative">
              <Icons onClick={() => handleMenuOpen('MyPage')} name={UserIcon} className="mt-1" />
              {openMenu === 'MyPage' && (
                <div className="absolute bg-white-0 border-2 text-gray-0 w-[108px] left-1/2 transform -translate-x-1/2 rounded-md mt-2">
                  <Link
                    href="/my-page/check-password"
                    className="py-2 w-[88px] m-2 flex-center hover:bg-primary-1 hover:text-white-0 font-normal text-gray-0 text-xs rounded-md"
                  >
                    마이페이지
                  </Link>
                  <div
                    onClick={handleLogout}
                    className="py-2 w-[88px] m-2 flex-center hover:bg-primary-1 hover:text-white-0 font-normal text-gray-0 text-xs rounded-md"
                  >
                    로그아웃
                  </div>
                </div>
              )}
            </div>
            <div className="flex-center text-black-0 dark:text-white-0 text-sm font-medium">
              {userData?.data.nickname} 님
            </div>
          </div>
          <div className="flex-center w-10">
            <div ref={alarmRef}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpenAlarm(!isOpenAlarm);
                }}
                className="relative w-full items-center justify-center mt-2"
              >
                <Image src="/assets/header/bell.svg" alt="종 이미지" width={25} height={25} />
              </button>
              {isOpenAlarm && <Alarm />}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setMoreButtonOpen(!moreButtonOpen)}
            className="relative flex-center text-center text-gray-0 group  hover:text-primary-1 text-xs py-1 pl-4 pr-3 border border-gray-2 hover:border-primary-1 rounded-xl"
          >
            더보기
            <Icons
              name={ArrowIcon}
              hoverFill="#41AED9"
              className={`transition-transform duration-200  group-hover:fill-[#41AED9] ${moreButtonOpen ? 'rotate-90' : '-rotate-90'}`}
            />
            {moreButtonOpen && (
              <div className="absolute right-12 top-6">
                <SubMenu isMore />
              </div>
            )}
          </button>
        </>
      ) : (
        <div className="flex items-center gap-[30px]">
          <button
            type="button"
            onClick={() => {
              Cookies.remove('accessToken');
              queryClient.clear();
              router.push('/log-in');
            }}
            className="dark:text-white-0 text-black-0 text-sm font-medium"
          >
            로그인
          </button>
          <button
            type="button"
            onClick={() => {
              Cookies.remove('accessToken');
              queryClient.clear();
              router.push('/sign-up');
            }}
            className="dark:text-white-0 text-black-0 text-sm font-medium"
          >
            회원가입
          </button>
        </div>
      )}
    </div>
  );
}
