import { useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Link from 'next/link';
import Icons from '../../ui/Icon';
import { SearchIcon, UserIcon } from '../../ui/iconPath';
import useClickOutside from '../../../_hooks/useClickOutside';
import { User } from '@/app/_hooks/useMe';
import Alarm from './Alarm';

interface MyMenuProps {
  handleMenuOpen: (menu: string | null) => void;
  openMenu: string | null;
  userData?: User;
}

export default function MyMenu({ handleMenuOpen, openMenu, userData }: MyMenuProps) {
  const router = useRouter();
  console.log(userData);

  const isLogined = userData?.data?.nickname;

  const myPageMenuRef = useRef<HTMLDivElement>(null);
  const alarmRef = useRef<HTMLDivElement>(null);

  const [isOpenAlarm, setIsOpenAlarm] = useState(false);

  useClickOutside({
    ref: myPageMenuRef,
    callback: () => {
      handleMenuOpen(null);
    },
  });

  return (
    <div className="hidden md:flex md:justify-end w-full gap-10">
      <button type="button">
        <Icons onClick={() => router.push('/main/search')} name={{ ...SearchIcon, fill: 'black' }} />
      </button>
      {/* 유저 아이콘 */}
      {isLogined ? (
        <>
          <div className="flex-center w-30">
            <div ref={myPageMenuRef}>
              <button
                type="button"
                className="relative w-7 text-xs flex-center"
                onClick={() => handleMenuOpen('MyPage')}
              >
                <Icons name={UserIcon} />
                {openMenu === 'MyPage' && (
                  <div className="absolute bg-white-0 border-2 text-gray-0 w-[108px] left-1/2 transform -translate-x-1/2 rounded-md mt-2">
                    <Link
                      href="/my-page/check-password"
                      className="py-2 w-[88px] m-2 flex-center hover:bg-primary-1 hover:text-white-0 font-normal text-gray-0 text-xs rounded-md"
                    >
                      마이페이지
                    </Link>
                    <div
                      onClick={() => {
                        Cookies.remove('accessToken');
                        router.push('/log-in');
                      }}
                      className="py-2 w-[88px] m-2 flex-center hover:bg-primary-1 hover:text-white-0 font-normal text-gray-0 text-xs rounded-md"
                    >
                      로그아웃
                    </div>
                  </div>
                )}
              </button>
            </div>
            <div className="flex-center text-black-0 text-sm font-medium">{userData?.data.nickname} 님</div>
          </div>
          <div className="flex-center w-10 ">
            <div ref={alarmRef}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation(); // 클릭 이벤트 전파 방지
                  setIsOpenAlarm(!isOpenAlarm);
                }}
                className="relative w-full items-center justify-center"
              >
                <Image src="/assets/header/bell.svg" alt="종 이미지" width={30} height={10} />
              </button>
              {isOpenAlarm && <Alarm />}
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center gap-[30px]">
          <Link className="text-black-0 text-sm font-medium" href="/log-in">
            로그인
          </Link>
          <Link className="text-black-0 text-sm font-medium" href="/sign-up">
            회원가입
          </Link>
        </div>
      )}
    </div>
  );
}
