import { Router } from "express";
import userController from "../controllers/user.controller";
import authMiddleware from "../middlewares/authentication.middleware";

import { userSchema } from '../validations/user.schema';

import validate from "../middlewares/validation.middleware";
const userRoutes = Router();

userRoutes.post("/user", validate(userSchema.create), userController.create);
userRoutes.get("/user", validate(userSchema.findAll), userController.findAll);
userRoutes.get("/user/:id", validate(userSchema.findOne), userController.findOne);
userRoutes.put("/user/:id", authMiddleware, validate(userSchema.update), userController.update);
userRoutes.delete("/user/:id", authMiddleware, validate(userSchema.delete), userController.delete);

export { userRoutes };
