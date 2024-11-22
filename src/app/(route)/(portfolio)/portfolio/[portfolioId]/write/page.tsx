'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import Icons from '@/app/_components/ui/Icon';
import { MoreIcon } from '@/app/_components/ui/iconPath';
import useClickOutside from '@/app/_hooks/useClickOutside';
import EducationSection from './_components/section/EducationSection';
import ExperienceSection from './_components/section/ExperienceSection';
import LinksSection from './_components/section/LinksSection';
import SkillsSection from './_components/section/SkillsSection';
import CertificationsSection from './_components/section/CertificationsSection';
import ActivitiesSection from './_components/section/ActivitiesSection';
import PSSection from './_components/section/PSSection';
import Input from './_components/Input';
import ItemToggle from './_components/ItemToggle';
import useToggleStore from '@/app/_store/portfolioToggle';
import PortfolioWriteDropdown from '../../../_components/PortfolioWriteDropdown';
import Footer from '../../../_components/Footer';
import UploadImage from './_components/UploadImage';
import { PortfolioProps } from '@/app/_types/portfolio';
import Image from 'next/image';

export default function PortfolioWrite() {
  const [title, setTitle] = useState('백지연 포트폴리오1');
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PortfolioProps>();
  const methods = useForm<PortfolioProps>();

  const onSubmit = handleSubmit((data) => console.log(data));

  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const { toggles } = useToggleStore();
  const router = useRouter();
  const params = useParams();
  const { portfolioId } = params;

  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside({
    ref: dropdownRef,
    callback: () => setIsShowDropdown(false),
  });

  const handleDoneClick = () => {
    if (portfolioId) {
      router.push(`/portfolio/${portfolioId}/read`);
    }
  };

  const handlePreviewClick = () => {
    if (portfolioId) {
      router.push(`/portfolio/${portfolioId}/preview`);
    }
  };

  return (
    <div className="mb-[100px]">
      <div className="flex mt-[60px] max-w-[1200px] md:px-[60px] lg:px-0 lg:mx-auto">
        <ItemToggle />
        <div className="w-full ml-10">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <h1 className="font-semibold text-left ">포트폴리오 작성</h1>
              <p className="text-left text-gray-0 text-[12px]">최대 5개까지 생성 가능합니다</p>
            </div>
            <Link
              href={`/portfolio/${portfolioId}/read`}
              className="flex items-center font-bold text-white-0 py-[13px] md:py-[19px] px-[20px] md:px-[28px] bg-primary-1 rounded-[30px] hover-animation"
            >
              작성 완료
            </Link>
          </div>
          <FormProvider {...methods}>
            <form onSubmit={onSubmit}>
              <div className="relative flex justify-between items-center mt-5">
                <input
                  {...register('title')}
                  placeholder="포트폴리오 제목을 입력해 주세요."
                  type="text"
                  className="pre-3xl-semibold focus:outline-none"
                />
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
                  <UploadImage />
                  <div className="grid grid-flow-col justify-stretch gap-[20px]">
                    <Input
                      register={register}
                      name="name"
                      element="input"
                      label="이름"
                      size="lg"
                      type="text"
                      color="transparent"
                      placeholder="이름을 입력해주세요"
                      required
                    />
                    <Input
                      register={register}
                      name="tel"
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
                    register={register}
                    name="email"
                    element="input"
                    label="이메일"
                    size="lg"
                    type="email"
                    color="transparent"
                    placeholder="이메일을 입력해주세요"
                    required
                  />
                  <Input
                    register={register}
                    name="preferredJob"
                    element="input"
                    label="관심 직무"
                    size="lg"
                    type="text"
                    color="transparent"
                    placeholder="관심직무를 입력해주세요"
                  />
                </section>
                <EducationSection register={register} />

                <div className="relative">
                  {toggles.experience && <ExperienceSection register={register} />}
                  {toggles.experience && (
                    <div className="custom-shadow absolute right-[-220px] top-[90px] flex flex-col items-center max-w-[200px] bg-white-0  text-gray-1 text-[14px] py-[16px] px-[25px] rounded-[10px] border-[2px] border-[#D8E6F1] ">
                      <Image src="/mascot.png" alt="마스코트" width={70} height={63} className="mb-[17px]" />
                      강렬한 첫인상을 줄 수 있도록 도입부를 임팩트 있게 작성하세요
                    </div>
                  )}
                </div>
                {toggles.links && <LinksSection register={register} />}
                {toggles.skills && <SkillsSection setValue={setValue} />}
                {toggles.certifications && <CertificationsSection register={register} />}
                {toggles.activities && <ActivitiesSection register={register} />}
                {toggles.personalStatement && <PSSection register={register} />}
              </section>
              <button type="submit">제출 테스트</button>
            </form>
          </FormProvider>
        </div>
      </div>
      <Footer showPreview showDone handlePreviewClick={handlePreviewClick} handleDoneClick={handleDoneClick} />
    </div>
  );
}
