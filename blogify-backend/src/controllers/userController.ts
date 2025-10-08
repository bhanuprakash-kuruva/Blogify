import { Response } from "express";
import User from "../models/User";
import Post from "../models/Post";
import Comment from "../models/Comment";
import { NotFoundException } from "../exceptions/not-found";
import { BadRequestException } from "../exceptions/bad-request";
import { ErrorCode } from "../exceptions/root";
import { AuthRequest } from "../middlewares/authMiddleware";

export const getUsers = async (req: AuthRequest, res: Response) => {
  const { page = 1, limit = 10, search = '' } = req.query;
  
  const query: any = {};
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  const skip = (Number(page) - 1) * Number(limit);

  const users = await User.find(query)
    .select('-password')
    .skip(skip)
    .limit(Number(limit))
    .sort({ createdAt: -1 });

  const total = await User.countDocuments(query);

  res.json({
    users,
    total,
    page: Number(page),
    pages: Math.ceil(total / Number(limit)),
  });
};

export const deleteUser = async (req: AuthRequest, res: Response) => {
  const userId = req.params.id;
  if (req.user && (req.user as any)._id.toString() === userId) {
    throw new BadRequestException("Cannot delete your own account", ErrorCode.INTERNAL_EXCEPTION);
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
  }
  await Post.deleteMany({ author: userId });
  await Comment.deleteMany({ author: userId });

  await User.findByIdAndDelete(userId);

  res.json({ message: "User deleted successfully" });
};

export const updateUserRole = async (req: AuthRequest, res: Response) => {
  const userId = req.params.id;
  const { role } = req.body;

  if (!['user', 'admin'].includes(role)) {
    throw new BadRequestException("Invalid role", ErrorCode.INTERNAL_EXCEPTION);
  }
  if (req.user && (req.user as any)._id.toString() === userId) {
    throw new BadRequestException("Cannot change your own role", ErrorCode.INTERNAL_EXCEPTION);
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { role },
    { new: true }
  ).select('-password');

  if (!user) {
    throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
  }

  res.json(user);
};