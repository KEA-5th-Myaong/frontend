'use client';

import Icons from '@/app/_components/ui/Icon';
import { XIcon } from '@/app/_components/ui/iconPath';
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

  const handleImageRemove = () => {
    setPreviewUrl(null); // 이미지 삭제
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // 파일 선택 초기화
    }
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex-center flex-col  w-[150px] h-[150px] my-8 bg-white-0 border border-gray-5 rounded-[12px] cursor-pointer"
    >
      {previewUrl ? (
        <div className="relative w-full h-full">
          <img src={previewUrl} alt="프로필 사진" className="w-full h-full object-cover rounded-[12px]" />
          <button type="button" onClick={handleImageRemove} className="absolute top-2 right-2 z-[40]">
            <Icons name={XIcon} />
          </button>
        </div>
      ) : (
        <div className="flex-center flex-col">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
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
