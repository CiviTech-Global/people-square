export interface INotification {
  id?: string;
  userId: string;
  type: string;
  title: string;
  message?: string | null;
  isRead: boolean;
  metadata?: Record<string, any> | null;
  createdAt?: Date;
}
