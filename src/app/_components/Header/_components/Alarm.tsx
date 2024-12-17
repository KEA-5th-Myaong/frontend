import { useQueryClient } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import Icons from '../../ui/Icon';
import { XIcon } from '../../ui/iconPath';
import { deleteNotification, fetchNotifications, putNotification } from '@/app/_services/notificationsService';
import { NotificationItem } from '../_types/notifications';
import useCustomInfiniteQuery from '@/app/_hooks/useCustomInfiniteQuery';

export default function Alarm() {
  const queryClient = useQueryClient();

  // 무한 스크롤
  const { ref, inView } = useInView();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useCustomInfiniteQuery(
    ['notifications'],
    ({ pageParam = '0' }) => fetchNotifications(String(pageParam)),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.data.lastId === -1) return undefined;
        return lastPage.data.lastId;
      },
      initialPageParam: '0',
      refetchInterval: 1000 * 60, // 1분마다 갱신
    },
  );

  // 무한 스크롤 동작
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 알림 읽음 처리
  const handleRead = async (notificationId: string) => {
    try {
      await putNotification(notificationId); // API 호출
      queryClient.invalidateQueries({ queryKey: ['notifications'] }); // 알림 목록 갱신
    } catch (error) {
      console.error('Error read notification:', error);
    }
  };

  // 알림 삭제
  const handleDelete = async (notificationId: string) => {
    try {
      await deleteNotification(notificationId); // API 호출
      queryClient.invalidateQueries({ queryKey: ['notifications'] }); // 알림 목록 갱신
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const notifications = data?.pages.flatMap((page) => page.data.notifications) || [];

  return (
    <div className="absolute bg-white-0 dark:bg-black-4 border-2 dark:border-black-5 w-80 h-[330px] -translate-x-72 mt-2 rounded-xl overflow-y-auto hide-scrollbar">
      <div className="flex items-center py-1">
        <div className="flex h-4 font-semibold text-sm text-black-0 ml-5 my-3 dark:text-white-0">알림</div>
      </div>
      <div className="flex-col w-full px-2">
        {notifications?.map((item: NotificationItem) => (
          <div key={item.notificationId} className="flex w-72 h-16 mx-auto mb-3">
            <div className="flex justify-between items-start hover:bg-gray-50 bg-gray-4 dark:bg-gray-5 dark:text-black-5 text-black-0 text-xs font-semibold rounded-lg w-full h-full px-2">
              <div className="flex items-center h-12 w-[230px]">
                <div className={`rounded-xl w-[7px] h-[7px] mx-2 ${item.isRead ? 'bg-gray-3' : 'bg-green-0'}`} />
                <button
                  type="button"
                  onClick={async (e) => {
                    e.stopPropagation();
                    await handleRead(String(item.notificationId));
                  }}
                  className="hover:text-gray-0 "
                >
                  {item.title}
                </button>
              </div>
              <button
                type="button"
                className="mt-4 pr-2 w-4 h-4"
                onClick={async (e) => {
                  e.stopPropagation();
                  await handleDelete(String(item.notificationId));
                }}
              >
                <Icons name={XIcon} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div ref={ref} className="h-1" />
      {isFetchingNextPage && <div className="w-full h-48 bg-gray-2 rounded-md animate-pulse" />}
    </div>
  );
}
