'use client';

import BackButton from '@/app/_components/BackButton';
import PortfolioContainer from './PortfolioContainer';

export default function PortfolioPreview() {
  return (
    <div className="flex px-[50px] md:px-0 mb-[100px]">
      <div className="mt-[60px] w-full max-w-[1000px] md:px-[60px] lg:px-0 lg:mx-auto">
        <BackButton className="flex max-w-fit mt-12 mb-2" />
        <PortfolioContainer />
      </div>
    </div>
  );
}
