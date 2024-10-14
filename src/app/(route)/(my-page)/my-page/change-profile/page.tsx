import MyPageHeader from '../../_components/MyPageHeader';
import ChangeProfileContainer from './_components/ChangeProfileContainer';

export default function ChangeProfile() {
  return (
    <section className="flex justify-center w-full min-h-screen pt-[100px]">
      <div className="flex flex-col items-center w-full px-14">
        <MyPageHeader />
        <div className="flex justify-center w-full">
          <ChangeProfileContainer />
        </div>
      </div>
    </section>
  );
}
