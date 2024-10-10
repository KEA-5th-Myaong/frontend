import PSListContainer from './_components/PSListContainer';
import PSListHeader from './_components/PSListHeader';

export default function PersonalStatementList() {
  return (
    <section className="flex items-center flex-col w-full h-full pt-[100px] pb-12 px-4 bg-gray-4">
      {/* 자소서 관리 헤더 */}
      <PSListHeader />

      {/* 자소서 관리 컨테이너 */}
      <PSListContainer />
    </section>
  );
}
