import { Repository } from "typeorm";
import { Bookmark } from "../../domain/bookmark/bookmark.entity";
import { AppDataSource } from "../database/data-source";

export class BookmarkRepository {
  private repository: Repository<Bookmark>;

  constructor() {
    this.repository = AppDataSource.getRepository(Bookmark);
  }

  async toggle(
    userId: string,
    projectId: string
  ): Promise<{ bookmarked: boolean }> {
    const existing = await this.repository.findOne({
      where: { userId, projectId },
    });

    if (existing) {
      await this.repository.delete(existing.id);
      return { bookmarked: false };
    }

    const bookmark = this.repository.create({ userId, projectId });
    await this.repository.save(bookmark);
    return { bookmarked: true };
  }

  async findByUserId(userId: string): Promise<Bookmark[]> {
    return await this.repository.find({
      where: { userId },
      relations: ["project", "project.owner"],
      order: { createdAt: "DESC" },
    });
  }

  async isBookmarked(userId: string, projectId: string): Promise<boolean> {
    const count = await this.repository.count({
      where: { userId, projectId },
    });
    return count > 0;
  }
}
