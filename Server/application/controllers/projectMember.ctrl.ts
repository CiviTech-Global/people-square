import { Response } from "express";
import { ProjectMemberRepository } from "../../infrastructure/repositories/projectMember.repository";
import { ProjectRepository } from "../../infrastructure/repositories/project.repository";
import { AuthRequest } from "../../infrastructure/middleware/auth.middleware";
import { NotificationUtil } from "../../infrastructure/utils/notification.util";

export class ProjectMemberController {
  private projectMemberRepository: ProjectMemberRepository;
  private projectRepository: ProjectRepository;

  constructor() {
    this.projectMemberRepository = new ProjectMemberRepository();
    this.projectRepository = new ProjectRepository();
  }

  public requestToJoin = async (
    req: AuthRequest,
    res: Response
  ): Promise<void> => {
    try {
      const { projectId } = req.params;
      const userId = req.user?.userId;

      if (!userId) {
        res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
        return;
      }

      const existing = await this.projectMemberRepository.findByUserAndProject(
        userId,
        projectId
      );

      if (existing) {
        res.status(400).json({
          success: false,
          message: "You have already requested to join this project",
        });
        return;
      }

      const member = await this.projectMemberRepository.create({
        projectId,
        userId,
        role: "member",
        status: "pending",
      });

      // Notify project owner about join request
      const project = await this.projectRepository.findById(projectId);
      if (project && project.ownerId !== userId) {
        await NotificationUtil.create(
          project.ownerId,
          "join_request",
          "New join request",
          `Someone wants to join "${project.title}"`,
          { projectId }
        );
      }

      res.status(201).json({
        success: true,
        message: "Join request submitted successfully",
        data: member.toJSON(),
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  public getProjectMembers = async (
    req: AuthRequest,
    res: Response
  ): Promise<void> => {
    try {
      const { projectId } = req.params;

      const members = await this.projectMemberRepository.findByProjectId(
        projectId
      );

      res.status(200).json({
        success: true,
        data: members.map((m) => m.toJSON()),
        count: members.length,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  public approveMember = async (
    req: AuthRequest,
    res: Response
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const userId = req.user?.userId;

      if (!userId) {
        res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
        return;
      }

      const member = await this.projectMemberRepository.findById(id);

      if (!member) {
        res.status(404).json({
          success: false,
          message: "Member request not found",
        });
        return;
      }

      const project = await this.projectRepository.findById(member.projectId);

      if (!project || project.ownerId !== userId) {
        res.status(403).json({
          success: false,
          message: "Forbidden: Only the project owner can approve members",
        });
        return;
      }

      const updatedMember = await this.projectMemberRepository.updateStatus(
        id,
        "active"
      );

      // Notify the member they've been approved
      await NotificationUtil.create(
        member.userId,
        "join_approved",
        "Join request approved",
        `You've been approved to join "${project.title}"`,
        { projectId: member.projectId }
      );

      res.status(200).json({
        success: true,
        message: "Member approved successfully",
        data: updatedMember?.toJSON(),
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  public rejectMember = async (
    req: AuthRequest,
    res: Response
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const userId = req.user?.userId;

      if (!userId) {
        res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
        return;
      }

      const member = await this.projectMemberRepository.findById(id);

      if (!member) {
        res.status(404).json({
          success: false,
          message: "Member request not found",
        });
        return;
      }

      const project = await this.projectRepository.findById(member.projectId);

      if (!project || project.ownerId !== userId) {
        res.status(403).json({
          success: false,
          message: "Forbidden: Only the project owner can reject members",
        });
        return;
      }

      const updatedMember = await this.projectMemberRepository.updateStatus(
        id,
        "rejected"
      );

      // Notify the member they've been rejected
      await NotificationUtil.create(
        member.userId,
        "join_rejected",
        "Join request declined",
        `Your request to join "${project.title}" was declined`,
        { projectId: member.projectId }
      );

      res.status(200).json({
        success: true,
        message: "Member rejected successfully",
        data: updatedMember?.toJSON(),
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  public removeMember = async (
    req: AuthRequest,
    res: Response
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const userId = req.user?.userId;

      if (!userId) {
        res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
        return;
      }

      const member = await this.projectMemberRepository.findById(id);

      if (!member) {
        res.status(404).json({
          success: false,
          message: "Member not found",
        });
        return;
      }

      const project = await this.projectRepository.findById(member.projectId);

      if (!project || project.ownerId !== userId) {
        res.status(403).json({
          success: false,
          message: "Forbidden: Only the project owner can remove members",
        });
        return;
      }

      await this.projectMemberRepository.delete(id);

      res.status(200).json({
        success: true,
        message: "Member removed successfully",
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
