import { Router } from "express";
import authController from '../controllers/auth.controller';
import { authSchema } from "../validations/auth.schema";
import validate from "../middlewares/validation.middleware";

const loginRoutes = Router();

// loginRoutes.post('/register', authController.register);
loginRoutes.post('/login', validate(authSchema.login), authController.login);
// loginRoutes.get('/logout',authMiddleware, authController.logout);

export default loginRoutes;
