export default function CommentInput() {
  return (
    <div className="flex flex-col mt-10 gap-[10px]">
      <textarea
        className="resize-none px-[18px] py-[10px] w-full border min-h-[104px] rounded-lg placeholder:text-gray-3"
        placeholder="댓글을 작성하려면 로그인 해주세요"
      />

      <button type="button" className="self-end px-[21.5px] py-[7.5px] primary-1-btn">
        댓글 등록
      </button>
    </div>
  );
}
