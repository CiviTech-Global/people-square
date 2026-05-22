import { NotificationRepository } from "../repositories/notification.repository";

const notificationRepo = new NotificationRepository();

export const NotificationUtil = {
  async create(
    userId: string,
    type: string,
    title: string,
    message?: string,
    metadata?: Record<string, any>
  ) {
    return notificationRepo.create({
      userId,
      type,
      title,
      message,
      isRead: false,
      metadata,
    });
  },
};
