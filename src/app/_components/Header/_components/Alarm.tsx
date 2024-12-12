import useCustomQuery from '@/app/_hooks/useCustomQuery';
import Icons from '../../ui/Icon';
import { XIcon } from '../../ui/iconPath';
import { fetchNotifications } from '@/app/_services/notificationsService';
import { NotificationItem } from '../_types/notifications';

export default function Alarm() {
  const alerm = {
    alarmItems: [
      { id: 1, isRead: false, date: '2024.10.14', contents: '곽서연님이 내 포스트에 댓글을 달았습니다.' },
      { id: 2, isRead: false, date: '2024.10.14', contents: '새 공지사항이 등록되었습니다.' },
      { id: 3, isRead: false, date: '2024.10.14', contents: '김현중님이 나를 팔로우 했습니다.' },
      { id: 4, isRead: false, date: '2024.10.14', contents: '곽서연님이 나를 팔로우 했습니다.' },
      { id: 5, isRead: true, date: '2024.10.14', contents: '김민형님이 내 포스트에 댓글을 달았습니다.' },
      { id: 6, isRead: true, date: '2024.10.14', contents: '김현중님이 내 포스트에 댓글을 달았습니다.' },
      { id: 7, isRead: true, date: '2024.10.14', contents: '강수진님이 나를 팔로우 했습니다.' },
      { id: 8, isRead: true, date: '2024.10.14', contents: '조기헌님이 나를 팔로우 했습니다.' },
      { id: 9, isRead: true, date: '2024.10.14', contents: '최현준님이 내 포스트에 댓글을 달았습니다.' },
    ],
  };

  const LAST_ID = 15;

  const { data: notifications } = useCustomQuery(['notifications'], () => fetchNotifications(String(LAST_ID)));
  console.log(notifications);

  const handleAllClick = () => {
    alert('모두 지우기 클릭');
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
            <button
              type="button"
              className="flex justify-between items-start hover:bg-gray-50 bg-gray-4 text-black-0 text-xs font-semibold rounded-lg w-full h-full px-2"
            >
              <div className="flex items-center h-12 w-[260px]">
                <div className={`rounded-xl w-[7px] h-[7px] mx-2 ${item.isRead ? 'bg-gray-3' : 'bg-green-0'}`} />
                <div>{item.title}</div>
              </div>
              <button type="button" className="mt-4 pr-2 w-4 h-4" onClick={() => {}}>
                <Icons name={XIcon} />
              </button>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
