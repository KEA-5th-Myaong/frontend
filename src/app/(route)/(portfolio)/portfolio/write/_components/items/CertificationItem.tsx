import Input from '../Input';

function CertificationItem() {
  return (
    <section className="w-full py-[20px] px-[30px] bg-gray-4 rounded-[10px] mb-4">
      <div className="grid grid-flow-col justify-stretch gap-[20px]">
        <Input
          element="input"
          label="자격증명"
          size="lg"
          type="text"
          color="white"
          placeholder="자격증명을 입력해주세요"
        />
        <Input element="input" label="취득 일자" size="lg" type="date" color="white" />
      </div>
    </section>
  );
}

export default CertificationItem;
