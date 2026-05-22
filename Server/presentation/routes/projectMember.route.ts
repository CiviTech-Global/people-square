import { Router } from "express";
import { ProjectMemberController } from "../../application/controllers/projectMember.ctrl";
import { AuthMiddleware } from "../../infrastructure/middleware/auth.middleware";

const router = Router();
const projectMemberController = new ProjectMemberController();

router.post(
  "/projects/:projectId/join",
  AuthMiddleware.authenticate,
  projectMemberController.requestToJoin
);

router.get(
  "/projects/:projectId/members",
  AuthMiddleware.authenticate,
  projectMemberController.getProjectMembers
);

router.put(
  "/members/:id/approve",
  AuthMiddleware.authenticate,
  projectMemberController.approveMember
);

router.put(
  "/members/:id/reject",
  AuthMiddleware.authenticate,
  projectMemberController.rejectMember
);

router.delete(
  "/members/:id",
  AuthMiddleware.authenticate,
  projectMemberController.removeMember
);

export default router;
