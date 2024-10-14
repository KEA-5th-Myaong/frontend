import jobData from '../_components/jobTest.json';

export type JobCategory = keyof typeof jobData;

export interface ProfileFormProps {
  userName: string;
  userEmail: string;
}

export interface JobSelectionProps {
  jobData: Record<JobCategory, string[]>; // 직업 카테고리별 직업 목록
  onJobSelect: (category: JobCategory, job: string) => void; // 직업 선택 시 호출될 콜백 함수
}

export interface ImageChangeProps {
  setProfileImage: React.Dispatch<File | null>;
}
