import { FORM_TEXT } from '../../_constants/forms';
import ChangePwdForm from '../_components/ChangePwdForm';

export default function ChangePwdContainer() {
  return (
    <div className="flex-center flex-col self-stretch">
      <div className="flex flex-col items-center w-full min-w-[355px] max-w-[660px] px-5">
        <p className="mb-9 form-title">{FORM_TEXT[12]}</p>
        <ChangePwdForm />
      </div>
    </div>
  );
}
