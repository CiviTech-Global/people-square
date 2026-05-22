import { Router } from "express";
import { BookmarkController } from "../../application/controllers/bookmark.ctrl";
import { AuthMiddleware } from "../../infrastructure/middleware/auth.middleware";

const router = Router();
const bookmarkController = new BookmarkController();

router.post(
  "/projects/:projectId/bookmark",
  AuthMiddleware.authenticate,
  bookmarkController.toggleBookmark
);

router.get(
  "/",
  AuthMiddleware.authenticate,
  bookmarkController.getMyBookmarks
);

router.get(
  "/projects/:projectId/bookmark",
  AuthMiddleware.authenticate,
  bookmarkController.checkBookmark
);

export default router;
