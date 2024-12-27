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
  Sad: '조금 더 은은한 미소를 지어 보세요',
  Surprise: '입을 조금 다물고 차분해질 필요가 있어요',
  Neutral: '좋아요!',
  'No face detected': '허리를 피고 턱을 내려 자세를 바르게 해주세요',
};
