import PSListContainer from './_components/PSListContainer';

export default function PersonalStatementList() {
  return (
    <section className="flex items-center flex-col w-full min-w-[360px] min-h-screen pt-11 pb-12 px-4 bg-gray-4 dark:bg-black-8">
      {/* 자소서 관리 컨테이너 */}
      <PSListContainer />
    </section>
  );
}
