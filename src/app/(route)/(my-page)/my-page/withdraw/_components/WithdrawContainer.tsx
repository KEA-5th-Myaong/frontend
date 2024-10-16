'use client';

import { useState } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import axios from 'axios';
import Icons from '../../../../../_components/ui/Icon';
import { EyeIcon, EyeSlashIcon } from '../../../../../_components/ui/iconPath';
import Modal, { initailModalState } from '../../../../../_components/Modal';

export default function WithdrawContainer() {
  const { register, handleSubmit } = useForm({});
  const [modalState, setModalState] = useState(initailModalState);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data: FieldValues) => {
    const response = await axios.post('/api/withdraw', data); // 임시 api 주소
    console.log(response); // 콘솔로그는 나중에 제거
  };

  // api 연결 후, 모달 띄우기를 api 성공시로 이동
  const handleFormSubmit = async (data: FieldValues) => {
    try {
      await onSubmit(data);
    } catch (error) {
      setModalState((prev) => ({
        ...prev,
        open: true,
        isWarn: true,
        hasSubBtn: true,
        topText: '정말 탈퇴하시겠습니까?',
        subBtnText: '취소',
        btnText: '확인',
        onSubBtnClick: () => setModalState(initailModalState),
        onBtnClick: () =>
          setModalState((prev2) => ({
            ...prev2,
            open: true,
            hasSubBtn: false,
            topText: '탈퇴되었습니다.',
            btnText: '확인',
            onBtnClick: () => setModalState(initailModalState),
          })),
      }));
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col justify-center gap-14 w-full min-w-[360px] max-w-[600px] pt-10 px-5"
      >
        <div className="relative">
          <p className="text-sm md:text-base">비밀번호 확인</p>
          <input
            type={showPassword ? 'text' : 'password'}
            id="usePwd"
            {...register('usePwd', { required: true })}
            className="mt-2 border border-gray-0 form-input"
            placeholder="비밀번호를 입력해 주세요"
          />

          <button
            type="button"
            tabIndex={-1} // 눈 아이콘에 focus가 생기지 않도록
            onClick={togglePasswordVisibility}
            className="absolute right-4 top-[62px] transform -translate-y-1/2"
          >
            <Icons name={showPassword ? EyeIcon : EyeSlashIcon} />
          </button>
        </div>

        <button type="submit" className="bg-gray-0 form-btn">
          탈퇴하기
        </button>
      </form>

      {modalState.open && (
        <Modal
          isWarn={modalState.isWarn}
          hasSubBtn={modalState.hasSubBtn}
          topText={modalState.topText}
          subBtnText={modalState.subBtnText}
          btnText={modalState.btnText}
          onSubBtnClick={modalState.onSubBtnClick}
          onBtnClick={modalState.onBtnClick}
        />
      )}
    </>
  );
}
