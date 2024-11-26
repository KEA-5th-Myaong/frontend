'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PSListBoxProps } from '../_types/psList';
import PSListBox from './PSListBox';
import PSListHeader from './PSListHeader';
import { fetchPSList } from '@/app/(route)/(personal-statement)/_services/psServices';
import useCustomQuery from '@/app/_hooks/useCustomQuery';

export default function PSListContainer() {
  const [personalStatement, setPersonalStatement] = useState<PSListBoxProps[]>([]);

  const psLength = personalStatement?.length;

  const { data: psListData } = useCustomQuery(['ps'], () => fetchPSList());

  useEffect(() => {
    // 임시 2개 제한, 삭제 API 적용 이후 3개로 변경 필요
    setPersonalStatement(psListData?.data.slice(0, 2));
  }, [psListData?.data]);

  return (
    <>
      {/* 자소서 관리 헤더 */}
      <PSListHeader psLength={psLength} />
      <div className="flex-center w-full h-full">
        {personalStatement ? (
          <div className="flex flex-col gap-4 w-full max-w-[1000px] mt-7">
            <PSListBox
              psId={1}
              title="기초를 중요시하는 개발자"
              position="AI Research Engineer"
              content="새로운 IT 기술을 탐구하는 것은 언제나 저의 큰 흥미 중 하나였습니다. 학교 생활을 하며 이 분야가 얼마나 다양한 영역으로확장되어 있고 여러 도메인에 적용할 수 있는지 깨닫고, 그 매력에 더욱 빠져들었습니다. 그래서 대학생활 동안 최대한 다양한 분야를 경험하며 공부하겠다는 마음가짐으로 달려왔습니다. 3학년이 되었을 때 어떤 분야를 선택할지 고민이 많았습니다. 제일 재미있는 분야를 찾지 못해 고민하던 중, 3학년 여름방학에 한국데이터산업진흥원에서 주최한 '자연어처리 기반 딥러닝 기술 융합 과정 프로젝트'에 참여하게 되었습니다. 이 프로젝트에서 2달 동안 머신러닝, 딥러닝, 언어공학, 데이터 분석 등의 기술을 습득했고, 딥러닝 기반 실시간 부정 어휘 감지 시스템을 개발하며 모델 구현에 큰 흥미를 느꼈습니다."
              timestamp="2024-11-26"
            />

            <PSListBox
              psId={2}
              title="인공지능의 다양한 면을 바라보는 연구원이 되고 싶습니다"
              position="AI 연구원"
              content="저는 자연어처리 연구실에서 학석사과정을 수료하며, 다양한 멀티모달 프로젝트에서 의미 있는 성과를 이루어 왔습니다. 음성, 시각, 언어 및 무선 신호를 이용한 프로젝트 경험을 통해 이미지 캡셔닝, 시각 질의 응답, 감정 인식 등을 구현한 경험이 있습니다. 구현 경험을 통해 멀티모달의 효과를 발견하고, 다양한 멀티모달 데이터를 다룰 수 있는 능력을 키웠습니다.저는 자연어처리 연구실에서 학석사과정을 수료하며, 다양한 멀티모달 프로젝트에서 의미 있는 성과를 이루어 왔습니다. 음성, 시각, 언어 및 무선 신호를 이용한 프로젝트 경험을 통해 이미지 캡셔닝, 시각 질의 응답, 감정 인식 등을 구현한 경험이 있습니다. 구현 경험을 통해 멀티모달의 효과를 발견하고, 다양한 멀티모달 데이터를 다룰 수 있는 능력을 키웠습니다."
              timestamp="2024-11-25"
            />

            {psLength < 3 && (
              <Link
                href="/personal-statement/1/create"
                className="flex-center gap-6 w-full py-4 sm:py-11 border border-gray-2 rounded-lg bg-white-0"
              >
                <div className="flex-center pb-1 border border-primary-1 rounded-full text-primary-1 w-6 h-6 sm:w-8 sm:h-8">
                  <p className="text-2xl">+</p>
                </div>
                자기소개서를 추가해보세요
              </Link>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-3 mt-44">
            <Image className="animate-bounce" src="/mascot.png" alt="마스코트" width={204} height={193} />
            <p className="text-gray-0">자기소개서를 작성해보세요</p>
          </div>
        )}
      </div>
    </>
  );
}
