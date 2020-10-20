import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

import { login } from "../controllers/userLoginController.js";

// === This file is used in app.use('/api/users', userRoutes) in server.js ===

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.post(
  "/login",
  //  authUser, // let user login and send JWT with RESPONSE data
  login // let user login and send JWT with cookie to client
);

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

// testing route for login user with JWT

export default router;
