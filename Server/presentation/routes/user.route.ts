import { Router } from "express";
import multer from "multer";
import { UserController } from "../../application/controllers/user.ctrl";
import { AuthMiddleware } from "../../infrastructure/middleware/auth.middleware";

const router = Router();
const userController = new UserController();

const avatarUpload = multer({
  storage: multer.diskStorage({
    destination: "uploads/",
    filename: (_req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const ext = file.originalname.split(".").pop();
      cb(null, `avatar-${uniqueSuffix}.${ext}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

// Public routes
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/forgot-password", userController.forgotPassword);
router.post("/reset-password", userController.resetPassword);

// Protected routes
router.get("/search", AuthMiddleware.authenticate, userController.searchUsers);
router.get("/role/:role", AuthMiddleware.authenticate, userController.getUsersByRole);
router.get("/:id", AuthMiddleware.authenticate, userController.getUser);
router.put("/:id", AuthMiddleware.authenticate, userController.updateUser);
router.put("/:id/profile", AuthMiddleware.authenticate, userController.completeProfile);
router.post("/:id/avatar", AuthMiddleware.authenticate, avatarUpload.single("avatar"), userController.uploadAvatar);
router.get("/", AuthMiddleware.authenticate, userController.getAllUsers);

export default router;
