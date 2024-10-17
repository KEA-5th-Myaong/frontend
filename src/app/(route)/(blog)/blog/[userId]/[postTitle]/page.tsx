import PostContent from './_components/PostContent';
import PostComment from './_components/_comment/PostComment';
import BackButton from '../../../../../_components/BackButton';

export default function BlogPosts() {
  return (
    <section className="flex justify-center pt-10 pb-12">
      <div className="w-full min-w-[360px] max-w-[1000px] px-11 sm:px-20 md:px-[108px]">
        <BackButton className="pb-6" />

        {/* 포스트 컨텐츠 */}
        <PostContent />

        {/* 댓글 */}
        <PostComment />
      </div>
    </section>
  );
}
