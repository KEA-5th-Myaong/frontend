'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';

export default function UploadImage() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click(); // 클릭 시 파일 선택 창 열기
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex-center flex-col  w-[150px] h-[150px] my-8 bg-white-0 border border-gray-5 rounded-[12px] cursor-pointer"
    >
      {previewUrl ? (
        <img src={previewUrl} alt="프로필 사진" className="w-full h-full object-cover rounded-[12px]" />
      ) : (
        <div className="flex-center flex-col">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="display-none"
          />
          <Image
            src="/assets/add-button.svg"
            alt="포트폴리오 추가"
            width={30}
            height={30}
            className="hover-animation"
          />
          <p className="mt-2 font-semibold">사진 추가</p>
          <p className="mt-1 text-[11px]">1:1 비율 권장</p>
        </div>
      )}
    </button>
  );
}
