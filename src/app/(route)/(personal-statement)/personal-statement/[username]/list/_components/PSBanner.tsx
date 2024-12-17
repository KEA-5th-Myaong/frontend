import Image from 'next/image';
import Link from 'next/link';
import useMe from '@/app/_hooks/useMe';

export default function PSBanner() {
  const { data: userData } = useMe();

  return (
    <div className="w-full h-52 flex-center px-2 sm:pr-4 mb-10 max-w-[1000px] min-w-[360px] bg-primary-4 border-[2px] border-gray-50 rounded-2xl">
      <div className="flex flex-col items-start text-left text-black-4 ml-7">
        <h1 className="text-[32px] font-bold">자기소개서</h1>
        <p className="text-sm mt-2 font-semibold">자기소개서에서 강점을 명확하게 표현하지 못해 고민이라면,</p>
        <p className="text-sm font-semibold">
          <span className="text-blue-400">AI 맞춤형 피드백으로</span> 개선 방안을 제안받아 보세요{' '}
        </p>
      </div>
      <div className="flex gap-5 text-[11px] text-black-4 ml-6">
        <Link href={`/personal-statement/${userData?.data?.memberId}/editing`}>
          <button
            type="button"
            className="hover-animation bg-white-0 rounded-xl px-2 py-3 font-bold flex flex-col items-center"
          >
            <Image src="/assets/banner/banner-button-1.svg" alt="AI 자소서 첨삭 바로가기" width={60} height={60} />
            <p>
              AI 자기소개서 첨삭
              <br /> 바로가기
            </p>
          </button>
        </Link>

        <Link href={`/personal-statement/${userData?.data?.memberId}/create`}>
          <button
            type="button"
            className="hover-animation bg-white-0 rounded-xl px-4 py-3 font-bold flex flex-col items-center"
          >
            <Image src="/assets/banner/banner-button-2.svg" alt="자소서 작성 바로가기" width={60} height={60} />
            <p>
              자기소개서 작성
              <br /> 바로가기
            </p>
          </button>
        </Link>

        <Link href={`/interview/${userData?.data?.username}/select`}>
          <button
            type="button"
            className="hover-animation bg-white-0 rounded-xl px-3 py-3 font-bold flex flex-col items-center"
          >
            <Image src="/assets/banner/banner-button-3.svg" alt="모의면접 바로가기" width={60} height={60} />
            <p>
              자기소개서 기반
              <br /> 모의 면접 바로가기
            </p>
          </button>
        </Link>
      </div>

      <Image
        src="/assets/banner/banner-ps-img.svg"
        alt="자기소개서 배너 이미지 "
        width={220}
        height={220}
        className="ml-5"
      />
    </div>
  );
}
