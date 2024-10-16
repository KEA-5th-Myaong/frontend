import BackButton from '@/app/_components/BackButton';

export default function PostWrite() {
  return (
    <div className="flex-center flex-col">
      <div className="flex-center flex-col w-[1000px] h-[850px] ">
        <div className="flex w-full h-12 px-5 mb-2">
          <BackButton />
        </div>
        <div className="flex-col w-full h-[100px] px-10">
          <div className="my-1">
            <p>포스트 작성</p>
          </div>
          <div className="my-3 w-full">
            <input
              type="text"
              placeholder="제목을 입력해주세요"
              className="text-2xl bg-inherit outline-none w-full"
              maxLength={42}
            />
          </div>
        </div>
        <div>
          <div className="flex w-full h-[500px] px-10"></div>
        </div>
      </div>
    </div>
  );
}
