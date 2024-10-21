export const metadata = {
  title: '블로그', // 나중에 동적 id로 수정
  description: 'Popolog 블로그 페이지',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
