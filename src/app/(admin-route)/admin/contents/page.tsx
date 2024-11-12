'use client';

import { useEffect, useState } from 'react';
import testData from '../_components/reportTest.json';
import Icons from '@/app/_components/ui/Icon';
import { CheckIcon } from '@/app/_components/ui/iconPath';
import { ReportedContents } from '../_types/admin-types';

export default function AdminContents() {
  const [contents, setContents] = useState<ReportedContents[]>([]);

  useEffect(() => {
    setContents(testData.contents);
  }, []);

  const handleHideContent = (postId: number) => {
    setContents((prevContents) => {
      const updatedContents = prevContents.map((content) =>
        content.postId === postId ? { ...content, isHidden: !content.isHidden } : content,
      );

      // 해당 콘텐츠의 새로운 상태 확인
      const targetContent = updatedContents.find((content) => content.postId === postId);
      if (targetContent?.isHidden) {
        alert('콘텐츠가 숨김 처리되었습니다.');
      } else {
        alert('콘텐츠의 숨김이 해제되었습니다.');
      }

      return updatedContents;
    });
  };

  const reportedContents = contents.filter((content) => !content.isHidden);
  const blindedContents = contents.filter((content) => content.isHidden);

  return (
    <section className="flex gap-2.5 w-full pl-12 pb-40">
      <div className="w-full min-w-[545px] font-semibold px-6 py-8 bg-white-0 border border-gray-5">
        <p className="w-full text-2xl border-b border-gray-5 pb-4 mb-5">콘텐츠 관리</p>

        {/* 피신고 콘텐츠 */}
        <div>
          <p>피신고 콘텐츠</p>
          <div className="mt-3.5 border font-medium">
            <div className="flex justify-between py-4 px-3 bg-gray-5 font-semibold">
              <p className="w-[20%] text-center">아이디</p>
              <p className="w-[50%] text-center">내용</p>
              <p className="w-[10%] text-center">피신고 횟수</p>
              <p className="w-[20%] text-center">숨기기 여부</p>
            </div>
            <div className="min-h-48 max-h-56 overflow-scroll hide-scrollbar">
              <div className="flex flex-col gap-3 py-2 w-full px-3">
                {reportedContents?.map((content) => (
                  <div key={content.postId} className="flex">
                    <p className="w-[20%] text-center">{content.contentsId}</p>
                    <p className="w-[50%] text-center">{content.title}</p>
                    <p className="w-[10%] text-center">{content.reportCount}회</p>
                    <div className="w-[20%] flex justify-center items-center relative">
                      <div
                        onClick={() => handleHideContent(content.postId)}
                        className="w-4 h-4 cursor-pointer border border-gray-5"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 블라인드 콘텐츠 */}
        <div className="mt-9">
          <p>블라인드 콘텐츠</p>
          <div className="mt-3.5 border font-medium">
            <div className="flex justify-between py-4 px-3 bg-gray-5 font-semibold">
              <p className="w-[20%] text-center">아이디</p>
              <p className="w-[50%] text-center">내용</p>
              <p className="w-[10%] text-center">피신고 횟수</p>
              <p className="w-[20%] text-center">숨기기 여부</p>
            </div>
            <div className="min-h-48 max-h-56 overflow-scroll hide-scrollbar">
              <div className="flex flex-col gap-3 py-2 w-full px-3">
                {blindedContents?.map((content) => (
                  <div key={content.postId} className="flex">
                    <p className="w-[20%] text-center">{content.contentsId}</p>
                    <p className="w-[50%] text-center">{content.title}</p>
                    <p className="w-[10%] text-center">{content.reportCount}회</p>
                    <div className="w-[20%] flex justify-center items-center relative">
                      <div
                        onClick={() => handleHideContent(content.postId)}
                        className="w-4 h-4 cursor-pointer border border-gray-5"
                      >
                        {content.isHidden && (
                          <Icons
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                            name={CheckIcon}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
