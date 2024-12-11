'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import Modal, { initailModalState } from '../../../../../../_components/Modal';
import PSFooter from '../../../../_components/PSFooter';
import PSHeader from '../../../../_components/PSHeader';
import usePSStore from '../../../../_store/psStore';
import BackButton from '../../../../../../_components/BackButton';
import PSForm from './PSForm';
import { fetchPS, postPS, putPS } from '@/app/(route)/(personal-statement)/_services/psServices';
import useMe from '@/app/_hooks/useMe';
import { usePostWriteStore, usePersonalStatementStore } from '@/app/(route)/(personal-statement)/_store/psStore';

export default function PSCreateContainer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEdit = searchParams.get('edit') === 'true';
  const { data: userData } = useMe();
  // psData = 수정 일 시 초기값 설정을 위한 값
  const { psData, setPSData, resetPSData, isTouch, setIsTouch } = usePSStore();
  const postData = usePostWriteStore((state) => state);
  const psId = usePersonalStatementStore((state) => state.psId);
  const queryClient = useQueryClient();

  const [formValues, setFormValues] = useState({
    title: postData.postTitle || '',
    position: postData.postPosition || '',
    reason: postData.postReason || '',
    content: postData.postContent || '',
  });

  const [modalState, setModalState] = useState(initailModalState);

  // isTouch가 true일 때 초기 값을 psData에서 설정
  useEffect(() => {
    if (isTouch) {
      setFormValues((prev) => ({
        ...prev,
        position: psData.position || '',
        content: psData.content || '',
        reason: psData.reason || '',
        title: psData.title || '',
      }));
    }
    if (!isTouch) {
      (async () => {
        try {
          const fetchedData = await fetchPS(psId);
          setFormValues({
            title: fetchedData.data.title || '',
            position: fetchedData.data.position || '',
            reason: fetchedData.data.reason || '',
            content: fetchedData.data.content || '',
          });
        } catch (error) {
          console.error('Error fetching PS:', error);
        }
      })();
    }
  }, [isTouch, psData.position, psData.title, psData.reason, psData.content, psId]);

  // 완료 모달
  const createDone = () => {
    setModalState((prev) => ({
      ...prev,
      open: true,
      hasSubBtn: true,
      topText: '자기소개서가 작성되었습니다',
      btnText: '확인',
      onBtnClick: () => {
        resetPSData();
        router.push(`/personal-statement/${userData?.data.memberId}/list`);
      },
    }));
  };

  // 폼 제출
  const handleSubmit = async () => {
    await postPS(formValues);
    await queryClient.invalidateQueries({ queryKey: ['ps'], refetchType: 'all' });
    createDone();
  };
  // 수정 완료
  const handleEditSubmit = async () => {
    await putPS(psId, formValues);
    await queryClient.invalidateQueries({ queryKey: ['ps'], refetchType: 'all' });
    createDone();
  };

  // 미리 보기
  const handlePreviewClick = () => {
    // 미리 보기 클릭시 폼 데이터 값을 psData로 저장, 미리보기에서 되돌아 갔을 경우 psData를 불러옴
    setPSData(formValues);
    setIsTouch(true);
    router.push(`/personal-statement/${userData?.data.memberId}/preview`);
  };

  // 값 업데이트
  const handleInputChange = (name: string, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <BackButton className="self-start pb-4" />
      {isEdit ? (
        <PSHeader title="" mode="edit" onButtonClick={handleEditSubmit} />
      ) : (
        <PSHeader title="" mode="create" onButtonClick={handleSubmit} />
      )}

      <div className="self-start w-full mt-0 sm:mt-12">
        <p className="w-full pre-2xl-semibold sm:text-[28px] pb-5 mb-9 border-b-2 border-gray-5">자기소개서</p>

        <div className="flex flex-col gap-[18px] bg-gray-4 pt-5 px-4 sm:px-14 pb-10 rounded-[10px]">
          {/* 제목 */}
          <PSForm
            name="title"
            label="제목"
            maxLength={20}
            placeholder="제목을 입력해주세요"
            value={formValues.title}
            onChange={handleInputChange}
          />

          {/* 지원직무 */}
          <PSForm
            name="position"
            label="지원직무"
            maxLength={20}
            placeholder="지원 직무를 입력해주세요"
            value={formValues.position}
            onChange={handleInputChange}
          />

          {/* 지원사유 */}
          <PSForm
            name="reason"
            label="지원사유"
            isTextarea
            maxLength={500}
            placeholder="지원 사유를 입력해주세요"
            value={formValues.reason}
            onChange={handleInputChange}
          />

          {/* 자기소개 */}
          <PSForm
            name="content"
            label="자기소개"
            isTextarea
            maxLength={2000}
            placeholder="자기소개서 내용을 입력해주세요"
            value={formValues.content}
            onChange={handleInputChange}
          />
        </div>

        {/* 안내문구 */}
        <div className="mt-4 mb-24 px-11 py-5 bg-[#F3F3F3] text-gray-0 text-xs flex gap-4">
          <p id="임시" className="text-white-0 bg-gray-0 rounded-full px-1.5">
            !
          </p>
          자기소개서는 최대 2000자까지 입력 가능합니다.
        </div>
      </div>
      {isEdit ? (
        <PSFooter showPreview showDone handlePreviewClick={handlePreviewClick} handleDoneClick={handleEditSubmit} />
      ) : (
        <PSFooter showPreview showDone handlePreviewClick={handlePreviewClick} handleDoneClick={handleSubmit} />
      )}
      {modalState.open && (
        <Modal topText={modalState.topText} btnText={modalState.btnText} onBtnClick={modalState.onBtnClick} />
      )}
    </>
  );
}
