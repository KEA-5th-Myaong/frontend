import { FORM_TEXT } from '../../_constants/forms';
import SignUpDetailForm from '../_components/SignUpDetailForm';

export default function SingUpDetail() {
  return (
    <section className="form-screen">
      <div className="form-container">
        <div className="flex flex-col items-center w-full max-w-[660px] px-5">
          <p className="mb-9 form-title">{FORM_TEXT[4]}</p>
          <SignUpDetailForm />
        </div>
      </div>
    </section>
  );
}
