interface FollowButtonProps {
  count: number;
  label: string;
  onClick: () => void;
}

export default function FollowButton({ count, label, onClick }: FollowButtonProps) {
  return (
    <button type="button" className="flex flex-col items-center gap-2.5" onClick={onClick}>
      <p className="text-xl">{count}</p>
      <p>{label}</p>
    </button>
  );
}
