import { Repository } from "typeorm";
import { InvestmentInterest, InvestmentInterestStatus } from "../../domain/investment/investmentInterest.entity";
import { AppDataSource } from "../database/data-source";

export class InvestmentInterestRepository {
  private repository: Repository<InvestmentInterest>;

  constructor() {
    this.repository = AppDataSource.getRepository(InvestmentInterest);
  }

  async findById(id: string): Promise<InvestmentInterest | null> {
    return await this.repository.findOne({
      where: { id },
      relations: ["investor", "project"],
    });
  }

  async create(data: Partial<InvestmentInterest>): Promise<InvestmentInterest> {
    const interest = this.repository.create(data);
    return await this.repository.save(interest);
  }

  async findByProjectId(projectId: string): Promise<InvestmentInterest[]> {
    return await this.repository.find({
      where: { projectId },
      relations: ["investor"],
      order: { createdAt: "DESC" },
    });
  }

  async findByInvestorId(investorId: string): Promise<InvestmentInterest[]> {
    return await this.repository.find({
      where: { investorId },
      relations: ["project"],
      order: { createdAt: "DESC" },
    });
  }

  async findByInvestorAndProject(
    investorId: string,
    projectId: string
  ): Promise<InvestmentInterest | null> {
    return await this.repository.findOne({
      where: { investorId, projectId },
    });
  }

  async updateStatus(
    id: string,
    status: InvestmentInterestStatus
  ): Promise<InvestmentInterest | null> {
    const interest = await this.repository.findOne({ where: { id } });
    if (!interest) return null;

    interest.status = status;
    return await this.repository.save(interest);
  }
}
