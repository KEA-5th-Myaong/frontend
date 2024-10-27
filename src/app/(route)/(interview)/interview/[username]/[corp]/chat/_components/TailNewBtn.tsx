import Icons from '@/app/_components/ui/Icon';
import { ArrowIcon } from '@/app/_components/ui/iconPath';

interface TailNewBtnProps {
  TailQuestion: () => void;
  NewQuestion: () => void;
}

export default function TailNewBtn({ TailQuestion, NewQuestion }: TailNewBtnProps) {
  return (
    <div className="flex items-center gap-4 pt-4">
      <button type="button" className="chat-msg-btn" onClick={TailQuestion}>
        꼬리 질문 받기 <Icons className="rotate-180 border rounded-full" name={ArrowIcon} />
      </button>
      <button type="button" className="chat-msg-btn" onClick={NewQuestion}>
        새 질문 생성 <Icons className="rotate-180 border rounded-full" name={ArrowIcon} />
      </button>
    </div>
  );
}
