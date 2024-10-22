import InterviewHistory from './_components/InterviewHistory';

export const metadata = {
  title: '모의면접',
  description: 'Popolog 모의면접 페이지',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row justify-center min-w-[360px] px-8 md:px-20 lg:px-24 xl:px-32 pt-24 md:pt-[22px] pb-12">
      <InterviewHistory />
      {children}
    </div>
  );
}
