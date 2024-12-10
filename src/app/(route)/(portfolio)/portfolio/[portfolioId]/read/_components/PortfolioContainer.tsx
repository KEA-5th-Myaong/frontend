import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import Icons from '@/app/_components/ui/Icon';
import { RequiredIcon } from '@/app/_components/ui/iconPath';
import { fetchPortfolio } from '@/app/(route)/(portfolio)/_services/portfolioServices';
import useCustomQuery from '@/app/_hooks/useCustomQuery';
import { Certifications, Educations, Experiences, ExtraActivities, Links, PS } from '@/app/_types/portfolio';
import useMe from '@/app/_hooks/useMe';

export default function PortfolioContainer() {
  // 유저 정보 조회
  const { data: userData } = useMe();
  // 포트폴리오 조회
  const params = useParams();
  const { portfolioId } = params;
  const { data: portfolio } = useCustomQuery(
    ['portfolio', portfolioId], // Query Key에 ID 포함
    () => fetchPortfolio(String(portfolioId)),
  );

  return (
    <div className="mt-[60px]  w-full max-w-[1000px] md:px-[60px] px-5 py-10  lg:mx-auto border rounded-[10px]">
      <section className="flex items-center">
        <Image
          alt="포트폴리오 사용자 기본 이미지"
          src={portfolio?.data?.picUrl ? portfolio?.data?.picUrl : '/mascot.png'}
          width={120}
          height={120}
          className="rounded-[20px]"
        />
        <div className="flex ml-10 text-left my-3">
          <div className="flex flex-col my-5 gap-2">
            <p className="font-semibold ">이름</p>
            <p className="font-semibold">휴대폰 번호</p>
            <p className="font-semibold">이메일 주소</p>
            <p className="font-semibold">관심 직무</p>
          </div>
          <div className="flex flex-col ml-10 my-5 gap-2">
            <p className="text-left">{userData?.data.nickname}</p>
            <p>{portfolio?.data?.tel}</p>
            <p>{portfolio?.data?.email}</p>
            <p>{portfolio?.data?.preferredJob}</p>
          </div>
        </div>
      </section>

      {portfolio?.data?.educations &&
        portfolio?.data?.educations.map((item: Educations) => {
          return (
            <section className="pf-read-section">
              <h1 className="pre-3xl-semibold">학력</h1>
              <div className="h-[2px] w-full bg-gray-5 my-[20px]" />
              <div className="flex items-center gap-4">
                <Icons
                  className="mr-2.5"
                  name={{ ...RequiredIcon, fill: '#41AED9', options: { ...RequiredIcon.options, stroke: '#41AED9' } }}
                />
                <p className="grow font-semibold">{item?.name}</p>
                <p className="grow flex">
                  <p className="font-semibold mr-4">졸업 (예정) </p>
                  {item?.graduation}
                </p>

                <p className="grow">
                  {item?.name} {item?.major}
                </p>
                <p className="grow">4.3/4.5</p>
              </div>
            </section>
          );
        })}
      {portfolio?.data?.experiences &&
        portfolio?.data?.experiences.map((item: Experiences) => {
          return (
            <section className="pf-read-section">
              <h1 className="pre-3xl-semibold">경력</h1>
              <div className="h-[2px] w-full bg-gray-5 my-[20px]" />
              <div className="flex items-center gap-4">
                <Icons
                  className="mr-2.5"
                  name={{ ...RequiredIcon, fill: '#41AED9', options: { ...RequiredIcon.options, stroke: '#41AED9' } }}
                />
                <p className="grow font-semibold">{item?.name}</p>
                <p className="grow">{item?.position}</p>
                <p className="grow">
                  {item?.start} - {item?.end}
                </p>
              </div>
              <p className="mt-4">{item?.achievement}</p>
            </section>
          );
        })}

      {portfolio?.data?.links &&
        portfolio?.data?.links.map((item: Links) => {
          return (
            <section className="pf-read-section">
              <h1 className="pre-3xl-semibold">링크</h1>
              <div className="h-[2px] w-full bg-gray-5 my-[20px]" />
              <div className="flex gap-4">
                <p className="grow font-semibold">{item?.name}</p>
                <p className="grow">https://github.com/gil-dong</p>
              </div>
            </section>
          );
        })}
      {portfolio?.data?.skils &&
        portfolio?.data?.skils.map((item: string) => {
          return (
            <section className="pf-read-section">
              <h1 className="pre-3xl-semibold"> 기술 </h1>
              <div className="h-[2px] w-full bg-gray-5 my-[20px]" />
              <div className="w-full flex items-center gap-3">
                <div className="py-3 px-5 border border-gray-5 rounded-[50px]">{item}</div>
              </div>
            </section>
          );
        })}

      {portfolio?.data?.extraActivities &&
        portfolio?.data?.extraActivities.map((item: ExtraActivities) => {
          return (
            <section className="pf-read-section">
              <h1 className="pre-3xl-semibold">교육 | 대외활동</h1>
              <div className="h-[2px] w-full bg-gray-5 my-[20px]" />
              <div className="flex items-center gap-4">
                <Icons
                  className="mr-2.5"
                  name={{ ...RequiredIcon, fill: '#41AED9', options: { ...RequiredIcon.options, stroke: '#41AED9' } }}
                />
                <p className="grow font-semibold">{item?.name}</p>
                <p className="grow">{item?.institution}</p>
                <p className="grow">
                  {item?.start} {item.end ? '-' : ''} {item?.end}
                </p>
              </div>
              <p className="mt-4">{item?.description}</p>
            </section>
          );
        })}

      {portfolio?.data?.certifications &&
        portfolio?.data?.certifications.map((item: Certifications) => {
          return (
            <section className="pf-read-section">
              <h1 className="pre-3xl-semibold">자격증</h1>
              <div className="h-[2px] w-full bg-gray-5 my-[20px]" />
              <div className="flex justify-between">
                <div className="flex-center">
                  <Icons
                    className="mr-2.5"
                    name={{ ...RequiredIcon, fill: '#41AED9', options: { ...RequiredIcon.options, stroke: '#41AED9' } }}
                  />
                  <p className=" font-semibold">{item.name}</p>
                </div>
                <p>{item.date}</p>
              </div>
            </section>
          );
        })}

      {portfolio?.data?.ps &&
        portfolio?.data?.ps.map((item: PS) => {
          return (
            <section className="pf-read-section">
              <h1 className="pre-3xl-semibold">자기소개서</h1>
              <div className="h-[2px] w-full bg-gray-5 my-[20px]" />
              <p className="mt-4">
                지원 제목 <br />
                {item?.title}
              </p>
              <p className="mt-4">
                지원직무 <br />
                {item?.position}
              </p>
              <p className="mt-4">
                지원 사유 <br /> {item?.reason}
              </p>
              <p className="mt-4">{item?.content}</p>
            </section>
          );
        })}
    </div>
  );
}
