import Image from 'next/image';
import Input from '../Input';
import MotionWrapper from '@/app/_components/MotionWrapper';

interface CertificationItemProps {
  id: number;
  onDelete: (id: number) => void;
}

function CertificationItem({ id, onDelete }: CertificationItemProps) {
  return (
    <MotionWrapper>
      <section className="relative w-full py-[20px] px-[30px] bg-gray-4 rounded-[10px] mb-4">
        <div className="grid grid-flow-col justify-stretch gap-[20px]">
          <Input
            element="input"
            label="자격증명"
            size="lg"
            type="text"
            color="white"
            maxLength={50}
            placeholder="자격증명을 입력해주세요"
          />
          <Input element="input" label="취득 일자" size="lg" type="date" color="white" />
        </div>
        <button type="button" onClick={() => onDelete(id)} className="absolute top-[20px] right-10">
          <Image src="/assets/ic-delete.svg" alt="삭제" width={25} height={25} />
        </button>
      </section>
    </MotionWrapper>
  );
}

export default CertificationItem;
