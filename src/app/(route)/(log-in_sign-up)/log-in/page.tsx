import Link from 'next/link';
import Image from 'next/image';
import { FORM_TEXT } from '../_constants/forms';
import LoginForm from './_components/LoginForm';

export default function Login() {
  return (
    <section className="flex flex-col pt-24 pb-12 w-full">
      <div className="flex-center flex-col self-stretch">
        <div className="flex flex-col items-center w-full min-w-[355px] max-w-[660px] px-5">
          <p className="form-title">{FORM_TEXT[0]}</p>
          <LoginForm />

          <div className="flex mt-6 gap-3">
            <Link href="/change-pwd" className="text-gray-1 underline mt-6">
              {FORM_TEXT[12]}
            </Link>
            <Link href="/terms-of-use" className="text-gray-1 underline mt-6">
              회원가입
            </Link>
          </div>

          <div className="flex flex-col self-stretch items-center mt-[17px]">
            <span className="mb-4 text-gray-3">{FORM_TEXT[5]}</span>

            <div className="flex gap-5">
              <Image
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
          </div>
        </div>
      </div>
    </section>
  );
}
