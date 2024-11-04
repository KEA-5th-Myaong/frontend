export const metadata = {
  title: 'Q&A페이지',
  description: 'Popolog Q&A페이지',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <section className="flex justify-center w-full">{children}</section>;
}
