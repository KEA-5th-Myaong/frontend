import MyPageHeader from '../../_components/MyPageHeader';
import ChangePwdContainer from './_components/ChangePwdContainer';

export default function ChangePassword() {
  return (
    <div className="flex flex-col items-center w-full px-14">
      <MyPageHeader />
      <p className="pt-14 font-semibold text-xl sm:text-[32px]">비밀번호 변경</p>

      <ChangePwdContainer />
    </div>
  );
}
