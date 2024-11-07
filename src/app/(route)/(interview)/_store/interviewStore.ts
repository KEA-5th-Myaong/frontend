import { create } from 'zustand';

interface InterviewIdStore {
  interviewId: string;
  setInterviewId: (data: string) => void;
  resetInterviewId: () => void;
}

interface CompanyIdStore {
  companyId: string;
  setCompanyId: (data: string) => void;
  resetCompanyId: () => void;
}

// 모의 면접 id를 저장
export const useInterviewIdStore = create<InterviewIdStore>((set) => ({
  interviewId: '',
  setInterviewId: (data) => set({ interviewId: data }),
  resetInterviewId: () => set({ interviewId: '' }),
}));

// 선택 기업 id를 저장
export const useCompanyIdStore = create<CompanyIdStore>((set) => ({
  companyId: '',
  setCompanyId: (data) => set({ companyId: data }),
  resetCompanyId: () => set({ companyId: '' }),
}));
