export default function PSEditingBox({ label, content }: { label: string; content: string }) {
  return (
    <div className="w-full bg-primary-0 rounded-[10px] pt-10 sm:pt-12 pb-9 sm:pb-28 px-5">
      <p className="font-semibold pb-[18px]">{label}</p>
      <div className="bg-white-0 px-4 pt-5 pb-8 sm:p-7 h-72 sm:h-[412px] overflow-scroll hide-scrollbar">{content}</div>
    </div>
  );
}
