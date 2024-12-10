import Image from 'next/image';
import { Path, UseFormRegister } from 'react-hook-form';
import Input from '../Input';
import MotionWrapper from '@/app/_components/MotionWrapper';
import { PortfolioFormProps } from '@/app/_types/portfolio';

interface LinkItemProps {
  id: number;
  onDelete: (id: number) => void;
  register: UseFormRegister<PortfolioFormProps>;
}

function LinkItem({ id, onDelete, register }: LinkItemProps) {
  return (
    <MotionWrapper>
      <section className="relative w-full py-[20px] px-[30px] bg-gray-4 rounded-[10px] mb-4">
        <div className="grid grid-flow-col justify-stretch gap-[20px]">
          <Input
            register={register}
            name={`links.${id}.name` as Path<PortfolioFormProps>}
            element="input"
            label="링크명"
            size="lg"
            type="text"
            color="white"
            maxLength={50}
            placeholder="링크명을 입력해주세요"
          />
          <Input
            register={register}
            name={`links.${id}.link` as Path<PortfolioFormProps>}
            element="input"
            label="URL"
            size="lg"
            type="text"
            color="white"
            placeholder="URL을 입력해주세요"
          />
        </div>
        <button type="button" onClick={() => onDelete(id)} className="absolute top-[20px] right-10">
          <Image src="/assets/ic-delete.svg" alt="삭제" width={25} height={25} />
        </button>
      </section>
    </MotionWrapper>
  );
}

export default LinkItem;
