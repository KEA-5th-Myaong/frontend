import Link from 'next/link';
import { FORM_TEXT } from '../../_constants/forms';
import LoginForm from '../_components/LoginForm';

export default function LogInContainer() {
  return (
    <div className="flex-center flex-col self-stretch">
      <div className="flex flex-col items-center w-1/3">
        <p className="mb-8 text-[22px] font-semibold text-center">{FORM_TEXT[0]}</p>
        <LoginForm />

        <div className="flex self-stretch justify-around mt-6">
          <Link href="/" className="text-xs">
            {FORM_TEXT[3]}
          </Link>

          <Link href="/sign-up" className="text-xs">
            {FORM_TEXT[4]}
          </Link>
        </div>

        <div className="flex flex-col self-stretch items-center mt-8">
          <span className="text-xs mb-4 text-gray-3">SNS로 바로 시작하기</span>

          <div className="flex gap-12">
            <div className="bg-yellow-300 rounded-full p-6 cursor-pointer" />
            <div className="bg-gray-0 rounded-full border-2 p-6 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
}
