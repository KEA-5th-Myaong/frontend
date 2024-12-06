import Carousel from './_components/Carousel';

export const metadata = {
  title: 'PPLOG',
  description: 'PPLOG 피드 페이지',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex justify-center pt-14 pb-20">
      <div className="w-full min-w-[360px] max-w-[982px] px-[42px]">
        <Carousel />
        {children}
      </div>
    </section>
  );
}
