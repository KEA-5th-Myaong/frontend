import { create } from 'zustand';
import { PortfolioFormProps } from '../_types/portfolio';

interface PortfolioState {
  portfolio: PortfolioFormProps | null; // 현재 작성 중인 포트폴리오
  setPortfolio: (data: PortfolioFormProps) => void; // 상태 업데이트 함수
}

const usePortfolioStore = create<PortfolioState>((set) => ({
  portfolio: null, // 초기 상태
  setPortfolio: (data) => {
    set({ portfolio: data }); // 상태 업데이트
  },
}));

export default usePortfolioStore;
