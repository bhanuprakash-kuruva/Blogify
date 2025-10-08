import { Router } from "express";
import { login, register } from "../controllers/authController";
import errorHandler from "../error-handler";

const authRouter = Router();

authRouter.post("/register", errorHandler(register));
authRouter.post("/login", errorHandler(login));

export default authRouter;
