'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Icons from './ui/Icon';
import { SearchIcon } from './ui/iconPath';
import { XIcon } from './ui/iconPath';
import { UserIcon } from './ui/iconPath';
import { MenuIcon } from './ui/iconPath';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [hoverText, setHoverText] = useState<string | null>(null);
  const blogMenuRef = useRef<HTMLDivElement>(null);
  const jobMenuRef = useRef<HTMLDivElement>(null);
  const alarmMenuRef = useRef<HTMLDivElement>(null);
  const myPageMenuRef = useRef<HTMLDivElement>(null);

  const [isLogined, setIsLogined] = useState<boolean | null>(true);

  //api로 이름 받아오기
  const [userName, setUserName] = useState<string | null>('백지연');

  const handleMenuOpen = (menuName: string) => {
    setOpenMenu(menuName);
    menuName === 'blog' && handleCircleFalse;
    menuName === 'myPage' && handleCircleFalse;
  };

  const handleMenuClose = () => {
    setOpenMenu(null);
    setHoverText(null);
  };

  const handleCircleTrue = (menuName: string) => {
    setHoverText(menuName);
  };

  const handleCircleFalse = () => {
    openMenu == null && setHoverText(null);
  };

  // 블로그 메뉴 하위 메뉴
  const blogSubMenuItems = [
    { id: 1, name: '내 블로그', onClick: () => alert('내 블로그로 이동') },
    { id: 2, name: '글쓰기', onClick: () => alert('글쓰기 페이지로 이동') },
  ];

  // 구직 메뉴 하위 메뉴
  const jobSubMenuItems = [
    { id: 1, name: '모의 면접', onClick: () => alert('모의 면접으로 이동') },
    { id: 2, name: '자소서 첨삭', onClick: () => alert('자소서 첨삭으로 이동') },
    { id: 3, name: '내 포트폴리오', onClick: () => alert('내 포트폴리오로 이동') },
  ];

  // 마이페이지 메뉴 하위 메뉴
  const myPageMenuItems = [
    { id: 1, name: '마이페이지', onClick: () => alert('마이페이지로 이동') },
    { id: 2, name: '로그아웃', onClick: () => alert('로그아웃') },
  ];

  // 임시 알림 목록
  const alarmItems = [
    { id: 1, state: 'comment', date: '2024.10.14', contents: '곽서연님이 내 포스트에 댓글을 달았습니다.' },
    { id: 2, state: 'notice', date: '2024.10.14', contents: '새 공지사항이 등록되었습니다.' },
    { id: 3, state: 'follow', date: '2024.10.14', contents: '김현중님이 나를 팔로우 했습니다.' },
    { id: 4, state: 'read', date: '2024.10.14', contents: '곽서연님이 나를 팔로우 했습니다.' },
    { id: 5, state: 'read', date: '2024.10.14', contents: '김민형님이 내 포스트에 댓글을 달았습니다.' },
    { id: 6, state: 'read', date: '2024.10.14', contents: '김현중님이 내 포스트에 댓글을 달았습니다.' },
    { id: 7, state: 'read', date: '2024.10.14', contents: '강수진님이 나를 팔로우 했습니다.' },
    { id: 8, state: 'read', date: '2024.10.14', contents: '조기헌님이 나를 팔로우 했습니다.' },
    { id: 9, state: 'read', date: '2024.10.14', contents: '최현준님이 내 포스트에 댓글을 달았습니다.' },
  ];

  const MainMenu = () => {
    useEffect(() => {
      // 메뉴 밖 영역 클릭시 닫기
      const handleClickOutside = (event: MouseEvent) => {
        if (
          openMenu &&
          blogMenuRef.current &&
          !blogMenuRef.current.contains(event.target as Node) &&
          jobMenuRef.current &&
          !jobMenuRef.current.contains(event.target as Node) &&
          myPageMenuRef.current &&
          !myPageMenuRef.current.contains(event.target as Node) &&
          alarmMenuRef.current &&
          !alarmMenuRef.current.contains(event.target as Node)
        ) {
          handleMenuClose();
          handleCircleFalse;
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [openMenu]);

    return (
      <div className="flex gap-1 w-full h-16 relative items-center">
        {/* 블로그 메뉴 */}
        <div ref={blogMenuRef} className="w-28 h-9 relative items-center">
          <div className="w-full h-1.5 justify-center items-center">
            <div className="flex w-28 h-full items-center justify-center">
              {hoverText === 'blog' && <div className="bg-primary-0 w-1.5 h-1.5 rounded-lg "></div>}
            </div>
          </div>
          <button
            type="button"
            onMouseEnter={() => {
              handleCircleTrue('blog');
            }}
            onMouseLeave={() => {
              handleCircleFalse();
            }}
            onClick={() => handleMenuOpen('blog')}
            className="relative text-black-1 text-sm font-semibold w-full"
          >
            블로그
            {openMenu === 'blog' && (
              <div className="absolute bg-white-0 border-2 text-gray-0 w-[108px] left-1/2 transform -translate-x-1/2 rounded-md mt-2">
                {blogSubMenuItems.map((menu) => (
                  <div key={menu.id} className="w-[88px] h-8 mx-auto m-2">
                    <button
                      type="button"
                      className="hover:bg-primary-0 hover:text-white-0 font-normal text-gray-0 text-xs rounded-md w-full h-full"
                      onClick={menu.onClick}
                    >
                      {menu.name}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </button>
        </div>

        {/* 구직 메뉴 */}
        <div ref={jobMenuRef} className="w-28 h-9 relative items-center">
          <div className="w-full h-1.5 justify-center items-center">
            <div className="flex w-28 h-full items-center justify-center">
              {hoverText === 'job' && <div className="bg-primary-0 w-1.5 h-1.5 rounded-lg "></div>}
            </div>
          </div>
          <button
            type="button"
            onMouseEnter={() => {
              handleCircleTrue('job');
            }}
            onMouseLeave={() => {
              handleCircleFalse();
            }}
            onClick={() => handleMenuOpen('job')}
            className="relative text-black-1 text-sm font-semibold w-full"
          >
            구직
            {openMenu === 'job' && (
              <div className="absolute bg-white-0 border-2 text-gray-0 w-[108px] left-1/2 transform -translate-x-1/2 rounded-md mt-2">
                <div className="flex-col w-full items-center justify-center">
                  {jobSubMenuItems.map((menu) => (
                    <div key={menu.id} className="w-[88px] h-8 m-2">
                      <button
                        type="button"
                        className="hover:bg-primary-0 hover:text-white-0 font-normal text-gray-0 text-xs rounded-md w-full h-full"
                        onClick={menu.onClick}
                      >
                        {menu.name}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex text-white-0 px-4 gap-1 w-full bg-white-0 border-b-2 h-20 relative items-center ">
      <div className="w-40 h-full items-center justify-center md:flex hidden">
        <button
          onClick={() => {
            alert('로고 이미지 클릭');
          }}
        >
          {/* Tablet 스크린 */}
          <Image
            src="/LOGO(tablet).png"
            alt="로고"
            width={117}
            height={30}
            className="hidden md:block lg:hidden pt-1"
          />

          {/* PC 스크린 */}
          <Image src="/LOGO(PC).png" alt="로고" width={117} height={30} className="hidden lg:block" />
        </button>
      </div>
      <div className="hidden md:flex">
        <div className="flex lg:hidden px-3 ">
          <MainMenu />
        </div>
        <div className="hidden lg:flex px-8">
          <MainMenu />
        </div>
      </div>
      {isLogined ? (
        //로그인 상태
        <div className="hidden w-64 h-14 absolute right-4 mt-3 items-center justify-center md:flex">
          <button
            className=""
            onClick={() => {
              alert('검색 아이콘 클릭');
            }}
          >
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
                    {myPageMenuItems.map((menu) => (
                      <div key={menu.id} className="w-[88px] h-8 mx-auto m-2">
                        <button
                          type="button"
                          className="hover:bg-primary-0 hover:text-white-0 font-normal text-gray-0 text-xs rounded-md w-full h-full"
                          onClick={menu.onClick}
                        >
                          {menu.name}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </button>
            </div>
            <div className="flex text-black-0 font-medium justify-center items-center">{userName} 님</div>
          </div>
          <div className="flex w-10 h-10 justify-center items-center">
            <div className="w-7 h-7 text-xs relative" ref={alarmMenuRef}>
              <button
                type="button"
                onClick={() => handleMenuOpen('alarm')}
                className="relative w-full items-center justify-center"
              >
                <Image src="/assets/header/bell.svg" alt="종 이미지" width={30} height={10} />
                {openMenu === 'alarm' && (
                  <div className="absolute bg-white-0 border-2 w-80 h-[330px] -translate-x-72 mt-2 rounded-xl overflow-y-auto">
                    <div className="flex h-4 w-full font-semibold text-sm text-black-0 ml-5 my-3">
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
                    <div>
                      {alarmItems.map((item) => (
                        <div key={item.id} className="flex w-72 h-16 mx-auto m-2">
                          <button
                            type="button"
                            className="hover:bg-gray-50 bg-gray-4 text-black-0 text-xs font-semibold rounded-lg w-full h-full flex"
                          >
                            <div className="flex items-center h-12 w-[260px]">
                              {/* 조건부로 bg 설정 */}
                              <div
                                className={`rounded-xl w-1.5 h-1.5 mx-2 ${
                                  item.state === 'read'
                                    ? 'bg-gray-1'
                                    : item.state === 'comment' || item.state === 'follow'
                                      ? 'bg-green-0'
                                      : item.state === 'notice'
                                        ? 'bg-red-0'
                                        : ''
                                }`}
                              ></div>
                              <div>{item.contents}</div>
                            </div>
                          </button>
                          <div className="absolute right-4">
                            <button
                              className="flex right-2 mt-2 w-5 h-5 justify-center items-center"
                              type="button"
                              onClick={() => {
                                alert('알림 닫기');
                              }}
                            >
                              <Icons name={XIcon} className="" />
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
      ) : (
        //비로그인 상태
        <div className="flex w-64 h-14 absolute right-4 mt-2 items-center justify-center">
          <button
            className=""
            onClick={() => {
              alert('검색 아이콘 클릭');
            }}
          >
            <Icons name={{ ...SearchIcon, fill: 'black' }} />
          </button>
          <div className="ml-6">
            <button
              className="text-black-0"
              onClick={() => {
                router.push(`/log-in`);
              }}
            >
              로그인
            </button>
          </div>
          <div className="ml-6">
            <button
              className="text-black-0"
              onClick={() => {
                router.push(`/sign-up`);
              }}
            >
              회원가입
            </button>
          </div>
        </div>
      )}

      {/* Mobile 스크린 */}
      <div className="relative flex w-full items-center justify-center md:hidden">
        <button
          className="absolute left-4 mt-2"
          onClick={() => {
            alert('메뉴 아이콘 클릭');
          }}
        >
          <Icons name={MenuIcon} />
        </button>
        <Image src="/LOGO(mobile).png" alt="로고" width={50} height={50} className="block md:hidden pt-2" />
        <button
          className="absolute right-4 mt-2"
          onClick={() => {
            alert('검색 아이콘 클릭');
          }}
        >
          <Icons name={{ ...SearchIcon, fill: 'black' }} />
        </button>
      </div>
    </div>
  );
}
