import { useRef, useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { postAnalyzeExpression } from '@/app/(route)/(interview)/_services/interviewService';
import Icons from '@/app/_components/ui/Icon';
import { PlayIcon } from '@/app/_components/ui/iconPath';
import { expressionMapping } from '../_types/messageType';

export default function Video() {
  const videoRef = useRef<HTMLVideoElement>(null); // 웹캠 비디오 엘리먼트를 참조하기 위한 ref
  const streamRef = useRef<MediaStream | null>(null); // 카메라 스트림 저장하고 관리 위한 ref, MediaStream 객체를 저장하여 카메라 리소스를 제어할 수 있게 함
  const [showPractice, setShowPractice] = useState(false);
  const [showFace, setShowFace] = useState(false); // 카메라 표시 여부
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [responseExpression, setResponseExpression] = useState('');

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
          const response = await postAnalyzeExpression(data);
          setResponseExpression(response.data.expression);
        } catch (error) {
          console.error('이미지 변환 또는 전송 실패:', error);
        }
      }
    }, 'image/jpeg');
  }, []);

  const startAnalysis = useCallback(() => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(captureFrame, 2000);
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
    if (showFace && showPractice) {
      getMediaPermission().then(() => {
        startAnalysis();
      });
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [showFace, showPractice, getMediaPermission, stopCamera, startAnalysis]);
  return (
    <div className="fixed left-12 bottom-12 z-50">
      {showPractice && (
        <div className="fixed left-12 bottom-28 max-w-[420px] z-10 bg-white-0 dark:bg-black-4 dark:border-black-6 px-10 rounded-xl border border-gray-5 pt-5 pb-11">
          <div className="w-full flex justify-between items-center pb-[14px] border-b border-gray-5 mb-4">
            <p className="font-semibold">면접 연습하기</p>
            <div
              onClick={() => setShowFace((prev) => !prev)}
              className="flex items-center border dark:border-gray-5 border-primary-3 py-1 px-4 rounded-[28px] cursor-pointer"
            >
              <Icons name={PlayIcon} />
              {showFace ? '표정 분석 종료' : '표정 분석 시작'}
            </div>
          </div>
          {showFace ? (
            <video ref={videoRef} className="max-w-full h-[208px] aspect-video bg-black-0 -scale-x-100" autoPlay />
          ) : (
            <div className="max-w-full h-[208px] aspect-video bg-black-0" />
          )}

          <p className="font-semibold mt-5">AI 표정 분석 결과</p>
          <div className="flex gap-2">
            <div className="w-12 h-12 flex-shrink-0">
              <Image className="w-full h-full" width={33} height={33} src="/mascot.png" alt="이미지" />
            </div>
            <p className="mt-3 font-medium text-[11px] bg-[#F5F5F5]  text-black-0 rounded-[20px] py-4 px-8">
              {expressionMapping[responseExpression]}
            </p>
          </div>
        </div>
      )}

      <button
        type="button"
        className="py-4 px-6 rounded-[28px] primary-1-btn mt-2 md:block hidden"
        onClick={() => {
          setShowPractice((prev) => !prev);
          setShowFace(false);
        }}
      >
        {showPractice ? 'AI 표정 분석 종료' : 'AI 표정 분석'}
      </button>
    </div>
  );
}
