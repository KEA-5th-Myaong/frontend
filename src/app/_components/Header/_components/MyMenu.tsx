import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import testData from '../test.json';
import menuData from '../menuData.json';
import Icons from '../../ui/Icon';
import { SearchIcon, XIcon, UserIcon } from '../../ui/iconPath';
import useClickOutside from '../../../_hooks/useClickOutside';

interface MyMenuProps {
  handleMenuOpen: (menu: string | null) => void;
  openMenu: string | null;
}
export default function MyMenu({ handleMenuOpen, openMenu }: MyMenuProps) {
  const alarmMenuRef = useRef<HTMLDivElement>(null);
  const myPageMenuRef = useRef<HTMLDivElement>(null);

  useClickOutside({
    ref: myPageMenuRef,
    callback: () => {
      handleMenuOpen(null);
    },
  });

  return (
    <div className="hidden md:flex-center w-64 h-14 absolute right-4 mt-3  ">
      <button type="button">
        <Icons name={{ ...SearchIcon, fill: 'black' }} />
      </button>
      {/* 유저 아이콘 */}
      <div className="flex w-30 h-7 justify-center items-cente mx-5">
        <div ref={myPageMenuRef}>
          <button
            type="button"
            className="relative w-7 h-7 text-xs items-center justify-center "
            onClick={() => handleMenuOpen('MyPage')}
          >
            <Icons name={UserIcon} />
            {openMenu === 'MyPage' && (
              <div className="absolute bg-white-0 border-2 text-gray-0 w-[108px] left-1/2 transform -translate-x-1/2 rounded-md mt-2">
                {menuData.myPageMenuItems.map((menu) => (
                  <div key={menu.id} className="w-[88px] h-8 mx-auto m-2">
                    <Link
                      href={menu.path}
                      className="flex-center hover:bg-primary-1 hover:text-white-0 font-normal text-gray-0 text-xs rounded-md w-full h-full"
                    >
                      {menu.name}
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </button>
        </div>
        <div className="flex-center text-black-0 text-sm font-medium">{testData.userData.userName} 님</div>
      </div>
      <div className="flex-center w-10 h-10">
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
    </div>
  );
}
