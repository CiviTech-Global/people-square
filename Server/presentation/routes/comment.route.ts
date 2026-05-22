import { Router } from "express";
import { CommentController } from "../../application/controllers/comment.ctrl";
import { AuthMiddleware } from "../../infrastructure/middleware/auth.middleware";

const router = Router();
const commentController = new CommentController();

router.post(
  "/projects/:projectId/comments",
  AuthMiddleware.authenticate,
  commentController.createComment
);

router.get(
  "/projects/:projectId/comments",
  AuthMiddleware.authenticate,
  commentController.getCommentsByProject
);

router.put(
  "/comments/:id",
  AuthMiddleware.authenticate,
  commentController.updateComment
);

router.delete(
  "/comments/:id",
  AuthMiddleware.authenticate,
  commentController.deleteComment
);

export default router;
