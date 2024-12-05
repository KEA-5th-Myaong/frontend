import { useRef, useCallback, useEffect, useState } from 'react';

export default function Video() {
  const videoRef = useRef<HTMLVideoElement>(null); // 웹캠 비디오 엘리먼트를 참조하기 위한 ref
  const streamRef = useRef<MediaStream | null>(null); // 카메라 스트림 저장하고 관리 위한 ref, MediaStream 객체를 저장하여 카메라 리소스를 제어할 수 있게 함
  const [showFace, setShowFace] = useState(false); // 카메라 표시 여부

  const getMediaPermission = useCallback(async () => {
    try {
      const videoConstraints = {
        audio: false,
        video: true,
      };
      // 유저 디바이스에서 비디오 스트림 가져옴(사용자 웹캠 접근 요청 승인 여부에 따라)
      const videoStream = await navigator.mediaDevices.getUserMedia(videoConstraints);
      streamRef.current = videoStream; // 스트림을 streamRef에 저장하여 나중에 접근할 수 있게

      if (videoRef.current) {
        videoRef.current.srcObject = videoStream; // 비디오 엘리먼트에 스트림 연결
      }
    } catch (err) {
      console.error('비디오 불러오기 에러');
    }
  }, []);

  // 카메라 끄기 함수
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop()); // 모든 비디오 트랙 중단
      if (videoRef.current) {
        videoRef.current.srcObject = null; // 비디오 요소의 스트림 제거
      }
      streamRef.current = null; // 스트림 참조 제거
    }
  }, []);

  useEffect(() => {
    if (showFace) {
      getMediaPermission();
    } else {
      stopCamera();
    }
    // 컴포넌트 언마운트시 카메라 끔
    return () => {
      stopCamera();
    };
  }, [showFace, getMediaPermission, stopCamera]);

  return (
    <div className="fixed left-12 bottom-12 z-50">
      <video
        ref={videoRef}
        className={`${showFace ? 'block' : 'hidden'} w-70 h-64 aspect-video bg-gray-0 -scale-x-100 rounded-xl drop-shadow-xl`}
        autoPlay
      />

      <button
        type="button"
        className="py-4 px-6 rounded-[28px] primary-1-btn mt-2 md:block hidden"
        onClick={() => {
          setShowFace((prev) => !prev);
        }}
      >
        {showFace ? 'AI 표정 분석 종료' : 'AI 표정 분석'}
      </button>
    </div>
  );
}
