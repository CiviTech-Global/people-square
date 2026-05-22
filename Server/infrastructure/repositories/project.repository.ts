import { Repository, IsNull, ILike, FindOptionsWhere } from "typeorm";
import { Project } from "../../domain/project/project.entity";
import { AppDataSource } from "../database/data-source";

export class ProjectRepository {
  private repository: Repository<Project>;

  constructor() {
    this.repository = AppDataSource.getRepository(Project);
  }

  async create(projectData: Partial<Project>): Promise<Project> {
    const project = this.repository.create(projectData);
    return await this.repository.save(project);
  }

  async findById(id: string): Promise<Project | null> {
    return await this.repository.findOne({
      where: { id, deletedAt: IsNull() },
      relations: ["owner"],
    });
  }

  async findByOwnerId(ownerId: string): Promise<Project[]> {
    return await this.repository.find({
      where: { ownerId, deletedAt: IsNull() },
      relations: ["owner"],
      order: { createdAt: "DESC" },
    });
  }

  async findAll(): Promise<Project[]> {
    return await this.repository.find({
      where: { deletedAt: IsNull() },
      relations: ["owner"],
      order: { createdAt: "DESC" },
    });
  }

  async update(id: string, projectData: Partial<Project>): Promise<Project | null> {
    const project = await this.findById(id);
    if (!project) return null;

    Object.assign(project, projectData);
    return await this.repository.save(project);
  }

  async softDelete(id: string): Promise<boolean> {
    const result = await this.repository.softDelete(id);
    return result.affected !== 0;
  }

  async restore(id: string): Promise<boolean> {
    const result = await this.repository.restore(id);
    return result.affected !== 0;
  }

  async hardDelete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }

  async findByInvestmentStatus(status: string): Promise<Project[]> {
    return await this.repository.find({
      where: { investmentStatus: status as any, deletedAt: IsNull() },
      relations: ["owner"],
      order: { createdAt: "DESC" },
    });
  }

  async findRegistered(): Promise<Project[]> {
    return await this.repository.find({
      where: { isRegistered: true, deletedAt: IsNull() },
      relations: ["owner"],
      order: { createdAt: "DESC" },
    });
  }

  async findAllPaginated(
    page: number,
    limit: number,
    filters: {
      category?: string;
      stage?: string;
      investmentStatus?: string;
      search?: string;
      tags?: string[];
    }
  ): Promise<{ projects: Project[]; total: number }> {
    const where: FindOptionsWhere<Project> = { deletedAt: IsNull() };

    if (filters.category) {
      where.category = filters.category;
    }
    if (filters.stage) {
      where.stage = filters.stage as any;
    }
    if (filters.investmentStatus) {
      where.investmentStatus = filters.investmentStatus as any;
    }

    const queryBuilder = this.repository
      .createQueryBuilder("project")
      .leftJoinAndSelect("project.owner", "owner")
      .where("project.deletedAt IS NULL");

    if (filters.category) {
      queryBuilder.andWhere("project.category = :category", { category: filters.category });
    }
    if (filters.stage) {
      queryBuilder.andWhere("project.stage = :stage", { stage: filters.stage });
    }
    if (filters.investmentStatus) {
      queryBuilder.andWhere("project.investmentStatus = :investmentStatus", {
        investmentStatus: filters.investmentStatus,
      });
    }
    if (filters.search) {
      queryBuilder.andWhere(
        "(project.title ILIKE :search OR project.description ILIKE :search)",
        { search: `%${filters.search}%` }
      );
    }
    if (filters.tags && filters.tags.length > 0) {
      queryBuilder.andWhere("project.tags LIKE :tags", {
        tags: `%${filters.tags.join("%")}%`,
      });
    }

    queryBuilder
      .orderBy("project.createdAt", "DESC")
      .skip((page - 1) * limit)
      .take(limit);

    const [projects, total] = await queryBuilder.getManyAndCount();
    return { projects, total };
  }

  async findTrending(limit: number): Promise<Project[]> {
    return await this.repository.find({
      where: { deletedAt: IsNull() },
      relations: ["owner"],
      order: { viewCount: "DESC" },
      take: limit,
    });
  }

  async incrementViewCount(id: string): Promise<void> {
    await this.repository.increment({ id }, "viewCount", 1);
  }
}
