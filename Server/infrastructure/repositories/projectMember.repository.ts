import { Repository } from "typeorm";
import { ProjectMember } from "../../domain/projectMember/projectMember.entity";
import { AppDataSource } from "../database/data-source";
import { MemberStatus } from "../../domain/projectMember/projectMember.entity";

export class ProjectMemberRepository {
  private repository: Repository<ProjectMember>;

  constructor() {
    this.repository = AppDataSource.getRepository(ProjectMember);
  }

  async create(data: Partial<ProjectMember>): Promise<ProjectMember> {
    const member = this.repository.create(data);
    return await this.repository.save(member);
  }

  async findById(id: string): Promise<ProjectMember | null> {
    return await this.repository.findOne({
      where: { id },
      relations: ["user"],
    });
  }

  async findByProjectId(projectId: string): Promise<ProjectMember[]> {
    return await this.repository.find({
      where: { projectId },
      relations: ["user"],
      order: { createdAt: "ASC" },
    });
  }

  async findByUserAndProject(
    userId: string,
    projectId: string
  ): Promise<ProjectMember | null> {
    return await this.repository.findOne({
      where: { userId, projectId },
    });
  }

  async findByUserId(userId: string): Promise<ProjectMember[]> {
    return await this.repository.find({
      where: { userId, status: "active" as MemberStatus },
      relations: ["project"],
      order: { createdAt: "ASC" },
    });
  }

  async updateStatus(
    id: string,
    status: MemberStatus
  ): Promise<ProjectMember | null> {
    const member = await this.findById(id);
    if (!member) return null;

    member.status = status;
    return await this.repository.save(member);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }
}
