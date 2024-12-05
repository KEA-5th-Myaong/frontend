import { useRef, useCallback, useEffect, useState } from 'react';
import { postAnalyzeExpression } from '@/app/(route)/(interview)/_services/interviewService';

export default function Video() {
  const videoRef = useRef<HTMLVideoElement>(null); // 웹캠 비디오 엘리먼트를 참조하기 위한 ref
  const streamRef = useRef<MediaStream | null>(null); // 카메라 스트림 저장하고 관리 위한 ref, MediaStream 객체를 저장하여 카메라 리소스를 제어할 수 있게 함
  const [showFace, setShowFace] = useState(false); // 카메라 표시 여부
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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

  // Blob를 base64 문자열로 변환하는 유틸리티 함수
  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          // data:image/jpeg;base64, 부분을 제거하고 순수 base64 문자열만 추출
          const base64String = reader.result.split(',')[1];
          resolve(base64String);
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const captureFrame = useCallback(async () => {
    if (!videoRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(videoRef.current, 0, 0);

    // 캔버스를 Blob으로 변환
    canvas.toBlob(async (blob) => {
      if (blob) {
        try {
          // Blob을 base64로 변환
          const base64String = await blobToBase64(blob);
          // 요구사항에 맞는 형식으로 데이터 구성
          const data = {
            image: base64String,
          };
          await postAnalyzeExpression(data);
        } catch (error) {
          console.error('이미지 변환 또는 전송 실패:', error);
        }
      }
    }, 'image/jpeg');
  }, []);

  const startAnalysis = useCallback(() => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(captureFrame, 1000);
  }, [captureFrame]);

  const stopAnalysis = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      streamRef.current = null;
    }
    stopAnalysis();
  }, [stopAnalysis]);

  useEffect(() => {
    if (showFace) {
      getMediaPermission().then(() => {
        startAnalysis();
      });
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [showFace, getMediaPermission, stopCamera, startAnalysis]);

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
