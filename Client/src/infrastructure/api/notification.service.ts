import { apiClient } from './axios.config';

export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  message?: string;
  isRead: boolean;
  metadata?: Record<string, any>;
  createdAt: string;
}

export class NotificationService {
  static async getNotifications(page = 1, limit = 20) {
    const res = await apiClient.get(`/api/v1/notifications`, { params: { page, limit } });
    return res.data;
  }

  static async getUnreadCount() {
    const res = await apiClient.get(`/api/v1/notifications/unread-count`);
    return res.data;
  }

  static async markAsRead(id: string) {
    const res = await apiClient.put(`/api/v1/notifications/${id}/read`);
    return res.data;
  }

  static async markAllAsRead() {
    const res = await apiClient.put(`/api/v1/notifications/mark-all-read`);
    return res.data;
  }
}
