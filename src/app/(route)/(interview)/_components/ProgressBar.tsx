export default function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="absolute -top-32 sm:-top-2 flex flex-col gap-2 w-full sm:w-[calc(100%-28px)] md:w-[calc(100%-64px)] lg:w-[calc(100%-80px)] xl:w-[calc(100%-96px)]">
      <div className="flex justify-between w-full text-sm">
        <p>기업 선택</p>
        <p>자소서 선택</p>
        <p>질문 선택</p>
        <p>AI 모의 면접 시작</p>
      </div>
      <div className="bg-[#D9D9D9] h-2 w-full rounded-[10px]">
        <div style={{ width: `${progress}%` }} className="bg-primary-0 h-2 rounded-[10px]" />
      </div>
    </div>
  );
}
