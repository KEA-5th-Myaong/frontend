export interface NotificationItem {
  notificationId: number;
  title: string;
  content: string;
  timestamp: string;
  type: string;
  url: string;
  isRead: boolean;
}

export interface Notifications {
  lastId: number;
  notifications: NotificationItem[];
}
