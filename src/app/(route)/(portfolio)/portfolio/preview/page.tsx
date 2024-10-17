'use client';

import { useRouter } from 'next/navigation';
import Footer from '../_components/Footer';
import PortfolioContainer from '../read/_components/PortfolioContainer';

export default function PortfolioPreview() {
  const router = useRouter();

  const handleDoneClick = () => {
    router.push('/portfolio/read');
  };

  return (
    <div className="flex px-[50px] md:px-0 mb-[100px]">
      <div className="mt-[60px]  w-full max-w-[1000px] md:px-[60px] lg:px-0 lg:mx-auto">
        <PortfolioContainer />
      </div>
      <Footer showDone handleDoneClick={handleDoneClick} />
    </div>
  );
}
