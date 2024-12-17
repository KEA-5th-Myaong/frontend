'use client';

import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Link from 'next/link';
import useMe from '@/app/_hooks/useMe';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  pauseOnHover: true,
};

export default function Carousel() {
  const { data: userData } = useMe();
  console.log(userData);
  return (
    <div
      id="캐러셀"
      className="slider-container w-full aspect-[16/9] max-h-[280px] rounded-[10px] relative overflow-visible focus:outline-none"
    >
      <Slider {...settings}>
        <div className="ml-[70px]">
          <Image src="/assets/carousel1.png" alt="캐러셀 1" width={800} height={280} />
        </div>
        <div className="ml-[70px]">
          <Link href="/portfolio">
            <Image src="/assets/carousel2.jpg" alt="캐러셀 2" width={800} height={280} className="rounded-xl " />
          </Link>
        </div>
        <div className="ml-[70px]">
          <Link href={`/interview/${userData?.data?.username}/select`}>
            <Image src="/assets/carousel3.jpg" alt="캐러셀 3" width={800} height={280} className="rounded-xl " />
          </Link>
        </div>
      </Slider>
    </div>
  );
}
