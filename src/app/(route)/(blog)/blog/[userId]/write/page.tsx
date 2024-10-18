import BackButton from '../../../../../_components/BackButton';
import PostInput from './_components/PostInput';

export default function PostWrite() {
  return (
    <section className="flex mx-auto flex-col w-full min-w-[360px] max-w-[1000px] pb-12 px-5">
      <div className="w-full">
        <BackButton className="flex w-full pt-12 px-5 mb-2" />

        <div className="flex-col w-full py-3 px-[10px]">
          <p className="py-1">포스트 작성</p>

          <input
            type="text"
            placeholder="제목을 입력해주세요"
            className="text-3xl font-semibold outline-none w-full my-3"
            maxLength={42}
          />
        </div>

        <PostInput />

        <div className="flex justify-end w-full pt-16">
          <button type="button" className="py-[18px] px-6 rounded-[28px] primary-1-btn">
            작성 완료
          </button>
        </div>
      </div>
    </section>
  );
}
