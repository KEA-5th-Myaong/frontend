import BackButton from '../../../../../_components/BackButton';
import PostInput from './_components/PostInput';

export default function PostWrite() {
  return (
    <div className="flex-center flex-col">
      <div className="flex-center flex-col w-[1000px] h-[800px] ">
        <div className="flex w-full h-12 px-5 mb-2">
          <BackButton />
        </div>
        <div className="flex-col w-full py-3 px-10">
          <div className="my-1">
            <p>포스트 작성</p>
          </div>
          <div className="my-3 w-full">
            <input
              type="text"
              placeholder="제목을 입력해주세요"
              className="text-3xl font-semibold outline-none w-full"
              maxLength={42}
            />
          </div>
        </div>
        <div className="flex-center w-full py-3 px-10">
          <PostInput />
        </div>
        <div className="relative w-[920px] h-13">
          <button type="button" className="absolute w-32 h-12 text-sm rounded-3xl bg-primary-1 text-white-0  right-0">
            작성 완료
          </button>
        </div>
      </div>
    </div>
  );
}
