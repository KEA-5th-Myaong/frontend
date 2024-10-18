import MyPageHeader from '../../_components/MyPageHeader';
import WithdrawContainer from './_components/WithdrawContainer';

export default function Withdraw() {
  return (
    <div className="flex flex-col items-center w-full px-14">
      <MyPageHeader currentPage="withdraw" />
      <div className="flex flex-col items-center w-full">
        <p className="pt-14 pre-2xl-semibold sm:text-[32px]">회원 탈퇴</p>
        <p className="pt-9 font-medium text-base sm:text-2xl text-gray-0">본인 확인을 위해 비밀번호를 입력해 주세요.</p>
      </div>

      <WithdrawContainer />
    </div>
  );
}
