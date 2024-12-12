import { useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useQueryClient } from '@tanstack/react-query';
import testData from '../test.json';
import Icons from '../../ui/Icon';
import { SearchIcon, XIcon, UserIcon } from '../../ui/iconPath';
import useClickOutside from '../../../_hooks/useClickOutside';
import { User } from '@/app/_hooks/useMe';
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

  const alarmMenuRef = useRef<HTMLDivElement>(null);
  const myPageMenuRef = useRef<HTMLDivElement>(null);

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
    <div className="hidden md:flex md:justify-end md:items-center w-full gap-10 h-full">
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
          <div onClick={() => handleMenuOpen('MyPage')} className="flex-center h-full w-30 cursor-pointer">
            <div ref={myPageMenuRef} className="relative w-7 h-full text-xs flex-center">
              <Icons name={UserIcon} />
              {openMenu === 'MyPage' && (
                <div className="absolute top-5 bg-white-0 border-2 text-gray-0 w-[108px] rounded-md mt-2">
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
          <div className="flex-center w-10 ">
            <div className="w-7 h-7 text-xs relative" ref={alarmMenuRef}>
              <button
                type="button"
                onClick={() => handleMenuOpen('alarm')}
                className="relative w-full items-center justify-center"
              >
                <Image src="/assets/header/bell.svg" alt="종 이미지" width={30} height={10} />
                {openMenu === 'alarm' && (
                  <div className="absolute bg-white-0 border-2 w-80 h-[330px] -translate-x-72 mt-2 rounded-xl overflow-y-auto hide-scrollbar">
                    <div className="flex h-4 font-semibold text-sm text-black-0 ml-5 my-3">
                      알림
                      <button
                        type="button"
                        className="absolute font-normal text-xs right-3 w-16"
                        onClick={() => {
                          alert('모두 지우기 클릭');
                        }}
                      >
                        모두 지우기
                      </button>
                    </div>
                    <div className="flex-col w-full">
                      {testData.alarmItems.map((item) => (
                        <div key={item.id} className="flex w-72 h-16 mx-auto mb-2">
                          <button
                            type="button"
                            className="hover:bg-gray-50 bg-gray-4 text-black-0 text-xs font-semibold rounded-lg w-full h-full flex"
                          >
                            <div className="flex items-center h-12 w-[260px]">
                              {/* 조건부로 bg 설정 */}
                              <div
                                className={`rounded-xl w-1.5 h-1.5 mx-2 ${(() => {
                                  let bgColor = '';
                                  switch (item.state) {
                                    case 'read':
                                      bgColor = 'bg-gray-1';
                                      break;
                                    case 'comment':
                                    case 'follow':
                                      bgColor = 'bg-green-0';
                                      break;
                                    case 'notice':
                                      bgColor = 'bg-red-0';
                                      break;
                                    default:
                                      bgColor = '';
                                  }
                                  return bgColor;
                                })()}`}
                              />
                              <div>{item.contents}</div>
                            </div>
                          </button>
                          <div className="absolute right-4">
                            <button type="button" className="flex-center right-2 mt-2 pr-2 w-5 h-5" onClick={() => {}}>
                              <Icons name={XIcon} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </button>
            </div>
          </div>
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
