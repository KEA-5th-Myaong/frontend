import Image from 'next/image';
import { Path, UseFormRegister } from 'react-hook-form';
import Input from '../Input';
import MotionWrapper from '@/app/_components/MotionWrapper';
import { PortfolioFormProps } from '@/app/_types/portfolio';

interface CertificationItemProps {
  id: number;
  onDelete: (id: number) => void;
  register: UseFormRegister<PortfolioFormProps>;
}

function CertificationItem({ id, onDelete, register }: CertificationItemProps) {
  return (
    <MotionWrapper>
      <section className="relative w-full py-[20px] px-[30px] bg-gray-4 rounded-[10px] mb-4">
        <div className="grid grid-flow-col justify-stretch gap-[20px]">
          <Input
            register={register}
            name={`certifications.${id}.name` as Path<PortfolioFormProps>}
            element="input"
            label="자격증명"
            size="lg"
            type="text"
            color="white"
            maxLength={50}
            placeholder="자격증명을 입력해주세요"
          />
          <Input
            register={register}
            name={`certifications.${id}.date` as Path<PortfolioFormProps>}
            element="input"
            label="취득 일자"
            size="lg"
            type="date"
            color="white"
          />
        </div>
        <button type="button" onClick={() => onDelete(id)} className="absolute top-[20px] right-10">
          <Image src="/assets/ic-delete.svg" alt="삭제" width={25} height={25} />
        </button>
      </section>
    </MotionWrapper>
  );
}

export default CertificationItem;
