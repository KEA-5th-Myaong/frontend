import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies(); // 서버 컴포넌트에서 쿠키를 읽기 위해 next/headers의 cookies() 사용
  const accessToken = cookieStore.get('accessToken');

  if (accessToken) {
    redirect('/main'); // redirect()는 서버 사이드에서 동작하며, 페이지 렌더링 전에 실행됨
  }

  return <div>{children}</div>;
}
