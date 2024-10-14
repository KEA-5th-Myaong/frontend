import ChangeProfile from './ChangeProfile';
import MyPageHeader from './MyPageHeader';

export default function UserProfile({ searchParams }: { searchParams?: { page: string } }) {
  const activePage = searchParams?.page || 'change-profile';

  const renderActivePage = () => {
    switch (activePage) {
      case 'change-profile':
        return <ChangeProfile />;
      default:
        return null;
    }
  };
  return (
    <section className="flex flex-col items-center w-full px-14">
      <MyPageHeader />
      <div className="flex justify-center w-full">{renderActivePage()}</div>
    </section>
  );
}
