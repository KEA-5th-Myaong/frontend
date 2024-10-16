import Image from 'next/image';
import Input from '../Input';

interface ExperienceItemProps {
  id: number;
  onDelete: (id: number) => void;
}

function ExperienceItem({ id, onDelete }: ExperienceItemProps) {
  return (
    <section className="relative w-full py-[20px] px-[30px] bg-gray-4 rounded-[10px] mb-4">
      <div className="grid grid-flow-col justify-stretch gap-[20px]">
        <Input
          element="input"
          label="회사명"
          size="lg"
          type="text"
          color="white"
          placeholder="회사명을 입력해주세요"
          required
        />
        <Input
          element="input"
          label="직책"
          size="lg"
          type="text"
          color="white"
          placeholder="직책을 입력해주세요"
          required
        />
      </div>
      <Input element="input" label="시작 일자" size="lg" type="date" color="white" />
      <Input element="input" label="종료 일자" size="lg" type="date" color="white" />
      <Input
        element="textarea"
        label="주요 업무/성과"
        size="lg"
        type="text"
        color="white"
        placeholder="주요 업무/성과를 입력해주세요"
      />
      <button type="button" onClick={() => onDelete(id)} className="absolute top-[20px] right-10">
        <Image src="/assets/ic-delete.svg" alt="삭제" width={25} height={25} />
      </button>
    </section>
  );
}

export default ExperienceItem;
