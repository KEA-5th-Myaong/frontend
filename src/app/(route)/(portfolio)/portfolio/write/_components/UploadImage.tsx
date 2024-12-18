'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import Icons from '@/app/_components/ui/Icon';
import { XIcon } from '@/app/_components/ui/iconPath';
import { postPortfoliosPic } from '@/app/(route)/(portfolio)/_services/portfolioServices';

interface UploadImageProps {
  onImageUpload: (url: string | null) => void; // 업로드 후 URL 전달
}

export default function UploadImage({ onImageUpload }: UploadImageProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // 이미지 미리보기 URL
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click(); // 클릭 시 파일 선택 창 열기
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('pic', file); // FormData에 파일 추가

      try {
        const picUrl = await postPortfoliosPic(formData); // URL 반환
        onImageUpload(String(picUrl)); // 부모 컴포넌트에 URL 전달
        setPreviewUrl(String(picUrl)); // URL 상태 설정
      } catch (error) {
        console.error('이미지 업로드 실패:', error);
      }
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
      className="flex-center flex-col  w-[150px] h-[150px] my-8 bg-white-0 border  dark:bg-black-8 border-gray-5 rounded-xl cursor-pointer"
    >
      {previewUrl ? (
        <div className="relative w-full h-full">
          <img src={previewUrl} alt="프로필 사진" className="w-full h-full object-cover rounded-xl" />
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
