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

// (POST) 알림 생성
export async function postNotifications(notificationData: unknown) {
  try {
    await api.post('/notifications', notificationData);
  } catch (error) {
    console.error('알림 생성 실패:', error);
    throw error;
  }
}
