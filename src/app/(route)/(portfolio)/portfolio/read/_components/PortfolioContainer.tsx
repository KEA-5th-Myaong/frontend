import Icons from '@/app/_components/ui/Icon';
import { RequiredIcon } from '@/app/_components/ui/iconPath';
import Image from 'next/image';

export default function PortfolioContainer() {
  return (
    <div className="mt-[60px]  w-full max-w-[1000px] md:px-[60px] px-5 py-10  lg:mx-auto border rounded-[10px]">
      <section className="flex items-center">
        <Image alt="포트폴리오 사용자 이미지" src="/profile.png" width={120} height={120} />
        <div className="flex ml-10 text-left my-3">
          <div className="flex flex-col my-5 gap-2">
            <p className="font-semibold ">이름</p>
            <p className="font-semibold">휴대폰 번호</p>
            <p className="font-semibold">이메일 주소</p>
            <p className="font-semibold">관심 직무</p>
          </div>
          <div className="flex flex-col ml-10 my-5 gap-2">
            <p className="text-left">곽서연</p>
            <p>010-0000-0000</p>
            <p>yeonyeon@email.com</p>
            <p>프론트엔드 개발자</p>
          </div>
        </div>
      </section>
      <section className="pf-read-section">
        <h1 className="pre-3xl-semibold">학력</h1>
        <div className="h-[2px] w-full bg-gray-5 my-[20px]" />
        <div className="flex items-center gap-4">
          <Icons
            className="mr-[10px]"
            name={{ ...RequiredIcon, fill: '#41AED9', options: { ...RequiredIcon.options, stroke: '#41AED9' } }}
          />
          <p className="grow font-semibold">대학교</p>
          <p className="grow">2021.03.02 - 2025.03.02</p>
          <p className="grow">재학</p>
          <p className="grow">가천대학교 인공지능학과</p>
          <p className="grow">4.3/4.5</p>
        </div>
      </section>
      <section className="pf-read-section">
        <h1 className="pre-3xl-semibold">경력</h1>
        <div className="h-[2px] w-full bg-gray-5 my-[20px]" />
        <div className="flex items-center gap-4">
          <Icons
            className="mr-[10px]"
            name={{ ...RequiredIcon, fill: '#41AED9', options: { ...RequiredIcon.options, stroke: '#41AED9' } }}
          />
          <p className="grow font-semibold">ABC Corp</p>
          <p className="grow">Frontend Developer</p>
          <p className="grow">2023년 3월 - 현재 </p>
        </div>
        <p className="mt-4">
          React와 TypeScript를 활용해 e-commerce 웹 애플리케이션의 UI 개발 <br />
          Redux를 사용해 상태 관리 및 성능 최적화
          <br />
          사용자 인터페이스 테스트를 위한 Cypress 자동화 테스트 도입 <br />
          신규 기능 추가 및 UI 개선으로 사용자 만족도 15% 증가
        </p>
      </section>
      <section className="pf-read-section">
        <h1 className="pre-3xl-semibold">링크</h1>
        <div className="h-[2px] w-full bg-gray-5 my-[20px]" />
        <div className="flex gap-4">
          <p className="grow font-semibold">Github</p>
          <p className="grow">https://github.com/gil-dong</p>
        </div>
      </section>
      <section className="pf-read-section">
        <h1 className="pre-3xl-semibold"> 기술 </h1>
        <div className="h-[2px] w-full bg-gray-5 my-[20px]" />
        <div className="w-full flex items-center gap-3">
          <div className="py-3 px-5 border border-gray-5 rounded-[50px]">React</div>
          <div className="py-3 px-5 border border-gray-5 rounded-[50px]">Next.js</div>
          <div className="py-3 px-5 border border-gray-5 rounded-[50px]">TypeScript</div>
        </div>
      </section>
      <section className="pf-read-section">
        <h1 className="pre-3xl-semibold">교육 | 대외활동</h1>
        <div className="h-[2px] w-full bg-gray-5 my-[20px]" />
        <div className="flex items-center gap-4">
          <Icons
            className="mr-[10px]"
            name={{ ...RequiredIcon, fill: '#41AED9', options: { ...RequiredIcon.options, stroke: '#41AED9' } }}
          />
          <p className="grow font-semibold">프론트엔드 부트캠프</p>
          <p className="grow">코드스쿨</p>
          <p className="grow">2023년 3월 - 현재 </p>
        </div>
        <p className="mt-4">React 및 JavaScript 심화 과정 수료, 팀 프로젝트로 e-commerce 웹사이트 구축</p>
      </section>
      <section className="pf-read-section">
        <h1 className="pre-3xl-semibold">자격증</h1>
        <div className="h-[2px] w-full bg-gray-5 my-[20px]" />
        <div className="flex justify-between">
          <div className="flex-center">
            <Icons
              className="mr-[10px]"
              name={{ ...RequiredIcon, fill: '#41AED9', options: { ...RequiredIcon.options, stroke: '#41AED9' } }}
            />
            <p className=" font-semibold">정보처리기사</p>
          </div>
          <p>2023년 3월 - 현재</p>
        </div>
      </section>
      <section className="pf-read-section">
        <h1 className="pre-3xl-semibold">자기소개서</h1>
        <div className="h-[2px] w-full bg-gray-5 my-[20px]" />
        <p className="mt-4 font-semibold">자신이 해결한 가장 어려운 문제는 무엇인가요?</p>
        <p className="mt-4">
          ABC Corp에서 프론트엔드 성능 저하 문제를 해결해야 하는 프로젝트가 있었습니다. 기존 애플리케이션의 로딩 속도가
          느려 사용자 불만이 증가하는 상황이었는데, 주요 문제는 대용량 데이터 처리가 비효율적이었던 것이었습니다. 이를
          해결하기 위해 Lazy Loading과 데이터 캐싱 전략을 도입하였고, 이후 페이지 로딩 시간이 평균 40% 단축되었습니다.
          이 과정에서 성능 모니터링 도구인 Lighthouse를 적극 활용해 성능 개선 지표를 측정하고 피드백을 반복했습니다.
        </p>
      </section>
    </div>
  );
}
