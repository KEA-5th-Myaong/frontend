import Input from '../Input';

function EducationItem() {
  return (
    <section className="w-full py-[20px] px-[30px] bg-gray-4 rounded-[10px] mb-4">
      <div className="grid grid-flow-col justify-stretch gap-[20px]">
        <Input
          element="input"
          label="학교명"
          size="lg"
          type="text"
          color="white"
          placeholder="학교명을 입력해주세요"
          required
        />
        <Input
          element="input"
          label="학과"
          size="lg"
          type="text"
          color="white"
          placeholder="학과를 입력해주세요"
          required
        />
      </div>
      <Input element="input" label="졸업 일자" size="lg" type="date" color="white" required />
      <Input element="input" label="학점" size="lg" type="text" color="white" placeholder="학점/기준학점" />
    </section>
  );
}

export default EducationItem;
