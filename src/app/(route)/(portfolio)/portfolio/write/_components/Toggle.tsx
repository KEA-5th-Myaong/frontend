import { useState } from 'react';

export default function Toggle() {
  const [isOn, setIsOn] = useState<boolean>(false);

  const toggleHandler = (): void => {
    setIsOn((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center ">
      <button
        type="button"
        onClick={toggleHandler}
        className={` ${isOn ? 'bg-green-500' : 'bg-gray-300'} relative cursor-pointer w-10 h-6 rounded-full transition duration-500`}
      >
        {' '}
        <div
          className={`absolute top-1 left-1 w-4 h-4 bg-white-0 rounded-full transition duration-500 ${
            isOn ? 'translate-x-4' : ''
          }`}
        />
      </button>
    </div>
  );
}
