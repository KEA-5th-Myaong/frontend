export interface PortfolioCardProps {
  id: string; // 포트폴리오 ID
  title: string; // 포트폴리오 제목
  date: string; // 등록 날짜
  memo?: string; // 포트폴리오메모
}

export interface Experience {
  name: string; // 기업 이름
  start: string; // 시작일
  end?: string; // 종료일 (nullable)
  position?: string; // 직책 (nullable)
  achievement?: string; // 주요 업무 및 성과 (nullable)
}

export interface Skill {
  name: string; // 기술 이름
  detail?: string; // 기술 수준 상세 설명 (nullable)
}

export interface Certification {
  name: string; // 자격증 이름
  date: string; // 취득일
}

export interface ExtraActivity {
  name: string; // 활동명
  start: string; // 시작일
  end?: string; // 종료일 (nullable)
  institution: string; // 기관 이름
  description?: string; // 활동 내용 (nullable)
}

export interface PersonalStatement {
  reason: string; // 지원 사유
  content: string; // 자기소개
}

export interface PortfolioProps {
  id: string; // 포트폴리오 ID ------- 없음
  title: string; // 포트폴리오 제목
  name: string; // 포트폴리오 작성자 이름
  preferredJob: string; // 관심 직무
  tel: string; // 연락처
  email: string; // 이메일 주소
  educations: {
    name: string;
    major: string;
    graduation: string;
    gpa?: number;
  }[];
  picUrl?: string; // 사진 URL (nullable)
  experiences?: Experience[]; // 경력 정보 (nullable)
  ps?: PersonalStatement; // 자기소개 및 지원 사유 (nullable)
  links?: string[]; // 관련 링크 (nullable)
  skills?: Skill[]; // 기술 정보 (nullable)
  certifications?: Certification[]; // 자격증 정보 (nullable)
  extraActivities?: ExtraActivity[]; // 추가 활동 정보 (nullable)
}
