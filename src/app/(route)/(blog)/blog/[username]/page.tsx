import UserProfile from './_components/UserProfile';
import PostContainer from './_components/PostContainer';

export default function BlogMain() {
  return (
    <section className="flex justify-center pt-14 md:pt-10 pb-12">
      <div className="w-full max-w-[1300px] min-w-[365px] px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row  gap-3 lg:gap-10 xl:gap-[72px]">
          <UserProfile />
          <div className="w-full">
            <div className="pt-[22px] pb-[17px] font-semibold">최근 포스트</div>
            <PostContainer />
          </div>
        </div>
      </div>
    </section>
  );
}
