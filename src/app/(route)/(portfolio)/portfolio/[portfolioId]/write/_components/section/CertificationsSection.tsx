'use client';

import { useState } from 'react';
import Image from 'next/image';
import CertificationItem from '../items/CertificationItem';

interface CertificationItemState {
  id: number;
  component: JSX.Element;
}

export default function CertificationsSection() {
  const deleteCertificationItem = (id: number) => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    setCertificationItems(certificationItems.filter((item) => item.id !== id));
  };

  const [certificationItems, setCertificationItems] = useState<CertificationItemState[]>([
    { id: 0, component: <CertificationItem key={0} id={0} onDelete={deleteCertificationItem} /> },
  ]);

  const addCertificationItem = () => {
    if (certificationItems.length < 50) {
      // 최대 50개로 제한
      const newItemId = certificationItems.length;
      setCertificationItems([
        ...certificationItems,
        {
          id: newItemId,
          component: <CertificationItem key={newItemId} id={newItemId} onDelete={deleteCertificationItem} />,
        },
      ]);
    } else {
      alert('자격증은 최대 50개까지 추가할 수 있습니다.'); // 경고 메시지
    }
  };
  return (
    <div className="mt-10">
      <div className="flex justify-between items-center">
        <h1 className="pre-3xl-semibold">자격증</h1>
        <button type="button" onClick={addCertificationItem} className="flex-center  hover:text-primary-1 ">
          <Image
            src="/assets/add-button.svg"
            alt="자격증 추가"
            width={30}
            height={30}
            className=" hover-animation mr-[10px] "
          />
          자격증 추가
        </button>
      </div>
      <div className="h-[2px] w-full bg-gray-5 my-[20px]" />
      {certificationItems.map((item) => item.component)}
    </div>
  );
}
