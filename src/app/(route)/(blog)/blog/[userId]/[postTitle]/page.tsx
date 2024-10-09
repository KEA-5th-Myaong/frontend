import PostContent from './_components/PostContent';
import PostComment from './_components/PostComment';
import BackButton from '../../../../../_components/BackButton';

export default function BlogPosts() {
  return (
    <section className="flex justify-center pt-[100px] pb-12">
      <div className="w-full min-w-[375px] max-w-[1000px] px-11 sm:px-[108px]">
        <BackButton />

        {/* 포스트 컨텐츠 */}
        <PostContent />

        {/* 댓글 */}
        <PostComment />
      </div>
    </section>
  );
}
