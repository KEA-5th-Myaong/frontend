export interface InterviewMessages {
  messageId: string;
  role: string;
  content: string;
}

// 표정분석 결과
export const expressionMapping: { [key: string]: string } = {
  Angry: '밝은 표정을 지어도 좋을 것 같아요',
  Disgust: '인상을 풀고 편안한 표정을 지어보세요',
  Fear: '많이 긴장되어 보여요 좀 더 미소 지어도 좋을 것 같아요',
  Happy: '적당한 미소 정도가 좋아요',
  Sad: '슬픈 표정보다 은은한 미소가 좋을 것 같아요',
  Surprise: '너무 놀란 표정은 당황스러워 보일 수 있어요',
  Neutral: '좋아요!',
  'No face detected': '얼굴이 인식되지 않아요',
};
