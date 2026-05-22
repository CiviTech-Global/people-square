import { Response } from "express";
import { InvestmentInterestRepository } from "../../infrastructure/repositories/investmentInterest.repository";
import { ProjectRepository } from "../../infrastructure/repositories/project.repository";
import { AuthRequest } from "../../infrastructure/middleware/auth.middleware";
import { InvestmentInterestStatus } from "../../domain/investment/investmentInterest.entity";
import { NotificationUtil } from "../../infrastructure/utils/notification.util";

export class InvestmentInterestController {
  private investmentInterestRepository: InvestmentInterestRepository;
  private projectRepository: ProjectRepository;

  constructor() {
    this.investmentInterestRepository = new InvestmentInterestRepository();
    this.projectRepository = new ProjectRepository();
  }

  public expressInterest = async (
    req: AuthRequest,
    res: Response
  ): Promise<void> => {
    try {
      const { projectId } = req.params;
      const { message } = req.body;
      const investorId = req.user?.userId;

      if (!investorId) {
        res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
        return;
      }

      const existing =
        await this.investmentInterestRepository.findByInvestorAndProject(
          investorId,
          projectId
        );

      if (existing) {
        res.status(400).json({
          success: false,
          message: "You have already expressed interest in this project",
        });
        return;
      }

      const interest = await this.investmentInterestRepository.create({
        investorId,
        projectId,
        message: message || null,
        status: "expressed",
      });

      // Notify project owner about investment interest
      const project = await this.projectRepository.findById(projectId);
      if (project && project.ownerId !== investorId) {
        await NotificationUtil.create(
          project.ownerId,
          "interest_expressed",
          "New investment interest",
          `An investor expressed interest in "${project.title}"`,
          { projectId }
        );
      }

      res.status(201).json({
        success: true,
        message: "Interest expressed successfully",
        data: interest,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  public getProjectInterests = async (
    req: AuthRequest,
    res: Response
  ): Promise<void> => {
    try {
      const { projectId } = req.params;

      const interests =
        await this.investmentInterestRepository.findByProjectId(projectId);

      res.status(200).json({
        success: true,
        data: interests,
        count: interests.length,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  public getMyPortfolio = async (
    req: AuthRequest,
    res: Response
  ): Promise<void> => {
    try {
      const investorId = req.user?.userId;

      if (!investorId) {
        res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
        return;
      }

      const interests =
        await this.investmentInterestRepository.findByInvestorId(investorId);

      res.status(200).json({
        success: true,
        data: interests,
        count: interests.length,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  public updateInterestStatus = async (
    req: AuthRequest,
    res: Response
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const userId = req.user?.userId;

      if (!userId) {
        res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
        return;
      }

      const validStatuses: InvestmentInterestStatus[] = [
        "expressed",
        "in-discussion",
        "committed",
        "withdrawn",
      ];

      if (!validStatuses.includes(status)) {
        res.status(400).json({
          success: false,
          message: "Invalid status",
        });
        return;
      }

      const interest =
        await this.investmentInterestRepository.findById(id);

      if (!interest) {
        res.status(404).json({
          success: false,
          message: "Investment interest not found",
        });
        return;
      }

      // Only project owner or the investor can update status
      const project = await this.projectRepository.findById(interest.projectId);
      if (interest.investorId !== userId && project?.ownerId !== userId) {
        res.status(403).json({
          success: false,
          message: "Forbidden: Only the project owner or investor can update interest status",
        });
        return;
      }

      const updatedInterest =
        await this.investmentInterestRepository.updateStatus(id, status);

      res.status(200).json({
        success: true,
        message: "Interest status updated successfully",
        data: updatedInterest,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };
}
