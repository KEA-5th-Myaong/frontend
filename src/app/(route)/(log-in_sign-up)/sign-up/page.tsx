import { FORM_TEXT } from '../_constants/forms';
import SignUpForm from './_components/SignUpForm';
import BackButton from '../../../_components/BackButton';

export default function SignUp() {
  return (
    <section className="flex flex-col pt-16 w-full min-w-[360px]">
      <div className="flex-center flex-col self-stretch">
        <div className="w-full max-w-[660px] pl-4 mt-8 md:mt-0">
          <BackButton />
        </div>
        <div className="flex flex-col items-center w-full max-w-[660px] px-5">
          <p className="mb-9 form-title">{FORM_TEXT[4]}</p>
          <SignUpForm />
        </div>
      </div>
    </section>
  );
}
