import Input from '../Input';

function ActivityItem() {
  return (
    <section className="w-full py-[20px] px-[30px] bg-gray-4 rounded-[10px] mb-4">
      <div className="grid grid-flow-col justify-stretch gap-[20px]">
        <Input
          element="input"
          label="이름"
          size="lg"
          type="text"
          color="white"
          placeholder="활동 및 교육명을 입력해주세요"
        />
        <Input
          element="input"
          label="교육기관"
          size="lg"
          type="text"
          color="white"
          placeholder="교육기관명을 입력해주세요"
        />
      </div>
      <Input element="input" label="시작 일자" size="lg" type="date" color="white" />
      <Input element="input" label="종료 일자" size="lg" type="date" color="white" />
      <Input
        element="textarea"
        label="활동 상세 내용"
        size="lg"
        type="text"
        color="white"
        placeholder="활동 상세 내용을 입력해주세요"
      />
    </section>
  );
}

export default ActivityItem;
