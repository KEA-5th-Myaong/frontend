import UserProfile from './_components/UserProfile';
import PostContainer from './_components/PostContainer';

export default function BlogMain() {
  return (
    <section className="flex justify-center pt-[100px]">
      <div className="w-full max-w-[1300px] min-w-[365px] px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row  gap-3 lg:gap-10 xl:gap-[72px]">
          <UserProfile userName="김현중" follower={0} following={0} isFollowed={false} />
          <PostContainer />
        </div>
      </div>
    </section>
  );
}
