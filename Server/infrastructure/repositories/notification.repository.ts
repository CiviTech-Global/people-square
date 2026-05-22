import { Repository } from "typeorm";
import { Notification } from "../../domain/notification/notification.entity";
import { AppDataSource } from "../database/data-source";

export class NotificationRepository {
  private repository: Repository<Notification>;

  constructor() {
    this.repository = AppDataSource.getRepository(Notification);
  }

  async create(data: Partial<Notification>): Promise<Notification> {
    const notification = this.repository.create(data);
    return await this.repository.save(notification);
  }

  async findByUserId(
    userId: string,
    page: number,
    limit: number
  ): Promise<{ notifications: Notification[]; total: number }> {
    const [notifications, total] = await this.repository.findAndCount({
      where: { userId },
      order: { createdAt: "DESC" },
      skip: (page - 1) * limit,
      take: limit,
    });

    return { notifications, total };
  }

  async getUnreadCount(userId: string): Promise<number> {
    return await this.repository.count({
      where: { userId, isRead: false },
    });
  }

  async markAsRead(id: string): Promise<Notification | null> {
    const notification = await this.repository.findOne({ where: { id } });
    if (!notification) return null;

    notification.isRead = true;
    return await this.repository.save(notification);
  }

  async markAllAsRead(userId: string): Promise<void> {
    await this.repository.update({ userId, isRead: false }, { isRead: true });
  }
}
