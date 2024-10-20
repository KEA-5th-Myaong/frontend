'use client';

import { useParams, useRouter } from 'next/navigation';
import PortfolioContainer from '../read/_components/PortfolioContainer';
import Footer from '../../../_components/Footer';

export default function PortfolioPreview() {
  const router = useRouter();

  const params = useParams();
  const { portfolioId } = params;

  const handleDoneClick = () => {
    if (portfolioId) {
      router.push(`/portfolio/${portfolioId}/read`);
    }
  };

  return (
    <div className="flex px-[50px] md:px-0 mb-[100px]">
      <div className="mt-[60px] w-full max-w-[1000px] md:px-[60px] lg:px-0 lg:mx-auto">
        <PortfolioContainer />
      </div>
      <Footer showDone handleDoneClick={handleDoneClick} />
    </div>
  );
}
