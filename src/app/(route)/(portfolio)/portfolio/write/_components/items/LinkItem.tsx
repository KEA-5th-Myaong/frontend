import Image from 'next/image';
import Input from '../Input';

interface LinkItemProps {
  id: number;
  onDelete: (id: number) => void;
}

function LinkItem({ id, onDelete }: LinkItemProps) {
  return (
    <section className="relative w-full py-[20px] px-[30px] bg-gray-4 rounded-[10px] mb-4">
      <div className="grid grid-flow-col justify-stretch gap-[20px]">
        <Input
          element="input"
          label="링크명"
          size="lg"
          type="text"
          color="white"
          maxLength={50}
          placeholder="링크명을 입력해주세요"
        />
        <Input element="input" label="URL" size="lg" type="text" color="white" placeholder="URL을 입력해주세요" />
      </div>
      <button type="button" onClick={() => onDelete(id)} className="absolute top-[20px] right-10">
        <Image src="/assets/ic-delete.svg" alt="삭제" width={25} height={25} />
      </button>
    </section>
  );
}

export default LinkItem;
