import { create } from 'zustand';

interface InterviewIdStore {
  interviewId: string;
  firstQ: string;
  setInterviewId: (data: string) => void;
  setFirstQ: (data: string) => void;
  resetInterviewId: () => void;
  resetFirstQ: () => void;
}

interface CompanyIdStore {
  companyId: string;
  setCompanyId: (data: string) => void;
  resetCompanyId: () => void;
}

// 모의 면접 id를 저장
export const useInterviewIdStore = create<InterviewIdStore>((set) => ({
  interviewId: '',
  firstQ: '',
  setInterviewId: (data) => set({ interviewId: data }),
  setFirstQ: (data) => set({ firstQ: data }),
  resetInterviewId: () => set({ interviewId: '' }),
  resetFirstQ: () => set({ firstQ: '' }),
}));

// 선택 기업 id를 저장
export const useCompanyIdStore = create<CompanyIdStore>((set) => ({
  companyId: '',
  setCompanyId: (data) => set({ companyId: data }),
  resetCompanyId: () => set({ companyId: '' }),
}));
