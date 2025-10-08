// src/controllers/authController.ts
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import User from "../models/User";
import { registerSchema, loginSchema } from "../validators/authValidator";
import { BadRequestException } from "../exceptions/bad-request";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCode } from "../exceptions/root";
import { ADMIN_SECRET } from "../utils/config";

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "", { expiresIn: "7d" });
};

export const register = async (req: Request, res: Response) => {
  const { name, email, password, role } = registerSchema.parse(req.body);
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new BadRequestException("User already exists", ErrorCode.USER_ALREADY_EXISTS);
  }
  let finalRole = "user";

  console.log(password === ADMIN_SECRET?.trim());
  if (role?.trim().toLowerCase() === "admin" && password === ADMIN_SECRET?.trim()) {

    finalRole = "admin";
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: finalRole,
  });

  const userId = (user._id as Types.ObjectId).toString();

  res.status(201).json({
    _id: userId,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(userId),
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = loginSchema.parse(req.body);
  console.log(email, password);
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthorizedException("User not found", ErrorCode.USER_NOT_FOUND);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new UnauthorizedException("Invalid credentials", ErrorCode.INCORRECT_PASSWORD);
  }

  const userId = (user._id as Types.ObjectId).toString();

  res.json({
    _id: userId,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(userId),
  });
};
