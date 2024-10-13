import PSListContainer from '../../../_components/_list/PSListContainer';

export default function PersonalStatementList() {
  return (
    <section className="flex items-center flex-col w-full min-w-[360px] min-h-screen pt-[100px] pb-12 px-4 bg-gray-4">
      {/* 자소서 관리 컨테이너 */}
      <PSListContainer />
    </section>
  );
}
