import { create } from 'zustand';
import { PortfolioCardProps } from '../_types/portfolio';

interface PortfolioState {
  portfolio: PortfolioCardProps[];
  isMainPortfolio: string | null; // 현재 메인 포트폴리오의 ID
  setMainPortfolio: (id: string) => void;
  setMemo: (id: string, memo: string) => void;
}

const usePortfolioStore = create<PortfolioState>((set) => ({
  // Fix - 임의 데이터
  portfolio: [
    { id: '1', title: '곽서연 포트폴리오 1', date: '2024.10.17', memo: '메모' },
    { id: '2', title: '곽서연 포트폴리오 2', date: '2024.10.17', memo: '메모' },
    { id: '3', title: '곽서연 포트폴리오 3', date: '2024.10.17', memo: '메모' },
    { id: '4', title: '곽서연 포트폴리오 4', date: '2024.10.17', memo: '메모' },
  ],
  isMainPortfolio: null,

  // 메인 포트폴리오 설정
  setMainPortfolio: (id: string) =>
    set((state) => ({
      portfolio: state.portfolio.map(
        (item) =>
          item.id === id
            ? { ...item, isMain: true } // 선택된 포트폴리오는 메인으로 설정
            : { ...item, isMain: false }, // 나머지는 메인이 아님
      ),
      isMainPortfolio: id, // 메인 포트폴리오의 ID 저장
    })),

  // 메모 업데이트
  setMemo: (id: string, memo: string) =>
    set((state) => ({
      portfolio: state.portfolio.map((item) => (item.id === id ? { ...item, memo } : item)),
    })),
}));

export default usePortfolioStore;
