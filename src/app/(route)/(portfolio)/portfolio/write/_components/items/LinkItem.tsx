import Input from '../Input';

function LinkItem() {
  return (
    <section className="w-full py-[20px] px-[30px] bg-gray-4 rounded-[10px] mb-4">
      <div className="grid grid-flow-col justify-stretch gap-[20px]">
        <Input element="input" label="링크명" size="lg" type="text" color="white" placeholder="링크명을 입력해주세요" />
        <Input element="input" label="URL" size="lg" type="text" color="white" placeholder="URL을 입력해주세요" />
      </div>
    </section>
  );
}

export default LinkItem;
