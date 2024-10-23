export interface QuestionBoxProps {
  id?: number;
  question: string;
  onClick: () => void;
}

export interface PSBoxProps {
  timestamp: string;
  title: string;
  psId?: number;
  onClick: () => void;
}
