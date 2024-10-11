'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Home() {
  const router = useRouter();

  const cardAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300, // 애니메이션이 튕기는 정도
        damping: 20, // 튕기는 속도와 부드러움을 조절
        duration: 1, // 전체 애니메이션 지속 시간
      },
    },
  };

  const easeInOutAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ease: 'easeInOut',
        duration: 1,
        y: { duration: 1 },
      },
    },
  };
  return (
    <div className="flex flex-col relative items-center text-center pt-[50px] bg-gradient-to-b from-[#F1F1F5] to-[#D8ECFF] h-full ">
      <Image src="/assets/logo-lg.svg" alt="PPLOG 로고" width={130} height={130} className="hidden sm:block" />
      <Image src="/assets/logo-sm.svg" alt="PPLOG 로고" width={80} height={80} className="block sm:hidden" />
      <Image
        src="/assets/landing-page/img-orange-circle.svg"
        alt="주황색 배경 효과"
        width={600}
        height={600}
        className="absolute z-[0] left-[-300px] "
      />
      <Image
        src="/assets/landing-page/img-orange-circle.svg"
        alt="주황색 배경 효과"
        width={600}
        height={600}
        className="absolute z-[0] sm:top-[600px] md:top-[800px] right-[-300px]"
      />
      <Image
        src="/assets/landing-page/landing-light.svg"
        alt="조명 이미지"
        width={120}
        height={120}
        className="mt-[110px]"
      />

      <section className="flex flex-col items-center px-[30px]">
        <div className="sm:pre-2xl-semibold md:pre-3xl-semibold mt-[60px]">
          <p>포트폴리오부터 면접까지,</p>
          <p> 완벽한 준비를 위한 All-in-One 솔루션</p>
        </div>
        <motion.div
          variants={cardAnimation}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          className="flex items-center z-[2] text-left bg-white-0 sm:w-[500px] md:w-[700px] lg:w-[900px] sm:h-[250px] md:h-[300px] rounded-[80px] mt-[50px] py-[50px] sm:pl-[50px] md:pl-[60px] lg:pl-[90px]"
        >
          <div>
            <p className="sm:text-[12px]  md:text-[15px] font-semibold text-blue-0 mb-[8px]">AI 자소서 첨삭</p>
            <p className="sm:pre-xl-semibold md:pre-2xl-semibold">
              자기소개서에서 <br className="block lg:hidden" />
              강점을 명확하게 표현하지 못해 고민이라면,
            </p>
            <p className="sm:pre-xl-semibold md:pre-2xl-semibold"> AI 첨삭으로 개선 방안을 제안받아 보세요</p>
            <button
              type="button"
              className="sm:pre-xl-semibold md:pre-2xl-semibold bg-blue-1 text-white-0 sm:mt-[20px] md:mt-[55px] sm:py-[10px] md:py-[15px] px-[35px] rounded-[100px] hover:scale-105 transform transition-transform duration-200 ease-out"
            >
              {/* //TODO: 자소서 첨삭 링크 어디로 연결할지 논의 필요 */}
              바로가기
            </button>
          </div>
          <Image
            src="/assets/landing-page/section1-img.svg"
            alt="AI 자소서 첨삭 이미지"
            width={220}
            height={200}
            className="sm:ml-[8px] md:ml-[30px] mr-[10px] sm:w-[170px] sm:h-[170px] md:w-[220px] md:h-[220px] lg:w-[300px] lg:h-[300px]"
          />
        </motion.div>
        <motion.div
          variants={cardAnimation}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          className="flex z-[2] text-left bg-white-0 sm:w-[500px] md:w-[700px] lg:w-[900px] sm:h-[250px] md:h-[300px] rounded-[80px] mt-[20px] py-[50px]  sm:pl-[50px] md:pl-[60px] lg:pl-[90px]"
        >
          <div>
            <p className="sm:text-[12px] md:text-[15px] font-semibold text-blue-0 mb-[8px]">AI 모의 면접</p>
            <p className="sm:pre-xl-semibold md:pre-2xl-semibold">
              선호하는 기업의 면접에서 <br className="block lg:hidden" />
              자주 나오는 질문에 대비하고 싶다면,
            </p>
            <p className="sm:pre-xl-semibold md:pre-2xl-semibold">기업 맞춤형 모의 면접을 통해 철저히 준비하세요</p>
            <button
              type="button"
              className="sm:pre-xl-semibold md:pre-2xl-semibold bg-blue-1 text-white-0 sm:mt-[20px] md:mt-[40px] lg:mt-[55px] sm:py-[10px] md:py-[15px] px-[35px] rounded-[100px] hover:scale-105 transform transition-transform duration-200 ease-out"
            >
              {/* //TODO: 모의 면접 링크 어디로 연결할지 논의 필요 */}
              바로가기
            </button>
          </div>
          <Image
            src="/assets/landing-page/section1-img2.svg"
            alt="AI 모의 면접 이미지"
            width={180}
            height={180}
            className="sm:ml-[8px] md:ml-[30px] mr-[10px] sm:w-[130px] sm:h-[130px] md:w-[170px] md:h-[170px] lg:w-[200px] lg:h-[200px]"
          />
        </motion.div>
      </section>
      <main>
        <motion.div
          variants={easeInOutAnimation}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          className="relative mt-[400px] flex flex-col items-center"
        >
          <p className="sm:pre-2xl-semibold md:pre-3xl-semibold">
            AI 면접관이 당신의 포트폴리오와 자기소개서를 분석하고
          </p>
          <p className="sm:pre-2xl-semibold md:pre-3xl-semibold">맞춤형 피드백을 제공합니다</p>
          <p className="sm:pre-xl-medium md:pre-2xl-medium text-gray-5 my-[30px]">
            AI의 첨삭과 개선 방안으로 완성도 높은 자기소개서를 작성하세요
          </p>
          <Image
            src="/assets/landing-page/section2-img1.svg"
            alt="피드백 이미지"
            width={300}
            height={120}
            className="z-[1]"
          />
          <Image
            src="/assets/landing-page/blue-background.svg"
            alt="파란색 배경 이미지"
            width={400}
            height={300}
            className="absolute top-[120px] left-[150px] z-[0] "
          />
        </motion.div>

        <motion.div
          variants={easeInOutAnimation}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          className="mt-[400px] flex flex-col items-center px-[60px]"
        >
          <p className="sm:pre-2xl-semibold md:pre-3xl-semibold">AI가 당신의 경력과 자기소개서에 맞춘 </p>
          <p className="sm:pre-2xl-semibold md:pre-3xl-semibold">모의 면접 질문을 제공합니다</p>
          <p className="sm:pre-xl-medium md:pre-2xl-medium text-gray-5 mt-[30px]">
            언제 어디서든 AI 면접관과의 모의 면접을 통해 자신만의 페이스로 연습하세요
          </p>
          <div className="relative mt-[100px]">
            <Image
              src="/assets/landing-page/section3-img1.svg"
              alt="돋보기 이미지"
              width={80}
              height={80}
              className="absolute top-[-40px] sm:left-[-10px] md:left-[-40px]"
            />
            <Image
              src="/assets/landing-page/section3-img2-sm.svg"
              alt="피드백 내용 이미지"
              width={600}
              height={600}
              className="block md:hidden"
            />

            <Image
              src="/assets/landing-page/section3-img2.svg"
              alt="피드백 내용 이미지"
              width={900}
              height={900}
              className="hidden md:block"
            />
          </div>
        </motion.div>

        <motion.div
          variants={easeInOutAnimation}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          className="mt-[400px] flex flex-col items-center"
        >
          <p className="sm:pre-2xl-semibold md:pre-3xl-semibold">
            취업 준비에 필요한 지식과 경험을 블로그와 함께 나누세요
          </p>
          <p className="sm:pre-xl-medium md:pre-2xl-medium text-gray-5 mt-[30px]">
            블로그에서 취업 관련 팁을 공유하고, 다른 사람들과 소통하세요
          </p>
          <div className="mt-[100px] px-[30px]">
            <div className="flex relative">
              <Image
                src="/assets/landing-page/section4-front.svg"
                alt="프론트엔드 개발자 포스트 이미지"
                width={500}
                height={200}
                className="mr-[30px]"
              />
              <Image
                src="/assets/landing-page/section4-img1.svg"
                alt="남자 그림 이미지"
                width={250}
                height={200}
                className="z-[1] sm:hidden md:block"
              />
              <Image
                src="/assets/landing-page/blue-background.svg"
                alt="파란색 배경 이미지"
                width={400}
                height={300}
                className="absolute right-[-120px] top-[-80px] z-[0] hidden md:block"
              />
            </div>
            <div className="flex mt-[30px]">
              <Image
                src="/assets/landing-page/section4-img2.svg"
                alt="확성기 이미지"
                width={200}
                height={150}
                className="mr-[30px] hidden md:block"
              />
              <Image
                src="/assets/landing-page/section4-back.svg"
                alt="백엔드 개발자 포스트 이미지"
                width={500}
                height={200}
              />
            </div>
          </div>
        </motion.div>
      </main>
      <section>
        <motion.div
          variants={easeInOutAnimation}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          className="mt-[400px] mb-[400px] flex flex-col items-center"
        >
          <Image src="/assets/landing-page/section5.svg" alt="책 이미지" width={300} height={300} />
          <p className="sm:pre-2xl-semibold md:pre-3xl-semibold mt-[50px]">
            취업 성공을 위한 맞춤형 AI 지원, 지금 시작하세요
          </p>
          <div className="flex mt-[55px] ">
            <button
              type="button"
              className="flex items-center sm:pre-xl-semibold md:pre-2xl-semibold bg-blue-1 text-white-0 mx-[10px] py-[15px] px-[35px] rounded-[100px] border border-white-0 border-[3px] hover:scale-105 transform transition-transform duration-200 ease-out"
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
              onClick={() => {
                router.push('/log-in');
              }}
              className="flex items-center sm:pre-xl-semibold md:pre-2xl-semibold bg-black-0 text-white-0 mx-[10px] py-[15px] px-[35px] rounded-[100px] border border-white-0 border-[3px] hover:scale-105 transform transition-transform duration-200 ease-out"
            >
              <Image
                src="/assets/landing-page/ic-lightning.svg"
                alt="번개 아이콘"
                width={20}
                height={20}
                className="mr-[10px] "
              />
              간편 회원가입
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
