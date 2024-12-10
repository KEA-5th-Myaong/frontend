interface ToggleProps {
  onToggle: () => void;
  isChecked: boolean;
}

export default function Toggle({ onToggle, isChecked }: ToggleProps) {
  return (
    <div className="flex flex-col items-center ">
      <button
        type="button"
        onClick={onToggle}
        className={` ${isChecked ? 'bg-green-500' : 'bg-gray-300'} relative cursor-pointer w-10 h-6 rounded-full transition duration-500`}
      >
        {' '}
        <div
          className={`absolute top-1 left-1 w-4 h-4 bg-white-0 rounded-full transition duration-500 ${
            isChecked ? 'translate-x-4' : ''
          }`}
        />
      </button>
    </div>
  );
}
