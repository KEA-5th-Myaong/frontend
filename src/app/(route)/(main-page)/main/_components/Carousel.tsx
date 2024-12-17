'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Link from 'next/link';
import useMe from '@/app/_hooks/useMe';

export default function Carousel() {
  const { data: userData } = useMe();
  const [settings, setSettings] = useState({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // md 이상일 경우
        setSettings((prev) => ({
          ...prev,
          slidesToShow: 1,
          centerMode: false,
          centerPadding: '100px',
        }));
      } else if (window.innerWidth >= 480) {
        // sm breakpoint
        setSettings((prev) => ({
          ...prev,
          slidesToShow: 1,
          centerMode: false,
          centerPadding: '50px',
        }));
      } else {
        setSettings((prev) => ({
          ...prev,
          slidesToShow: 1,
          centerMode: false,
          centerPadding: '0px',
        }));
      }
    };

    handleResize(); // 초기 설정
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      id="캐러셀"
      className="slider-container w-full aspect-[16/9] max-h-[280px] rounded-[10px] relative overflow-visible focus:outline-none pt-12 md:pt-0"
    >
      <Slider {...settings}>
        <div className="px-2 sm:px-4 md:px-6">
          <Image src="/assets/carousel1.png" alt="캐러셀 1" width={800} height={280} className="rounded-xl w-full" />
        </div>
        <div className="px-2 sm:px-4 md:px-6">
          <Link href="/portfolio">
            <Image src="/assets/carousel2.jpg" alt="캐러셀 2" width={800} height={280} className="rounded-xl w-full" />
          </Link>
        </div>
        <div className="px-2 sm:px-4 md:px-6">
          <Link href={`/interview/${userData?.data?.username}/select`}>
            <Image src="/assets/carousel3.jpg" alt="캐러셀 3" width={800} height={280} className="rounded-xl w-full" />
          </Link>
        </div>
      </Slider>
    </div>
  );
}
