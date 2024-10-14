import MyPageHeader from '../../_components/MyPageHeader';
import ChangeProfileContainer from './_components/ChangeProfileContainer';

export default function ChangeProfile() {
  return (
    <div className="flex flex-col items-center w-full px-14">
      <MyPageHeader />
      <div className="flex justify-center w-full">
        <ChangeProfileContainer />
      </div>
    </div>
  );
}
