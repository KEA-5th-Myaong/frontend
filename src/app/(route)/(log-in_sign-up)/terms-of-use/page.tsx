'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BackButton from '@/app/_components/BackButton';
import Icons from '@/app/_components/ui/Icon';
import { TermCheckIcon } from '@/app/_components/ui/iconPath';
import { privacyPolicy, termsOfService } from './_data/terms';

type CheckboxName = 'all' | 'terms1' | 'terms2';

export default function TermsOfUse() {
  const router = useRouter();

  const [isButtonActive, setIsButtonActive] = useState(false);
  // Record<CheckboxName, boolean>은 { all: boolean, terms1: boolean, terms2: boolean } 타입
  const [isChecked, setIsChecked] = useState<Record<CheckboxName, boolean>>({
    all: false,
    terms1: false,
    terms2: false, // 모든 체크박스의 기본 값은 false
  });

  // 체크박스 클릭 핸들러
  const handleCheckClick = (name: CheckboxName) => {
    if (name === 'all') {
      const isAllChecked = !isChecked.all; // 현재 전체 동의의 반대값을 저장
      setIsChecked({
        all: isAllChecked, // 전체 동의의 반대값에 따라 all, terms1, terms2가 다 바뀜
        terms1: isAllChecked,
        terms2: isAllChecked,
      });
    } else {
      // terms1과 terms2가 개별적으로 클릭될 때
      setIsChecked((prevState) => ({
        ...prevState, // 기존 state
        [name]: !prevState[name], // 클릭된 name의 state만 반전
      }));
    }
  };
  // terms1과 terms2가 변경될 때 마다 실행되는 useEffect
  useEffect(() => {
    const { terms1, terms2 } = isChecked;
    setIsChecked((prevState) => ({
      ...prevState,
      all: terms1 && terms2, // terms1과 terms2가 모두 true면 all도 true
    }));

    if (terms1 && terms2) {
      router.push('/sign-up');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChecked.terms1, isChecked.terms2]); // 위 주석은 불필요한 리렌더링 방지를 위해 isChecked를 뺀 것
  // 마지막 '다음' 버튼의 상태가 변경되는 useEffect
  useEffect(() => {
    const { terms1, terms2, all } = isChecked;
    // 모든 조건이 참일 때만 버튼을 활성화
    setIsButtonActive(terms1 && terms2 && all);
  }, [isChecked]);
  return (
    <section className="form-screen">
      <div className="form-container">
        <div className="w-full max-w-[660px] pl-4 mt-8 md:mt-0">
          <BackButton />
          <div className="flex flex-col items-center w-full min-w-[360px] max-w-[660px] px-5">
            <p className="mb-9 form-title">이용약관</p>

            <div className="flex flex-col gap-8 self-stretch pb-12">
              <div
                className="terms-check"
                onClick={() => {
                  handleCheckClick('all');
                }}
              >
                <Icons
                  name={{
                    ...TermCheckIcon,
                    options: {
                      ...TermCheckIcon.options,
                      stroke: isChecked.all ? '#FFF' : '#9FA6B2',
                    },
                  }}
                  className={`px-0.5 border-2 ${isChecked.all ? 'border-primary-1 bg-primary-1' : 'border-gray-1'} rounded-full`}
                />
                <p className="font-semibold">전체 동의하기</p>
              </div>
              {/* 아래는 약관들 */}
              <div className="flex flex-col gap-8">
                {/* 1. 서비스 이용약관 */}
                <div className="flex flex-col gap-3">
                  <div
                    className="terms-check"
                    onClick={() => {
                      handleCheckClick('terms1');
                    }}
                  >
                    <Icons
                      name={{
                        ...TermCheckIcon,
                        options: {
                          ...TermCheckIcon.options,
                          stroke: isChecked.terms1 ? '#FFF' : '#9FA6B2',
                        },
                      }}
                      className={`px-0.5 border-2 ${isChecked.terms1 ? 'border-primary-1 bg-primary-1' : 'border-gray-1'} rounded-full`}
                    />
                    <p className="font-semibold flex items-center gap-0.5">
                      <p className="text-primary-1">[필수]</p>서비스 이용약관
                    </p>
                  </div>
                  <div className="terms-container">
                    <div className="terms-contents">{termsOfService}</div>
                  </div>
                </div>
                {/* 2. 개인정보 수집 및 이용 동의서 */}
                <div className="flex flex-col gap-3">
                  <div
                    className="terms-check"
                    onClick={() => {
                      handleCheckClick('terms2');
                    }}
                  >
                    <Icons
                      name={{
                        ...TermCheckIcon,
                        options: {
                          ...TermCheckIcon.options,
                          stroke: isChecked.terms2 ? '#FFF' : '#9FA6B2',
                        },
                      }}
                      className={`px-0.5 border-2 ${isChecked.terms2 ? 'border-primary-1 bg-primary-1' : 'border-gray-1'} rounded-full`}
                    />
                    <p className="font-semibold flex items-center gap-0.5">
                      <p className="text-primary-1">[필수]</p>개인정보 수집 및 이용 동의서
                    </p>
                  </div>
                  <div className="terms-container">
                    <div className="terms-contents">{privacyPolicy}</div>
                  </div>
                </div>
              </div>

              {/* 다음 이동 button */}
              <button
                type="button"
                onClick={() => {
                  router.push('/sign-up');
                }}
                disabled={!isButtonActive}
                className={`mt-[60px] ${isButtonActive ? 'bg-primary-1' : 'bg-gray-1'} form-btn`}
              >
                다음
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
