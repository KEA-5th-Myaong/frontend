import PSCreateContainer from './_components/PSCreateContainer';
import PSCreateHeader from './_components/PSCreateHeader';

export default function PersonalStatementCreate() {
  return (
    <section className="flex-center flex-col mx-auto w-full h-full pt-[100px] pb-32 px-8 gap-20 max-w-[1000px] min-w-[365px]">
      {/* 자소서 작성 헤더 */}
      <PSCreateHeader />

      <PSCreateContainer />
    </section>
  );
}
