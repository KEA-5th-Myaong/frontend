import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Modal from '../../Modal';

export default function SubMenu({
  isBlog,
  userName,
  isMore,
}: {
  isBlog?: boolean;
  isMore?: boolean;
  userName?: string;
}) {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleModalConfirm = () => {
    setShowModal(false);
  };

  const handleNavigation = (path: string) => {
    if (userName === undefined) {
      setShowModal(true);
    } else {
      router.push(path);
    }
  };
  return (
    <>
      <div className="absolute bg-white-0 dark:bg-black-4 dark:border-black-5 border-2 w-[108px] left-1/2 transform -translate-x-1/2 rounded-md mt-2">
        {isBlog ? (
          <>
            <div className="w-[88px] h-8 mx-auto m-2">
              <button
                type="button"
                onClick={() => handleNavigation(`/blog/${userName}`)}
                className="flex-center hover:bg-primary-1 hover:text-white-0 font-normal  dark:text-white-1 text-gray-0 text-xs rounded-md w-full h-full"
              >
                내 블로그
              </button>
            </div>
            <div className="w-[88px] h-8 mx-auto m-2">
              <button
                type="button"
                onClick={() => handleNavigation(`/blog/${userName}/write`)}
                className="flex-center hover:bg-primary-1 hover:text-white-0 font-normal  dark:text-white-1 text-gray-0 text-xs rounded-md w-full h-full"
              >
                글쓰기
              </button>
            </div>
          </>
        ) : isMore ? (
          <>
            <div className="w-[88px] h-8 mx-auto m-2 ">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation(); // 이벤트 전파 방지
                  handleNavigation(`/blog/${userName}`);
                }}
                // FIX: 링크 수정 필요
                className="flex-center hover:bg-primary-1 hover:text-white-0 font-normal dark:text-white-1 text-gray-0 text-xs rounded-md w-full h-full"
              >
                문의하기
              </button>
            </div>
            <div className="w-[88px] h-8 mx-auto m-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation(); // 이벤트 전파 방지
                  handleNavigation(`/blog/${userName}`);
                }}
                // FIX: 링크 수정 필요
                className="flex-center hover:bg-primary-1 hover:text-white-0 font-normal  dark:text-white-1 text-gray-0 text-xs rounded-md w-full h-full"
              >
                공지 게시판
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="w-[88px] h-8 mx-auto m-2">
              <button
                type="button"
                onClick={() => handleNavigation(`/interview/${userName}/select`)}
                className="flex-center hover:bg-primary-1 hover:text-white-0 font-normal  dark:text-white-1 text-gray-0 text-xs rounded-md w-full h-full"
              >
                모의 면접
              </button>
            </div>
            <div className="w-[88px] h-8 mx-auto m-2">
              <button
                type="button"
                onClick={() => handleNavigation(`/personal-statement/${userName}/list`)}
                className="flex-center hover:bg-primary-1 hover:text-white-0 font-normal  dark:text-white-1 text-gray-0 text-xs rounded-md w-full h-full"
              >
                자소서 첨삭
              </button>
            </div>
            <div className="w-[88px] h-8 mx-auto m-2">
              <button
                type="button"
                onClick={() => handleNavigation('/portfolio')}
                className="flex-center hover:bg-primary-1 hover:text-white-0 font-normal  dark:text-white-1 text-gray-0 text-xs rounded-md w-full h-full"
              >
                내 포트폴리오
              </button>
            </div>
          </>
        )}
      </div>

      {showModal && (
        <Modal
          topText="로그인이 필요한 서비스입니다."
          btnText="확인"
          onBtnClick={handleModalConfirm}
          onOverlayClick={handleModalConfirm}
        />
      )}
    </>
  );
}
