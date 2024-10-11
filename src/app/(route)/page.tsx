import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col relative items-center text-center pt-[50px] bg-gradient-to-b from-[#F1F1F5] to-[#D8ECFF] h-full">
      <Image src="/assets/logo-lg.png" alt="PPLOG 로고" width={130} height={130} />
      <Image
        src="/assets/landing-page/img-orange-circle.png"
        alt="주황색 배경 효과"
        width={600}
        height={600}
        className="absolute left-[-200px]"
      />
      <Image
        src="/assets/landing-page/img-orange-circle.png"
        alt="주황색 배경 효과"
        width={600}
        height={600}
        className="absolute top-[800px] right-[-200px]"
      />
      <section className="flex flex-col items-center mt-[110px] ">
        <Image src="/assets/landing-page/landing-light.png" alt="조명 이미지" width={120} height={120} />
        <div className="pre-3xl-semibold mt-[60px]">
          <p>포트폴리오부터 면접까지,</p>
          <p> 완벽한 준비를 위한 All-in-One 솔루션</p>
        </div>
        <div className="flex text-left bg-white-0 w-[900px] h-[300px] rounded-[80px] mt-[50px]  py-[50px] pl-[90px]">
          <div>
            <p className="font-semibold text-blue-0 ">AI 자소서 첨삭</p>
            <p className="pre-2xl-semibold"> 자기소개서에서 강점을 명확하게 표현하지 못해 고민이라면, </p>
            <p className="pre-2xl-semibold"> AI 첨삭으로 개선 방안을 제안받아 보세요</p>
            <button
              type="button"
              className="pre-2xl-semibold bg-blue-1 text-white-0 mt-[55px] py-[15px] px-[35px] rounded-[100px]"
            >
              바로가기
            </button>
          </div>
          <Image
            src="/assets/landing-page/section1-img.png"
            alt="AI 자소서 첨삭 이미지"
            width={220}
            height={200}
            className="ml-[50px]"
          />
        </div>
        <div className="flex text-left bg-white-0 w-[900px] h-[300px] rounded-[80px] mt-[20px] py-[50px] pl-[90px]">
          <div>
            <p className="font-semibold text-blue-0 ">AI 모의 면접</p>
            <p className="pre-2xl-semibold">선호하는 기업의 면접에서 자주 나오는 질문에 대비하고 싶다면, </p>
            <p className="pre-2xl-semibold">기업 맞춤형 모의 면접을 통해 철저히 준비하세요</p>
            <button
              type="button"
              className="pre-2xl-semibold bg-blue-1 text-white-0 mt-[55px] py-[15px] px-[35px] rounded-[100px]"
            >
              바로가기
            </button>
          </div>
          <Image
            src="/assets/landing-page/section1-img2.svg"
            alt="AI 모의 면접 이미지"
            width={180}
            height={180}
            className="ml-[50px]"
          />
        </div>
      </section>
      <main>
        <div className="mt-[400px] flex flex-col items-center">
          <p className="pre-3xl-semibold">AI 면접관이 당신의 포트폴리오와 자기소개서를 분석하고</p>
          <p className="pre-3xl-semibold">맞춤형 피드백을 제공합니다</p>
          <p className="pre-2xl-medium text-gray-5 my-[30px]">
            AI의 첨삭과 개선 방안으로 완성도 높은 자기소개서를 작성하세요
          </p>
          <Image src="/assets/landing-page/section2-img1.png" alt="피드백 이미지" width={300} height={120} />
        </div>

        <div className="mt-[400px] flex flex-col items-center">
          <p className="pre-3xl-semibold">AI가 당신의 경력과 자기소개서에 맞춘 </p>
          <p className="pre-3xl-semibold">모의 면접 질문을 제공합니다</p>
          <p className="pre-2xl-medium text-gray-5 mt-[30px]">
            언제 어디서든 AI 면접관과의 모의 면접을 통해 자신만의 페이스로 연습하세요
          </p>
          <div className="relative mt-[100px]">
            <Image
              src="/assets/landing-page/section2-img2.png"
              alt="돋보기 이미지"
              width={80}
              height={80}
              className="absolute  top-[-40px] left-[-40px]"
            />
            <Image src="/assets/landing-page/section2-img3.png" alt="피드백 내용 이미지" width={900} height={900} />
          </div>
        </div>

        <div className="mt-[400px] flex flex-col items-center">
          <p className="pre-3xl-semibold">취업 준비에 필요한 지식과 경험을 블로그와 함께 나누세요</p>
          <p className="pre-2xl-medium text-gray-5 mt-[30px]">
            블로그에서 취업 관련 팁을 공유하고, 다른 사람들과 소통하세요
          </p>
          <div className="mt-[100px]">
            <Image src="/assets/landing-page/section3-img1.svg" alt="남자 그림 이미지" width={200} height={200} />
            <Image src="/assets/landing-page/section3-img2.svg" alt="확성기 이미지" width={200} height={200} />
          </div>
        </div>
      </main>
      <section>
        <div className="mt-[400px] mb-[400px] flex flex-col items-center">
          <Image src="/assets/landing-page/section4.svg" alt="책 이미지" width={300} height={300} />
          <p className="pre-3xl-semibold mt-[50px]">취업 성공을 위한 맞춤형 AI 지원, 지금 시작하세요</p>
          <div className="flex mt-[55px] ">
            <button
              type="button"
              className="flex items-center pre-2xl-semibold bg-blue-1 text-white-0 mx-[10px] py-[15px] px-[35px] rounded-[100px] border border-white-0 border-[3px]"
            >
              <Image
                src="/assets/landing-page/ic-eye.svg"
                alt="눈 아이콘"
                width={20}
                height={20}
                className="mr-[10px]"
              />
              구경해보기
            </button>
            <button
              type="button"
              className="flex items-center pre-2xl-semibold bg-black-0 text-white-0 mx-[10px] py-[15px] px-[35px] rounded-[100px] border border-white-0 border-[3px]"
            >
              <Image
                src="/assets/landing-page/ic-lightning.svg"
                alt="번개 아이콘"
                width={20}
                height={20}
                className="mr-[10px]"
              />
              간편 회원가입
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
