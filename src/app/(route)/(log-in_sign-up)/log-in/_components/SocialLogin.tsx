'use client';

import Image from 'next/image';

export default function SocialLogin() {
  const handleKakaoLogin = () => {
    const KAKAO_AUTH_URL = `${process.env.NEXT_PUBLIC_BASE_URL}oauth2/authorization/kakao`;
    const REDIRECT_URI = 'http://localhost:3000/sign-up/detail';

    window.location.href = `${KAKAO_AUTH_URL}?redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
  };

  return (
    <div className="flex gap-5">
      <Image
        onClick={handleKakaoLogin}
        width={50}
        height={50}
        src="/assets/log-in/kakao-login.png"
        alt="카카오로그인"
        className="rounded-full cursor-pointer"
      />
      <Image
        width={50}
        height={50}
        src="/assets/log-in/google-login.png"
        alt="구글로그인"
        className="rounded-full cursor-pointer"
      />
    </div>
  );
}
