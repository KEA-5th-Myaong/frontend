export interface QuestionBoxProps {
  id?: number;
  question: string;
  onClick: () => void;
}

export interface PersonalStatementBoxProps {
  id?: number;
  content: string;
  onClick: () => void;
}
