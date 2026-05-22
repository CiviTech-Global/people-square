import { Router } from "express";
import { NotificationController } from "../../application/controllers/notification.ctrl";
import { AuthMiddleware } from "../../infrastructure/middleware/auth.middleware";

const router = Router();
const notificationController = new NotificationController();

router.get(
  "/",
  AuthMiddleware.authenticate,
  notificationController.getNotifications
);

router.get(
  "/unread-count",
  AuthMiddleware.authenticate,
  notificationController.getUnreadCount
);

router.put(
  "/mark-all-read",
  AuthMiddleware.authenticate,
  notificationController.markAllAsRead
);

router.put(
  "/:id/read",
  AuthMiddleware.authenticate,
  notificationController.markAsRead
);

export default router;
