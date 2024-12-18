'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import Icons from '@/app/_components/ui/Icon';
import { MoreIcon } from '@/app/_components/ui/iconPath';
import useClickOutside from '@/app/_hooks/useClickOutside';
import useToggleStore from '@/app/_store/portfolioToggle';
import { PortfolioFormProps } from '@/app/_types/portfolio';
import { fetchPortfolio, putPortfolios } from '../../../_services/portfolioServices';
import PortfolioWriteDropdown from '../../../_components/PortfolioWriteDropdown';
import Footer from '../../../_components/Footer';
import useCustomQuery from '@/app/_hooks/useCustomQuery';
import useMe from '@/app/_hooks/useMe';
import ItemToggle from '../../write/_components/ItemToggle';
import UploadImage from '../../write/_components/UploadImage';
import Input from '../../write/_components/Input';
import Tips from '../../write/_components/Tips';
import EducationSection from '../../write/_components/section/EducationSection';
import ExperienceSection from '../../write/_components/section/ExperienceSection';
import LinksSection from '../../write/_components/section/LinksSection';
import SkillsSection from '../../write/_components/section/SkillsSection';
import CertificationsSection from '../../write/_components/section/CertificationsSection';
import ActivitiesSection from '../../write/_components/section/ActivitiesSection';
import PSSection from '../../write/_components/section/PSSection';
import usePortfolioStore from '@/app/_store/portfolio';

export default function PortfolioModify() {
  const router = useRouter();
  const params = useParams();
  const { portfolioId } = params;

  const [picUrl, setPicUrl] = useState<string | null>(null);
  const [isShowDropdown, setIsShowDropdown] = useState(false);

  const { toggles } = useToggleStore();
  const { portfolio, setPortfolio } = usePortfolioStore();

  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside({
    ref: dropdownRef,
    callback: () => setIsShowDropdown(false),
  });
  const { register, handleSubmit, setValue, getValues, reset } = useForm<PortfolioFormProps>({
    defaultValues: {},
  });
  const methods = useForm<PortfolioFormProps>();

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

  // 유저 정보 조회
  const { data: userData } = useMe();
  setValue('name', String(userData?.data?.nickname));

  // 포트폴리오 조회
  const { data: portfolioData } = useCustomQuery(
    ['portfolio', portfolioId],
    () => fetchPortfolio(String(portfolioId)),
    {
      enabled: !!portfolioId, // portfolioId가 존재할 때만 쿼리 실행
    },
  );

  // 포트폴리오 데이터를 폼 필드에 설정
  const isFirstLoad = useRef(true);
  useEffect(() => {
    if (portfolio) {
      // 전역 상태가 있을 경우 폼 필드 초기화
      Object.keys(portfolio).forEach((key) => {
        setValue(key as keyof PortfolioFormProps, portfolio[key as keyof PortfolioFormProps]);
      });
    } else if (isFirstLoad.current && portfolioData) {
      // 전역 상태가 없고 API 데이터가 처음 로드된 경우
      setPortfolio(portfolioData.data); // 전역 상태 설정
      reset({ ...portfolioData.data }); // 폼 상태 초기화
      isFirstLoad.current = false; // 첫 실행 이후 방지
    }
  }, [portfolio, portfolioData, setValue, setPortfolio, reset]);

  const queryClient = useQueryClient();
  const onSubmit = async (formData: PortfolioFormProps) => {
    const cleanedData = cleanData(formData); // 데이터 정리
    // API 요청
    try {
      await putPortfolios(String(portfolioId), cleanedData);
      router.push(`/portfolio`);
      queryClient.invalidateQueries({ queryKey: ['portfolio', portfolioId] });
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
          <div className="w-full ml-10">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <h1 className="font-semibold text-left">포트폴리오 수정</h1>
                <p className="text-left text-gray-0 text-xs">포트폴리오는 최대 5개까지 생성 가능합니다</p>
              </div>
              <Link
                href={`/portfolio/${portfolioId}/read`}
                className="flex items-center font-bold text-white-0 py-[13px] md:py-[19px] px-[20px] md:px-[28px] bg-primary-1 rounded-[30px] hover-animation whitespace-nowrap"
              >
                작성 완료
              </Link>
            </div>
            <FormProvider {...methods}>
              <form>
                <div className="relative flex justify-between items-center mt-5">
                  <input
                    {...register('title')}
                    placeholder="포트폴리오 제목을 입력해 주세요."
                    type="text"
                    className="pre-3xl-semibold w-full focus:outline-none dark:bg-transparent"
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
                    {toggles.experience && <Tips item="career" />}
                  </div>
                  {toggles.links && <LinksSection register={register} />}
                  {toggles.skills && <SkillsSection setValue={setValue} />}
                  {toggles.certifications && <CertificationsSection register={register} />}
                  <div className="relative">
                    {toggles.activities && <ActivitiesSection register={register} />}{' '}
                    {toggles.activities && <Tips item="activities" />}
                  </div>
                  {toggles.personalStatement && <PSSection register={register} />}
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
