import User from "../database/models/User";
import {
  BadRequestError,
} from "../utils/ApiError";
import { getInternationalPhoneNumber } from '../utils/phone';

let userController = {
  create: async (req, res, next) => {
    try {
      const { email, mobile } = req.body;

      const userExists = await User.findOne({
        where: { email },
      });

      if (userExists) throw new BadRequestError("User with this email already exists");

      const user = await User.create({
        ...req.body,
        email: email.toLowerCase().trim(),
        mobile: getInternationalPhoneNumber(mobile)
      });

      return res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  },


  findAll: async (req, res, next) => {
    try {
      const users = await User.findAll();

      return res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  },

  findOne: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);

      if (!user) throw new BadRequestError();

      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const { email, mobile, ...restData } = req.body;

      const user = await User.findByPk(req.params.id);

      if (!user) {
        throw new BadRequestError();
      }

      const newUser = await user.update({
        ...restData,
        email: email.toLowerCase().trim(),
        mobile: getInternationalPhoneNumber(mobile)
      });

      return res.status(200).json(newUser);
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) throw new BadRequestError();

      user.destroy();

      return res.status(200).json({ msg: "Deleted" });
    } catch (error) {
      next(error);
    }
  },
};

export default userController;
