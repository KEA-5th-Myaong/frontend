import { useQueryClient } from '@tanstack/react-query';
import useCustomQuery from '@/app/_hooks/useCustomQuery';
import Icons from '../../ui/Icon';
import { XIcon } from '../../ui/iconPath';
import { deleteNotification, fetchNotifications, putNotification } from '@/app/_services/notificationsService';
import { NotificationItem } from '../_types/notifications';

export default function Alarm() {
  const queryClient = useQueryClient();
  const LAST_ID = 15;

  const { data: notifications } = useCustomQuery(['notifications'], () => fetchNotifications(String(LAST_ID)));
  console.log('알림', notifications);
  const handleAllClick = () => {
    alert('모두 지우기 클릭');
  };

  const handleRead = async (notificationId: string) => {
    try {
      await putNotification(notificationId); // API 호출
      queryClient.invalidateQueries({ queryKey: ['notifications'] }); // 알림 목록 갱신
      console.log(`Notification with ID ${notificationId} read`);
    } catch (error) {
      console.error('Error read notification:', error);
    }
  };
  const handleDelete = async (notificationId: string) => {
    try {
      await deleteNotification(notificationId); // API 호출
      queryClient.invalidateQueries({ queryKey: ['notifications'] }); // 알림 목록 갱신
      console.log(`Notification with ID ${notificationId} deleted`);
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  return (
    <div className="absolute bg-white-0 border-2 w-80 h-[330px] -translate-x-72 mt-2 rounded-xl overflow-y-auto hide-scrollbar">
      <div className="flex items-center py-1">
        <div className="flex h-4 font-semibold text-sm text-black-0 ml-5 my-3">알림</div>
        <button
          type="button"
          className="absolute font-normal text-[10px] right-3 bg-gray-4 hover:bg-gray-300 hover:text-white-0 text-gray-0 rounded-md px-4 py-[2px]"
          onClick={handleAllClick}
        >
          모두 지우기
        </button>
      </div>
      <div className="flex-col w-full px-2">
        {notifications?.data?.notifications.map((item: NotificationItem) => (
          <div key={item.notificationId} className="flex w-72 h-16 mx-auto mb-3">
            <div className="flex justify-between items-start hover:bg-gray-50 bg-gray-4 text-black-0 text-xs font-semibold rounded-lg w-full h-full px-2">
              <div className="flex items-center h-12 w-[260px]">
                <div className={`rounded-xl w-[7px] h-[7px] mx-2 ${item.isRead ? 'bg-gray-3' : 'bg-green-0'}`} />
                <button
                  type="button"
                  onClick={async (e) => {
                    e.stopPropagation();
                    await handleRead(String(item.notificationId));
                  }}
                  className="hover:text-gray-0"
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
    </div>
  );
}
