export const metadata = {
  title: '자기소개서', // 나중에 동적 id로 수정
  description: 'Popolog 자소서 페이지',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
