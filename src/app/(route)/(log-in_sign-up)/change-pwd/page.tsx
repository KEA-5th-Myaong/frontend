import Link from 'next/link';
import { FORM_TEXT } from '../_constants/forms';
import ChangePwdForm from './_components/ChangePwdForm';

export default function ChangePwd() {
  return (
    <section className="pt-24 pb-12 form-screen">
      <div className="flex-center flex-col self-stretch">
        <div className="flex flex-col items-center w-full min-w-[355px] max-w-[660px] px-5">
          <p className="mb-9 form-title">{FORM_TEXT[12]}</p>
          <ChangePwdForm />

          <Link href="/log-in" className="text-gray-1 underline mt-6">
            {FORM_TEXT[13]}
          </Link>
        </div>
      </div>
    </section>
  );
}
