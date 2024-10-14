'use client';

import { useState } from 'react';
import CheckPwd from '../_components/CheckPwd';
import UserProfile from '../_components/UserProfile';

export default function MyPage() {
  const [certificated, setCertificated] = useState(false);

  const certifyHandler = () => {
    setCertificated(true);
  };

  return (
    <section className="flex justify-center w-full min-h-screen pt-[100px]">
      {!certificated ? <UserProfile /> : <CheckPwd certifyHandler={certifyHandler} />}
    </section>
  );
}
