export interface PSReadContentProps {
  label: string;
  content: string;
}

export default function PSReadContent({ label, content }: PSReadContentProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-4">
        <div className="w-2 h-2 rounded-full bg-primary-1" />
        <p className="font-semibold text-xl">{label}</p>
      </div>

      <p className="text-sm">{content}</p>
    </div>
  );
}
