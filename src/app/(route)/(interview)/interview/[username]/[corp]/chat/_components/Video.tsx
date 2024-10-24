import { useRef, useCallback, useEffect, useState } from 'react';

export default function Video() {
  // 테스트 화면 녹화하기
  const videoRef = useRef<HTMLVideoElement>(null);

  const getMediaPermission = useCallback(async () => {
    try {
      // const audioConstraints = { audio: true };
      const videoConstraints = {
        audio: false,
        video: true,
      };

      // const audioStream = await navigator.mediaDevices.getUserMedia(audioConstraints);
      const videoStream = await navigator.mediaDevices.getUserMedia(videoConstraints);

      if (videoRef.current) {
        videoRef.current.srcObject = videoStream;
      }
    } catch (err) {
      console.error('비디오 불러오기 에러');
    }
  }, []);

  useEffect(() => {
    getMediaPermission();
  }, [getMediaPermission]);

  const [showFace, setShowFace] = useState(false);

  return (
    <div className="fixed left-12 bottom-12 z-50">
      <video
        ref={videoRef}
        className={`${showFace ? 'block' : 'hidden'} w-70 h-64 bg-gray-0 -scale-x-100 rounded-xl drop-shadow-xl`}
        autoPlay
      />

      <button
        type="button"
        className="py-4  px-6 rounded-[28px] primary-1-btn mt-2 md:block hidden"
        onClick={() => {
          setShowFace((prev) => !prev);
        }}
      >
        {showFace ? 'AI 표정 분석 종료' : 'AI 표정 분석'}
      </button>
    </div>
  );
}
