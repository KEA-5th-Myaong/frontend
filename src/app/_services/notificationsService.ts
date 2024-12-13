import api from '../api/axiosInstance';

// (GET) 알림 조회
export async function fetchNotifications(lastId: string) {
  try {
    const { data } = await api.get(`/notifications/${lastId}`);
    return data;
  } catch (error) {
    console.error('알림 조회 실패:', error);
    throw error;
  }
}

// (PUT) 알림 수정
export async function putNotification(notificationId: string) {
  try {
    await api.put(`/notifications/${notificationId}`);
  } catch (error) {
    console.error('알림 수정 실패:', error);
    throw error;
  }
}

// (DELETE) 알림 삭제
export async function deleteNotification(notificationId: string): Promise<void> {
  try {
    await api.delete(`/notifications/${notificationId}`);
  } catch (error) {
    console.error('알림 삭제 실패:', error);
    throw error;
  }
}
