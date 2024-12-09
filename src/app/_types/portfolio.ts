export interface PortfolioCardProps {
  portfolioId: string; // 포트폴리오 ID
  portfolioName: string; // 포트폴리오 제목
  timestamp: string; // 등록 날짜
  memo?: string; // 포트폴리오메모
}

export interface Educations {
  name: string;
  major: string;
  graduation: string;
  gpa?: number | null; // GPA (nullable)
}

export interface Experiences {
  name: string; // 기업 이름
  start: string; // 시작일
  end?: string; // 종료일 (nullable)
  position?: string; // 직책 (nullable)
  achievement?: string; // 주요 업무 및 성과 (nullable)
}

export interface PS {
  title: string; // 자기소개서 제목
  position: string; // 지원 직무
  reason: string; // 지원 사유
  content: string; // 자기소개
}

export interface Certifications {
  name: string; // 자격증 이름
  date: string; // 취득일
}

export interface ExtraActivities {
  name: string; // 활동명
  start: string; // 시작일
  end?: string; // 종료일 (nullable)
  institution: string; // 기관 이름
  description?: string; // 활동 내용 (nullable)
}

export interface Links {
  name: string;
  link: string;
}

export interface PortfolioFormProps {
  title: string; // 포트폴리오 제목
  name: string; // 포트폴리오 작성자 이름
  preferredJob: string; // 관심 직무
  tel: string; // 연락처
  email: string; // 이메일 주소
  picUrl?: string | null;
  educations: Educations[];
  experiences?: Experiences[]; // 경력 정보 (nullable)
  ps?: PS[] | null; // 자기소개 및 지원 사유 (nullable)
  links?: Links[]; // 관련 링크 (nullable)
  skills?: string[] | null; // 기술 정보 (nullable)
  certifications?: Certifications[]; // 자격증 정보 (nullable)
  extraActivities?: ExtraActivities[]; // 추가 활동 정보 (nullable)
}
