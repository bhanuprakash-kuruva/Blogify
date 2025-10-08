import { Request, Response } from "express";
import User from "../models/User";
import Post from "../models/Post";
import Comment from "../models/Comment";

export const getAdminStats = async (req: Request, res: Response) => {
  const [totalUsers, totalPosts, totalComments, posts] = await Promise.all([
    User.countDocuments(),
    Post.countDocuments(),
    Comment.countDocuments(),
    Post.find({}, "likes"),
  ]);

  const totalLikes = posts.reduce((sum, post) => sum + post.likes.length, 0);

  res.json({
    totalUsers,
    totalPosts,
    totalComments,
    totalLikes,
  });
};
