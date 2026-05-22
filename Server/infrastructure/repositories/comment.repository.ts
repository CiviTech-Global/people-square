import { Repository, IsNull } from "typeorm";
import { Comment } from "../../domain/comment/comment.entity";
import { AppDataSource } from "../database/data-source";

export class CommentRepository {
  private repository: Repository<Comment>;

  constructor() {
    this.repository = AppDataSource.getRepository(Comment);
  }

  async create(data: Partial<Comment>): Promise<Comment> {
    const comment = this.repository.create(data);
    return await this.repository.save(comment);
  }

  async findById(id: string): Promise<Comment | null> {
    return await this.repository.findOne({
      where: { id },
      relations: ["author"],
    });
  }

  async findByProjectId(
    projectId: string,
    page: number,
    limit: number
  ): Promise<{ comments: Comment[]; total: number }> {
    const [comments, total] = await this.repository.findAndCount({
      where: { projectId, parentId: IsNull(), deletedAt: IsNull() },
      relations: ["author"],
      order: { createdAt: "ASC" },
      skip: (page - 1) * limit,
      take: limit,
    });

    return { comments, total };
  }

  async findReplies(parentId: string): Promise<Comment[]> {
    return await this.repository.find({
      where: { parentId, deletedAt: IsNull() },
      relations: ["author"],
      order: { createdAt: "ASC" },
    });
  }

  async update(id: string, data: Partial<Comment>): Promise<Comment | null> {
    const comment = await this.findById(id);
    if (!comment) return null;

    Object.assign(comment, data);
    return await this.repository.save(comment);
  }

  async softDelete(id: string): Promise<boolean> {
    const result = await this.repository.softDelete(id);
    return result.affected !== 0;
  }
}
