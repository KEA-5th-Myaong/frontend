'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
// import Icons from '@/app/_components/ui/Icon';
// import { MoreIcon } from '@/app/_components/ui/iconPath';
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
import UploadImage from './_components/UploadImage';
import { PortfolioFormProps } from '@/app/_types/portfolio';
import Tips from './_components/Tips';
import { postPorfolios } from '../../_services/portfolioServices';
import PortfolioWriteDropdown from '../../_components/PortfolioWriteDropdown';
import Footer from '../../_components/Footer';
import usePortfolioStore from '@/app/_store/portfolio';

export default function PortfolioWrite() {
  const router = useRouter();
  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const [picUrl, setPicUrl] = useState<string | null>(null);
  const { toggles } = useToggleStore();
  const { portfolio, setPortfolio } = usePortfolioStore(); // 미리보기를 위한 전역상태 추가

  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside({
    ref: dropdownRef,
    callback: () => setIsShowDropdown(false),
  });
  const { register, handleSubmit, setValue, getValues } = useForm<PortfolioFormProps>();
  const methods = useForm<PortfolioFormProps>({
    defaultValues: portfolio || {
      title: '',
      name: '',
      tel: '',
      email: '',
      picUrl: picUrl || null,
      preferredJob: '',
      educations: [],
      experiences: [],
      ps: null,
      links: [],
      skills: [],
      certifications: [],
      extraActivities: [],
    },
  });

  useEffect(() => {
    if (portfolio && Object.keys(portfolio).length > 0) {
      Object.entries(portfolio).forEach(([key, value]) => {
        setValue(key as keyof PortfolioFormProps, value); // 각 필드의 값을 설정
      });
    }
    if (picUrl) {
      setValue('picUrl', picUrl);
    }
  }, [portfolio, setValue, picUrl]);

  const cleanData = (data: PortfolioFormProps) => {
    return {
      ...data,
      picUrl: picUrl || null,
      educations: data.educations || [],
      experiences: data.experiences || [],
      ps: data.ps || null,
      links: data.links || [],
      skills: data.skills || [],
      certifications: data.certifications || [],
      extraActivities: data.extraActivities || [],
    };
  };

  const onSubmit = async (formData: PortfolioFormProps) => {
    const cleanedData = cleanData(formData); // 데이터 정리
    try {
      const response = await postPorfolios(cleanedData);
      const createdId = response?.data?.portfolioId; // API에서 반환된 ID
      if (createdId) {
        router.push(`/portfolio/${createdId}/read`);
      }
    } catch (error) {
      console.error('Error creating portfolio:', error);
    }
  };

  const handleDoneClick = () => {
    handleSubmit(onSubmit)(); // handleSubmit 호출
  };

  const handlePreviewClick = () => {
    const formData = getValues();
    setPortfolio(formData);
    router.push(`/portfolio/preview`);
  };

  return (
    <div className="relative">
      <div className="relative flex pl-3 pt-[100px] xl:pt-[60px] mb-[100px] w-full lg:mx-auto">
        <ItemToggle />
        <section className="flex max-w-[1200px] px-3 md:px-[60px] w-full">
          <div className="w-full ml-3 md:ml-10">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <h1 className="font-semibold text-left">포트폴리오 작성</h1>
                <p className="text-left text-gray-0 text-xs">최대 5개까지 생성 가능합니다</p>
              </div>
              <button
                type="submit"
                onClick={() => {
                  handleDoneClick();
                }}
                className="flex items-center font-bold text-white-0 py-[13px] md:py-[19px] px-[20px] md:px-[28px] bg-primary-1 rounded-[30px] hover-animation whitespace-nowrap"
              >
                작성 완료
              </button>
            </div>
            <FormProvider {...methods}>
              <form>
                <div className="relative flex justify-between items-center mt-5">
                  <input
                    {...register('title')}
                    placeholder="포트폴리오 제목을 입력해 주세요."
                    type="text"
                    className="pre-3xl-semibold w-full focus:outline-none"
                  />
                  {/* <div ref={dropdownRef}>
                    <Icons
                      name={MoreIcon}
                      onClick={() => {
                        setIsShowDropdown((prev) => !prev);
                      }}
                      className="cursor-pointer"
                    />
                  </div> */}

                  {isShowDropdown && <PortfolioWriteDropdown />}
                </div>
                <section className="mt-5 mb-[50px]">
                  <section>
                    <UploadImage onImageUpload={setPicUrl} />
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
                        maxLength={13}
                        placeholder="휴대폰 번호를 입력해주세요"
                        onChange={(e) => {
                          const formatted = e.target.value
                            .replace(/[^\d]/g, '') // 숫자가 아닌 문자를 제거
                            .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'); // 3-4-4 포맷으로 변환
                          e.target.value = formatted;
                        }}
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
                    {toggles.experience && <Tips item="career" />}
                  </div>
                  {toggles.links && <LinksSection register={register} />}
                  {toggles.skills && <SkillsSection setValue={setValue} />}
                  {toggles.certifications && <CertificationsSection register={register} />}
                  <div className="relative">
                    {toggles.activities && <ActivitiesSection register={register} />}{' '}
                    {toggles.activities && <Tips item="activities" />}
                  </div>
                  {toggles.personalStatement && <PSSection setValue={setValue} register={register} />}
                </section>
              </form>
            </FormProvider>
          </div>
        </section>
      </div>
      <Footer showPreview showDone handlePreviewClick={handlePreviewClick} handleDoneClick={handleDoneClick} />
    </div>
  );
}
