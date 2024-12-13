'use client';

import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import Icons from '@/app/_components/ui/Icon';
import { CheckIcon } from '@/app/_components/ui/iconPath';
import { ReportedContents } from '../_types/admin-types';
import { initailModalState } from '@/app/_components/Modal';
import AdminModal from '../_components/AdminModal';
import useCustomInfiniteQuery from '@/app/_hooks/useCustomInfiniteQuery';
import { fetchBlindedContents, fetchReportedContents, putCommentBlind, putPostBlind } from '../_services/adminService';

export default function AdminContents() {
  const queryClient = useQueryClient();
  const [reportedContents, setReportedContents] = useState<ReportedContents[]>([]);
  const [blindedContents, setBlindedContents] = useState<ReportedContents[]>([]);
  const [modalState, setModalState] = useState(initailModalState);

  // 피신고 콘텐츠 불러오기
  const { data: reportedData } = useCustomInfiniteQuery(
    ['reportedContents'],
    ({ pageParam = '0' }) => fetchReportedContents(pageParam as string),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.data.lastId === -1) return undefined;
        return lastPage.data.lastId;
      },
      initialPageParam: '0',
    },
  );

  // 블라인드 콘텐츠 불러오기
  const { data: blindedData } = useCustomInfiniteQuery(
    ['blindedContents'],
    ({ pageParam = '0' }) => fetchBlindedContents(pageParam as string),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.data.lastId === -1) return undefined;
        return lastPage.data.lastId;
      },
      initialPageParam: '0',
    },
  );

  useEffect(() => {
    if (reportedData?.pages && blindedData?.pages) {
      const flattenedReportedContents = reportedData.pages.flatMap((page) => page.data.contents) || [];
      const flattenedBlindedContents = blindedData.pages.flatMap((page) => page.data.contents) || [];
      setReportedContents(flattenedReportedContents);
      setBlindedContents(flattenedBlindedContents);
    }
  }, [reportedData, blindedData]);

  const handleHideContent = async (content: ReportedContents) => {
    try {
      // 콘텐츠 타입에 따라 적절한 API 호출
      if (content.contentsType === 'POST') {
        await putPostBlind(content.contentsId.toString(), content);
      } else {
        await putCommentBlind(content.contentsId.toString(), content);
      }

      // 피신고 목록에서 제거하고 블라인드 목록에 추가
      const isInReportedList = reportedContents.some((item) => item.postId === content.postId);

      if (isInReportedList) {
        setReportedContents((prev) => prev.filter((item) => item.postId !== content.postId));
        setBlindedContents((prev) => [...prev, content]);

        setModalState({
          ...initailModalState,
          open: true,
          topText: '숨김 처리 되었습니다.',
          btnText: '확인',
          onBtnClick: () => setModalState(initailModalState),
          onOverlayClick: () => setModalState(initailModalState),
        });
      } else {
        // 블라인드 목록에서 제거하고 피신고 목록에 추가
        setBlindedContents((prev) => prev.filter((item) => item.postId !== content.postId));
        setReportedContents((prev) => [...prev, content]);

        setModalState({
          ...initailModalState,
          open: true,
          topText: '숨김 처리가 해제 되었습니다.',
          btnText: '확인',
          onBtnClick: () => setModalState(initailModalState),
          onOverlayClick: () => setModalState(initailModalState),
        });
      }

      // 쿼리 무효화 및 새로고침
      queryClient.invalidateQueries({ queryKey: ['reportedContents'] });
      queryClient.invalidateQueries({ queryKey: ['blindedContents'] });
    } catch (error) {
      console.error('콘텐츠 숨김 처리 중 오류 발생:', error);
      setModalState({
        ...initailModalState,
        open: true,
        topText: '처리 중 오류가 발생했습니다.',
        btnText: '확인',
        onBtnClick: () => setModalState(initailModalState),
        onOverlayClick: () => setModalState(initailModalState),
      });
    }
  };

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
                        onClick={() => handleHideContent(content)}
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
                      <div onClick={() => handleHideContent(content)} className="w-4 h-4 cursor-pointer">
                        {content && (
                          <Icons
                            className="bg-black-3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                            name={{ ...CheckIcon, fill: '#fff' }}
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

      {modalState.open && (
        <AdminModal
          onOverlayClick={modalState.onBtnClick}
          topText={modalState.topText}
          btnText={modalState.btnText}
          onBtnClick={modalState.onBtnClick}
        />
      )}
    </section>
  );
}
