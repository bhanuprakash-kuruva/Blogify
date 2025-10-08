import { Request, Response } from "express";
import Comment from "../models/Comment";
import Post from "../models/Post";
import { AuthRequest } from "../middlewares/authMiddleware";
import { Types } from "mongoose";
import { addCommentSchema } from "../validators/commentValidator";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";

export const addComment = async (req: AuthRequest, res: Response) => {
  const { postId, content } = addCommentSchema.parse(req.body);

  const post = await Post.findById(postId);
  if (!post) {
    throw new NotFoundException("Post not found", ErrorCode.USER_NOT_FOUND);
  }

  const comment = await Comment.create({
    post: postId,
    user: req.user?._id,
    content,
  });

  await comment.populate('user', 'name email');

  res.status(201).json(comment);
};

export const getCommentsByPost = async (req: Request, res: Response) => {
  const { postId } = req.params;

  const comments = await Comment.find({ post: postId })
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  res.json(comments);
};

export const deleteComment = async (req: AuthRequest, res: Response) => {
  const comment = await Comment.findById(req.params.id);
  console.log(comment);
  
  if (!comment) {
    throw new NotFoundException("Comment not found", ErrorCode.USER_NOT_FOUND);
  }

  const isCommentCreator = comment.user.toString() === req.user?._id?.toString();
  const isAdmin = req.user?.role === 'admin';

  if (!isCommentCreator && !isAdmin) {
    throw new NotFoundException("Access denied: You can only delete your own comments", ErrorCode.ACCESS_DENIED);
  }

  await comment.deleteOne();
  res.json({ message: "Comment deleted successfully" });
};

export const likeComment = async (req: AuthRequest, res: Response) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    throw new NotFoundException("Comment not found", ErrorCode.USER_NOT_FOUND);
  }

  const userId = req.user?._id?.toString();

  comment.dislikes = comment.dislikes.filter(id => id.toString() !== userId);

  if (comment.likes.some(id => id.toString() === userId)) {
    comment.likes = comment.likes.filter(id => id.toString() !== userId);
  } else {
    comment.likes.push(req.user?._id as Types.ObjectId);
  }

  await comment.save();
  
  // Return the full comment with arrays instead of just counts
  await comment.populate('user', 'name email');
  res.json(comment);
};

export const dislikeComment = async (req: AuthRequest, res: Response) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    throw new NotFoundException("Comment not found", ErrorCode.USER_NOT_FOUND);
  }

  const userId = req.user?._id?.toString();

  comment.likes = comment.likes.filter(id => id.toString() !== userId);

  if (comment.dislikes.some(id => id.toString() === userId)) {
    comment.dislikes = comment.dislikes.filter(id => id.toString() !== userId);
  } else {
    comment.dislikes.push(req.user?._id as Types.ObjectId);
  }

  await comment.save();
  await comment.populate('user', 'name email');
  res.json(comment);
};
