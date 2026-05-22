import { Repository, ILike } from "typeorm";
import { User, UserRole } from "../../domain/user/user.entity";
import { AppDataSource } from "../database/data-source";

export class UserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async create(userData: Partial<User>): Promise<User> {
    const user = this.repository.create(userData);
    return await this.repository.save(user);
  }

  async findById(id: string): Promise<User | null> {
    return await this.repository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.repository.findOne({ where: { email } });
  }

  async findAll(): Promise<User[]> {
    return await this.repository.find();
  }

  async findByRole(role: UserRole): Promise<User[]> {
    return await this.repository.find({ where: { role } });
  }

  async search(query: string, filters?: { role?: UserRole }): Promise<User[]> {
    const where: any[] = [
      { fullName: ILike(`%${query}%`) },
      { email: ILike(`%${query}%`) },
      { headline: ILike(`%${query}%`) },
    ];

    if (filters?.role) {
      return await this.repository.find({
        where: where.map((w) => ({ ...w, role: filters.role })),
      });
    }

    return await this.repository.find({ where });
  }

  async findAllPaginated(
    page: number = 1,
    limit: number = 20,
    filters?: { role?: UserRole }
  ): Promise<{ users: User[]; total: number }> {
    const where: any = {};
    if (filters?.role) where.role = filters.role;

    const [users, total] = await this.repository.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: "DESC" },
    });

    return { users, total };
  }

  async update(id: string, userData: Partial<User>): Promise<User | null> {
    const user = await this.findById(id);
    if (!user) return null;

    Object.assign(user, userData);
    return await this.repository.save(user);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }

  async updatePassword(id: string, newPassword: string): Promise<User | null> {
    const user = await this.findById(id);
    if (!user) return null;

    user.password = newPassword;
    return await this.repository.save(user);
  }
}
