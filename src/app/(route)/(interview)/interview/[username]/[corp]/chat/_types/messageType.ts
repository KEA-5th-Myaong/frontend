export interface InterviewMessages {
  messageId: string;
  role: string;
  content: string;
}

// 표정분석 결과
export const expressionMapping: { [key: string]: string } = {
  Angry: '화난 표정',
  Disgust: '역겨운 표정',
  Fear: '두려운 표정',
  Happy: '행복한 표정',
  Sad: '슬픈 표정',
  Surprise: '놀란 표정',
  Neutral: '무표정',
  'No face detected': '얼굴이 인식되지 않음',
};
