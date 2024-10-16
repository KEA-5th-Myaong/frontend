import { create } from 'zustand';

interface ToggleStore {
  toggles: {
    experience: boolean; // 경력
    links: boolean; // 링크
    skills: boolean; // 기술
    certifications: boolean; // 자격증
    activities: boolean; // 대외활동
    personalStatement: boolean; // 자기소개서
  };
  setToggle: (key: keyof ToggleStore['toggles']) => void; // 토글 상태를 변경하는 함수
}

const useToggleStore = create<ToggleStore>((set) => ({
  toggles: {
    experience: false,
    links: false,
    skills: false,
    certifications: false,
    activities: false,
    personalStatement: false,
  },
  setToggle: (key) =>
    set((state) => ({
      toggles: {
        ...state.toggles,
        [key]: !state.toggles[key],
      },
    })),
}));

export default useToggleStore;
