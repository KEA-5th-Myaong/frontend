// 모달 인터페이스
export interface ModalProps {
  open?: boolean;
  topText: string;
  subText?: string;

  btnText: string;
  onBtnClick: () => void;
  hasSubBtn?: boolean;
  subBtnText?: string;
  onSubBtnClick?: () => void;

  isWarn?: boolean;
  onOverlayClick?: () => void;

  hasInput?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
