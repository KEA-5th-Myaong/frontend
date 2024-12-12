'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { User } from '@/app/_hooks/useMe';
import Overlay from '../../Overlay';
import ThemeToggle from '../../ThemeToggle';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  userData?: User;
}

export default function SideMenu({ isOpen, onClose, userData }: SideMenuProps) {
  const isLogined = userData?.data?.nickname;
  const router = useRouter();

  const queryClient = useQueryClient();

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
      router.push('/log-in');
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
    }
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay onClick={onClose}>
          <motion.div
            animate={{ x: 0.1 }} // 나타날 때 왼쪽에서 오른쪽으로 슬라이드
            transition={{ duration: 0.1 }} // 전환 애니메이션 속도
            className="fixed top-0 -left-1 w-52 pl-4 min-h-full x-10 z-40 bg-white-0 dark:bg-black-1 text-black-0 dark:text-white-0 transition-transform transform drop-shadow-md"
          >
            <div>
              <div className="flex w-full">
                <motion.div layoutId="smallLogo">
                  <Image src="/assets/logo-sm.svg" alt="모바일로고" width={80} height={40} className="flex pt-6 pr-3" />
                </motion.div>
                <ThemeToggle />
              </div>
              <div className="font-semibold text-xl border-b border-gray-5 pb-3 pl-6 mr-6">
                {isLogined ? (
                  <Link href="/my-page/check-password">{userData?.data.nickname} 님</Link>
                ) : (
                  <Link href="/log-in">로그인 / 회원가입</Link>
                )}
              </div>
            </div>
            <div className="flex-col pl-6">
              <div className="pt-5">
                <p className="text-xl pb-1.5 font-semibold">블로그</p>

                <Link
                  href={`/blog/${userData?.data.username}`}
                  onClick={() => {
                    onClose();
                  }}
                >
                  <p className="text-sm text-gray-0 pt-2 pl-5">내 블로그</p>
                </Link>

                <Link
                  href={`/blog/${userData?.data.username}/write`}
                  onClick={() => {
                    onClose();
                  }}
                >
                  <p className="text-sm text-gray-0 pt-2 pl-5">글 쓰기</p>
                </Link>
              </div>
              <div className="pt-5">
                <p className="text-xl pb-1.5 font-semibold">구직</p>

                <Link
                  href={`/interview/${userData?.data.username}/select`}
                  onClick={() => {
                    onClose();
                  }}
                >
                  <p className="text-sm text-gray-0 pt-2 pl-5">모의 면접</p>
                </Link>
                <Link
                  href={`/personal-statement/${userData?.data.username}/list`}
                  onClick={() => {
                    onClose();
                  }}
                >
                  <p className="text-sm text-gray-0 pt-2 pl-5">자소서 첨삭</p>
                </Link>
                <Link
                  href="/portfolio"
                  onClick={() => {
                    onClose();
                  }}
                >
                  <p className="text-sm text-gray-0 pt-2 pl-5">내 포트폴리오</p>
                </Link>
              </div>
            </div>
            <div onClick={handleLogout} className="w-full flex-center pr-8 mt-12 text-sm text-gray-3 cursor-pointer">
              로그아웃
            </div>
          </motion.div>
        </Overlay>
      )}
    </AnimatePresence>
  );
}
