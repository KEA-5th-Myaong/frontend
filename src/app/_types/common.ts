// 모달 인터페이스
export interface ModalProps {
  topText: string;
  subText?: string;

  btnText: string;
  onBtnClick: () => void;
  hasSubBtn?: boolean;
  subBtnText?: string;
  onSubBtnClick?: () => void;

  isWarn?: boolean;
  onOverlayClick?: () => void;
}
