import Link from 'next/link';
import { FORM_TEXT } from '../_constants/forms';
import LoginForm from './_components/LoginForm';
import SocialLogin from './_components/SocialLogin';

export default function Login() {
  return (
    <section className="pt-24 pb-12 form-screen">
      <div className="form-container">
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

            <SocialLogin />
          </div>
        </div>
      </div>
    </section>
  );
}
