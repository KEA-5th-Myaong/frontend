'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Icons from '@/app/_components/ui/Icon';
import { MoreIcon } from '@/app/_components/ui/iconPath';
import useClickOutside from '@/app/_hooks/useClickOutside';
import PortfolioWriteDropdown from '../_components/PortfolioWriteDropdown';
import EducationSection from './_components/section/EducationSection';
import ExperienceSection from './_components/section/ExperienceSection';
import LinksSection from './_components/section/LinksSection';
import SkillsSection from './_components/section/SkillsSection';
import CertificationsSection from './_components/section/CertificationsSection';
import ActivitiesSection from './_components/section/ActivitiesSection';
import PSSection from './_components/section/PSSection';
import Input from './_components/Input';
import Footer from '../_components/Footer';
import ItemToggle from './_components/ItemToggle';
import useToggleStore from '@/app/_store/portfolioToggle';

export default function PortfolioWrite() {
  const [title, setTitle] = useState('곽서연 포트폴리오1');
  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const { toggles } = useToggleStore();
  const router = useRouter();

  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside({
    ref: dropdownRef,
    callback: () => setIsShowDropdown(false),
  });

  const handleDoneClick = () => {
    router.push('/portfolio/read');
  };

  const handlePreviewClick = () => {
    router.push('/portfolio/preview');
  };

  return (
    <div className="flex px-[50px] md:px-0 mb-[100px]">
      <div className="m-0 fixed top-[100px] left-[100px] bg-white z-10">
        <ItemToggle />
      </div>
      <div className="mt-[60px]  w-full max-w-[1000px] md:px-[60px] lg:px-0 lg:mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <h1 className="font-semibold text-left ">포트폴리오 작성</h1>
            <p className="text-left text-gray-0 text-[12px]">최대 5개까지 생성 가능합니다</p>
          </div>
          <Link href="/portfolio/read">
            <button
              type="button"
              className="flex items-center font-bold text-white-0 py-[13px] md:py-[19px] px-[20px] md:px-[28px] bg-primary-1 rounded-[30px] hover-animation"
            >
              작성 완료
            </button>
          </Link>
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
        <section className="mt-5 mb-[50px]">
          <section>
            <form>
              <div className="grid grid-flow-col justify-stretch gap-[20px]">
                <Input
                  element="input"
                  label="이름"
                  size="lg"
                  type="text"
                  color="transparent"
                  placeholder="이름을 입력해주세요"
                  required
                />
                <Input
                  element="input"
                  label="휴대폰 번호"
                  size="lg"
                  type="tel"
                  color="transparent"
                  placeholder="휴대폰 번호를 입력해주세요"
                  required
                />
              </div>
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
          {toggles.experience && <ExperienceSection />}
          {toggles.links && <LinksSection />}
          {toggles.skills && <SkillsSection />}
          {toggles.certifications && <CertificationsSection />}
          {toggles.activities && <ActivitiesSection />}
          {toggles.personalStatement && <PSSection />}
        </section>
      </div>
      <Footer showPreview showDone handlePreviewClick={handlePreviewClick} handleDoneClick={handleDoneClick} />
    </div>
  );
}
