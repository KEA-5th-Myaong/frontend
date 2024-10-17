import { useState, useRef } from 'react';
import Icons from '../../../../../_components/ui/Icon';
import { PictureIcon } from '../../../../../_components/ui/iconPath';
import { ImageChangeProps } from '../_types/myPage';

export default function ImageChange({ setProfileImage }: ImageChangeProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // 이미지 미리보기용 url 저장
  const fileInputRef = useRef<HTMLInputElement>(null); // 파일 입력에 대한 참조 생성

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // 선택된 파일 가져옴
    if (file) {
      setProfileImage(file); // 선택 파일을 부모 컴포넌트의 상태(profileImage)로 설정
      const reader = new FileReader(); // FileReader 객체를 생성하여 파일을 읽음

      // 파일 읽기가 완료되면 실행될 콜백 함수
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string); // 읽은 결과(DataURL)를 미리보기 URL로 설정
      };
      reader.readAsDataURL(file); // 파일을 DataURL로 읽기 시작
    }
  };
  return (
    <div className="flex flex-col max-w-[160px]">
      <p className="font-semibold pb-[18px]">프로필 사진</p>
      <div className="w-[160px] h-[160px] rounded-[10px] bg-[#FBFBFB] border border-[#D9D9D9]">
        {previewUrl ? (
          <img src={previewUrl} alt="Profile" className="w-full h-full object-cover rounded-[10px]" />
        ) : (
          <Icons className="h-full m-auto" name={PictureIcon} />
        )}
      </div>
      {/* 숨겨진 파일 입력 요소 */}
      <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
      <button type="button" onClick={() => fileInputRef.current?.click()} className="py-2 mt-[14px] primary-1-btn">
        프로필 수정
      </button>
    </div>
  );
}
