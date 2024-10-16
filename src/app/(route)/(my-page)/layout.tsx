export const metadata = {
  title: '마이페이지',
  description: 'Popolog 마이 페이지',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <section className="flex justify-center w-full min-h-screen pt-[100px]">{children}</section>;
}
