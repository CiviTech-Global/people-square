import { Response } from "express";
import { BookmarkRepository } from "../../infrastructure/repositories/bookmark.repository";
import { AuthRequest } from "../../infrastructure/middleware/auth.middleware";

export class BookmarkController {
  private bookmarkRepository: BookmarkRepository;

  constructor() {
    this.bookmarkRepository = new BookmarkRepository();
  }

  public toggleBookmark = async (
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

      const result = await this.bookmarkRepository.toggle(userId, projectId);

      res.status(200).json({
        success: true,
        message: result.bookmarked
          ? "Project bookmarked successfully"
          : "Bookmark removed successfully",
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  public getMyBookmarks = async (
    req: AuthRequest,
    res: Response
  ): Promise<void> => {
    try {
      const userId = req.user?.userId;

      if (!userId) {
        res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
        return;
      }

      const bookmarks = await this.bookmarkRepository.findByUserId(userId);

      res.status(200).json({
        success: true,
        data: bookmarks,
        count: bookmarks.length,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  public checkBookmark = async (
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

      const bookmarked = await this.bookmarkRepository.isBookmarked(
        userId,
        projectId
      );

      res.status(200).json({
        success: true,
        data: { bookmarked },
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
