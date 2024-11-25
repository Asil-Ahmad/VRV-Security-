import {
  registerUser,
  listUser,
  deleteUser,
  adminLogin,
  updateUser,
} from "../controllers/userController.js";
import express from "express";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

//!To create routes we have to use express.router

const userRouter = express.Router();

//!Here we add METHODS

//Admin Login
userRouter.post("/admin", adminLogin);
userRouter.get("/list",adminAuth, listUser);
userRouter.post("/register", adminAuth, upload.single("image"), registerUser);
userRouter.post("/remove", adminAuth, upload.none(), deleteUser);
userRouter.post("/update", adminAuth, upload.single("image"), updateUser);

export default userRouter;
