import Link from 'next/link';
import { FORM_TEXT } from '../../_constants/forms';
import LoginForm from '../_components/LoginForm';

export default function LogInContainer() {
  return (
    <div className="flex-center flex-col self-stretch">
      <div className="flex flex-col items-center w-1/3">
        <p className="mb-6 text-3xl font-bold text-center">{FORM_TEXT[0]}</p>
        <LoginForm />

        <div className="flex self-stretch justify-around mt-6">
          <Link href="/" className="">
            {FORM_TEXT[3]}
          </Link>

          <Link href="/sign-up" className="">
            {FORM_TEXT[4]}
          </Link>
        </div>

        <div className="w-1/2 my-6 mx-auto bg-gray-1 h-[2px]" />

        <div className="flex flex-col self-stretch items-center">
          <span className="text-lg font-semibold mb-4">간편로그인</span>

          <div className="flex gap-12">
            <div className="bg-yellow-300 rounded-full p-6 cursor-pointer" />
            <div className="bg-gray-0 rounded-full border-2 p-6 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
}