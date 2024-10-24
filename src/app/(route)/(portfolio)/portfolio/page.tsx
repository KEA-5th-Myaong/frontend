'use client';

import Link from 'next/link';
import { useQueryClient } from '@tanstack/react-query';
import Icons from '../../../_components/ui/Icon';
import { PlusIcon } from '../../../_components/ui/iconPath';
import PortfolioCard from '../_components/PortfolioCard';
import PortfolioAddCard from '../_components/PortfolioAddCard';
import usePortfolioStore from '../../../_store/portfolio';
import { PortfolioCardProps } from '../../../_types/portfolio';
import useCustomQuery from '@/app/_hooks/useCustomQuery';
import { fetchPortfolios, postPorfolios } from '../_services/portfolioServices';
import useCustomMutation from '@/app/_hooks/useCustomMutation';

export default function PortfolioList() {
  const { portfolio } = usePortfolioStore();

  const { data: pfData } = useCustomQuery(['pf'], () => fetchPortfolios());

  console.log(pfData);

  const queryClient = useQueryClient();
  const createPortfolioMutation = useCustomMutation(postPorfolios, {
    onSuccess: (data) => {
      console.log('반환 받은 포트폴리오 아이디', data);
      queryClient.invalidateQueries(['pf']); // 캐시 초기화
    },
  });
  const handlePostTest = () => {
    const newPortfolio = {
      title: '제목',
      preferredJob: '관심 직무',
      tel: '010-0000-0000',
      email: '이메일@주소',
      educations: [
        {
          name: '학교 이름',
          major: '전공',
          graduation: '0000-00',
          gpa: null,
        },
      ],
      picUrl: null,
      experiences: [
        {
          name: '기업 이름',
          start: '0000-00-00',
          end: null,
          position: null,
          achievement: null,
        },
      ],
      ps: null,
      links: [],
      skills: [],
      certifications: [],
      extraActivities: [
        {
          name: '활동명',
          start: '0000-00-00',
          end: null,
          institution: '기관 이름',
          description: null,
        },
      ],
    };

    createPortfolioMutation.mutate(newPortfolio);
  };
  return (
    <div className="flex flex-col items-center px-[50px] min-w-[360px] w-full pt-14 md:pt-0">
      <div className="pt-[60px] flex justify-between items-center w-full max-w-[1000px] md:px-[60px] lg:px-[50px] ">
        <div className="flex flex-col justify-center w-full">
          <h1 className="font-semibold text-left">포트폴리오 관리</h1>
          <p className="text-left text-gray-0 text-[12px]">최대 5개까지 생성 가능합니다</p>
        </div>
        <Link href="/portfolio/1/write">
          <button
            type="button"
            className="flex items-center py-[13px] gap-2.5 md:py-[19px] px-5 md:px-7 rounded-[30px] primary-1-btn hover-animation"
          >
            <Icons name={{ ...PlusIcon, fill: '#fff', options: { ...PlusIcon.options, stroke: '#fff' } }} />
            포트폴리오 추가
          </button>
        </Link>
      </div>
      <button type="button" onClick={handlePostTest}>
        POST 테스트
      </button>

      <div className="flex flex-col items-center mt-[30px] mb-[100px] px-[50px]">
        <div className="w-full lg:max-w-[1000px] grid justify-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-[25px] gap-4">
          {portfolio.map((item: PortfolioCardProps) => (
            <Link href={`/portfolio/${item.id}/write`}>
              <PortfolioCard key={item.id} id={item.id} title={item.title} date="2024.10.17" />
            </Link>
          ))}
          <PortfolioAddCard />
        </div>
      </div>
    </div>
  );
}
