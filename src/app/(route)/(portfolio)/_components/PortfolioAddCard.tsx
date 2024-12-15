import Image from 'next/image';
import Link from 'next/link';

export default function PortfolioAddCard() {
  return (
    <Link
      href="/portfolio/write"
      className="flex-center flex-col max-w-[320px] w-full py-[51px] bg-white-0 border border-gray-5 rounded-xl transition-transform duration-200 hover:scale-105"
    >
      <Image src="/assets/add-button.svg" alt="포트폴리오 추가" width={50} height={50} className="hover-animation" />
      <p className="mt-2.5 text-gray-0">포트폴리오를 추가해보세요</p>
    </Link>
  );
}
