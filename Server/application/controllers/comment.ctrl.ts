import { Response } from "express";
import { CommentRepository } from "../../infrastructure/repositories/comment.repository";
import { ProjectRepository } from "../../infrastructure/repositories/project.repository";
import { AuthRequest } from "../../infrastructure/middleware/auth.middleware";
import { NotificationUtil } from "../../infrastructure/utils/notification.util";

export class CommentController {
  private commentRepository: CommentRepository;
  private projectRepository: ProjectRepository;

  constructor() {
    this.commentRepository = new CommentRepository();
    this.projectRepository = new ProjectRepository();
  }

  public createComment = async (
    req: AuthRequest,
    res: Response
  ): Promise<void> => {
    try {
      const { projectId } = req.params;
      const { content, parentId } = req.body;
      const authorId = req.user?.userId;

      if (!authorId) {
        res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
        return;
      }

      if (!content || content.trim().length === 0) {
        res.status(400).json({
          success: false,
          message: "Content is required",
        });
        return;
      }

      const comment = await this.commentRepository.create({
        content: content.trim(),
        authorId,
        projectId,
        parentId: parentId || null,
      });

      const commentWithAuthor = await this.commentRepository.findById(
        comment.id
      );

      // Send notification to project owner for new comments
      if (!parentId) {
        const project = await this.projectRepository.findById(projectId);
        if (project && project.ownerId !== authorId) {
          await NotificationUtil.create(
            project.ownerId,
            "new_comment",
            "New comment on your project",
            `Someone commented on "${project.title}"`,
            { projectId }
          );
        }
      } else {
        // Send notification for replies
        const parentComment = await this.commentRepository.findById(parentId);
        if (parentComment && parentComment.authorId !== authorId) {
          await NotificationUtil.create(
            parentComment.authorId,
            "comment_reply",
            "Someone replied to your comment",
            `You have a new reply on your comment`,
            { projectId }
          );
        }
      }

      res.status(201).json({
        success: true,
        message: "Comment created successfully",
        data: commentWithAuthor?.toJSON(),
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  public getCommentsByProject = async (
    req: AuthRequest,
    res: Response
  ): Promise<void> => {
    try {
      const { projectId } = req.params;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;

      const { comments, total } = await this.commentRepository.findByProjectId(
        projectId,
        page,
        limit
      );

      // Fetch replies for each top-level comment
      const commentsWithReplies = await Promise.all(
        comments.map(async (comment) => {
          const replies = await this.commentRepository.findReplies(comment.id);
          return {
            ...comment.toJSON(),
            replies: replies.map((r) => r.toJSON()),
          };
        })
      );

      res.status(200).json({
        success: true,
        data: commentsWithReplies,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  public updateComment = async (
    req: AuthRequest,
    res: Response
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const { content } = req.body;
      const userId = req.user?.userId;

      if (!userId) {
        res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
        return;
      }

      const comment = await this.commentRepository.findById(id);

      if (!comment) {
        res.status(404).json({
          success: false,
          message: "Comment not found",
        });
        return;
      }

      if (comment.authorId !== userId) {
        res.status(403).json({
          success: false,
          message: "Forbidden: You can only update your own comments",
        });
        return;
      }

      if (!content || content.trim().length === 0) {
        res.status(400).json({
          success: false,
          message: "Content is required",
        });
        return;
      }

      const updatedComment = await this.commentRepository.update(id, {
        content: content.trim(),
      });

      res.status(200).json({
        success: true,
        message: "Comment updated successfully",
        data: updatedComment?.toJSON(),
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  public deleteComment = async (
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

      const comment = await this.commentRepository.findById(id);

      if (!comment) {
        res.status(404).json({
          success: false,
          message: "Comment not found",
        });
        return;
      }

      if (comment.authorId !== userId) {
        res.status(403).json({
          success: false,
          message: "Forbidden: You can only delete your own comments",
        });
        return;
      }

      await this.commentRepository.softDelete(id);

      res.status(200).json({
        success: true,
        message: "Comment deleted successfully",
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
