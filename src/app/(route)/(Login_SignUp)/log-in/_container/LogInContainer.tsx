import { FORM_TEXT } from '../../_constants/forms';
import LoginForm from '../_components/LoginForm';

export default function LogInContainer() {
  return (
    <div className="flex-center flex-col self-stretch">
      <div className="flex flex-col items-center w-full min-w-[355px] max-w-[660px] px-5">
        <p className="form-title">{FORM_TEXT[0]}</p>
        <LoginForm />

        <div className="flex flex-col self-stretch items-center mt-[60px]">
          <span className="mb-4 text-gray-3">{FORM_TEXT[5]}</span>

          <div className="flex gap-5">
            <div className="bg-yellow-300 rounded-full p-6 cursor-pointer" />
            <div className="bg-white-0 rounded-full border-2 p-6 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
}
