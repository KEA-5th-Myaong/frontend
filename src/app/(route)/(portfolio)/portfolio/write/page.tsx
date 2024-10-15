'use client';

import { useRef, useState } from 'react';
import Icons from '@/app/_components/ui/Icon';
import { MoreIcon } from '@/app/_components/ui/iconPath';
import useClickOutside from '@/app/_hooks/useClickOutside';
import PortfolioWriteDropdown from './_components/PortfolioWriteDropdown';
import EducationSection from './_components/section/EducationSection';
import ExperienceSection from './_components/section/ExperienceSection';
import LinksSection from './_components/section/LinksSection';
import SkillsSection from './_components/section/SkillsSection';
import CertificationsSection from './_components/section/CertificationsSection';
import ActivitiesSection from './_components/section/ActivitiesSection';
import PSSection from './_components/section/PSSection';
import Input from './_components/Input';

export default function PortfolioWrite() {
  const [title, setTitle] = useState('곽서연 포트폴리오1');
  const [isShowDropdown, setIsShowDropdown] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside({
    ref: dropdownRef,
    callback: () => setIsShowDropdown(false),
  });

  return (
    <div className="px-[50px] md:px-0">
      <div className="mt-[60px]  w-full max-w-[1000px] md:px-[60px] lg:px-0 lg:mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <h1 className="font-semibold text-left text-[16px]">포트폴리오 작성</h1>
            <p className="text-left text-gray-0 text-[12px]">최대 5개까지 생성 가능합니다</p>
          </div>
          <button
            type="button"
            className="flex items-center font-bold text-white-0 text-[16px] py-[13px] md:py-[19px] px-[20px] md:px-[28px] bg-primary-4 rounded-[30px] hover-animation"
          >
            작성 완료
          </button>
        </div>
        <div className="relative flex justify-between items-center mt-5">
          <h1 className="pre-3xl-semibold">{title}</h1>
          <div ref={dropdownRef}>
            <Icons
              name={MoreIcon}
              onClick={() => {
                setIsShowDropdown((prev) => !prev);
              }}
              className="cursor-pointer"
            />
          </div>

          {isShowDropdown && <PortfolioWriteDropdown />}
        </div>
        <section className="mt-5">
          <section>
            <form>
              <Input
                element="input"
                label="이름"
                size="sm"
                type="text"
                color="transparent"
                placeholder="이름을 입력해주세요"
                required
              />
              <Input
                element="input"
                label="휴대폰 번호"
                size="sm"
                type="tel"
                color="transparent"
                placeholder="휴대폰 번호를 입력해주세요"
                required
              />
              <Input
                element="input"
                label="이메일"
                size="lg"
                type="email"
                color="transparent"
                placeholder="이메일을 입력해주세요"
                required
              />
              <Input
                element="input"
                label="관심 직무"
                size="lg"
                type="text"
                color="transparent"
                placeholder="관심직무를 입력해주세요"
              />
            </form>
          </section>
          <EducationSection />
          <ExperienceSection />
          <LinksSection />
          <SkillsSection />
          <CertificationsSection />
          <ActivitiesSection />
          <PSSection />
        </section>
      </div>
    </div>
  );
}
