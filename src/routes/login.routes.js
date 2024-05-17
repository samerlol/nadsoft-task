import { Router } from "express";
import authController from '../controllers/auth.controller';
import { authSchema } from "../validations/auth.schema";
import validate from "../middlewares/validation.middleware";

const loginRoutes = Router();

loginRoutes.post('/login', validate(authSchema.login), authController.login);

export default loginRoutes;
