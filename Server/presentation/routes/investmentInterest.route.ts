import { Router } from "express";
import { InvestmentInterestController } from "../../application/controllers/investmentInterest.ctrl";
import { AuthMiddleware } from "../../infrastructure/middleware/auth.middleware";

const router = Router();
const investmentInterestController = new InvestmentInterestController();

router.post(
  "/projects/:projectId/interest",
  AuthMiddleware.authenticate,
  investmentInterestController.expressInterest
);

router.get(
  "/projects/:projectId/interests",
  AuthMiddleware.authenticate,
  investmentInterestController.getProjectInterests
);

router.get(
  "/portfolio",
  AuthMiddleware.authenticate,
  investmentInterestController.getMyPortfolio
);

router.put(
  "/:id/status",
  AuthMiddleware.authenticate,
  investmentInterestController.updateInterestStatus
);

export default router;
