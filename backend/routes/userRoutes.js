import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter
  .post("/register", registerUser)
  .post("/login", loginUser)
  .post("/logout",isAuthenticated, logoutUser)
  .get("/getUser", isAuthenticated,getUser);



export default userRouter