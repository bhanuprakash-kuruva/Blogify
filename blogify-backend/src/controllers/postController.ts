// controllers/postController.ts
import { Request, Response } from "express";
import { Types } from "mongoose";
import Post from "../models/Post";
import User from "../models/User"; // Import User model
import { AuthRequest } from "../middlewares/authMiddleware";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";
import { createPostSchema, updatePostSchema } from "../validators/postValidator";
import { NotFoundException } from "../exceptions/not-found";
import { BadRequestException } from "../exceptions/bad-request";
import { ErrorCode } from "../exceptions/root";

export const createPost = async (req: AuthRequest, res: Response) => {
  const { title, content, category, tags, status } = createPostSchema.parse(
    req.body
  );
  
  let imageUrl: string | undefined;
  if (req.file) {
    imageUrl = await uploadToCloudinary(req.file.buffer);
  }
  const post = await Post.create({
    title,
    content,
    category,
    author: req.user?._id as Types.ObjectId,
    imageUrl,
    tags: tags ? tags.split(",").map((t: string) => t.trim()) : [],
    status: status || "published",
  });

  res.status(201).json(post);
};

export const getPosts = async (req: Request, res: Response) => {
  const { search, category, page = 1, limit = 10 } = req.query;
  const query: any = {};

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } },
    ];
  }

  if (category) {
    query.category = category;
  }

  const skip = (Number(page) - 1) * Number(limit);

  const posts = await Post.find(query)
    .skip(skip)
    .limit(Number(limit))
    .populate("author", "name email role")
    .populate("category", "name")
    .sort({ createdAt: -1 });
  const total = await Post.countDocuments(query);

  res.json({
    posts,
    total,
    page: Number(page),
    pages: Math.ceil(total / Number(limit)),
  });
};

export const getPostById = async (req: Request, res: Response) => {
  const post = await Post.findById(req.params.id)
    .populate("author", "name email role")
    .populate("category", "name");

  if (!post) throw new NotFoundException("Post not found", ErrorCode.USER_NOT_FOUND);

  res.json(post);
};

export const updatePost = async (req: AuthRequest, res: Response) => {
  let updates = { ...req.body };
  if (updates.tags) {
    try {
      const parsed = JSON.parse(updates.tags);
      updates.tags = Array.isArray(parsed) ? parsed.join(",") : updates.tags;
    } catch {
      updates.tags = updates.tags;
    }
  }

  const parsed = updatePostSchema.parse(updates);

  const post = await Post.findById(req.params.id);
  if (!post) throw new NotFoundException("Post not found", ErrorCode.USER_NOT_FOUND);

  if (parsed.title) post.title = parsed.title;
  if (parsed.content) post.content = parsed.content;
  if (parsed.category) post.category = new Types.ObjectId(parsed.category);
  if (parsed.tags) post.tags = parsed.tags.split(",").map((t: string) => t.trim());
  if (parsed.status) post.status = parsed.status;

  if (req.file) {
    post.imageUrl = await uploadToCloudinary(req.file.buffer);
  }

  await post.save();
  res.json(post);
};

export const deletePost = async (req: AuthRequest, res: Response) => {
  const post = await Post.findById(req.params.id);
  if (!post) throw new NotFoundException("Post not found", ErrorCode.USER_NOT_FOUND);

  await post.deleteOne();
  res.json({ message: "Post deleted successfully" });
};

export const likePost = async (req: AuthRequest, res: Response) => {
  const post = await Post.findById(req.params.id);
  if (!post) throw new NotFoundException("Post not found", ErrorCode.USER_NOT_FOUND);

  const userId = req.user?._id;
  if (!userId) throw new BadRequestException("User not found", ErrorCode.UNAUTHORIZED);

  const user = await User.findById(userId);
  if (!user) throw new BadRequestException("User not found", ErrorCode.USER_NOT_FOUND);

  // Remove from dislikes if exists
  post.dislikes = post.dislikes.filter(
    (id) => id.toString() !== userId.toString()
  );

  // Check if already liked
  const alreadyLiked = post.likes.some((id) => id.toString() === userId.toString());
  
  if (alreadyLiked) {
    // Unlike: remove from post likes and user's likedPosts
    post.likes = post.likes.filter((id) => id.toString() !== userId.toString());
    user.likedPosts = user.likedPosts.filter(
      (postId) => postId.toString() !== (post._id as Types.ObjectId).toString()
    );
  } else {
    // Like: add to post likes and user's likedPosts
    post.likes.push(userId as Types.ObjectId);
    user.likedPosts.push(post._id as Types.ObjectId);
  }

  await Promise.all([post.save(), user.save()]);
  
  const updatedPost = await Post.findById(post._id)
    .populate("author", "name email role")
    .populate("category", "name");
    
  res.json(updatedPost);
};

export const dislikePost = async (req: AuthRequest, res: Response) => {
  const post = await Post.findById(req.params.id);
  if (!post) throw new NotFoundException("Post not found", ErrorCode.USER_NOT_FOUND);

  const userId = req.user?._id;
  if (!userId) throw new BadRequestException("User not found", ErrorCode.UNAUTHORIZED);

  const user = await User.findById(userId);
  if (!user) throw new BadRequestException("User not found", ErrorCode.USER_NOT_FOUND);

  // Remove from likes if exists
  post.likes = post.likes.filter((id) => id.toString() !== userId.toString());

  // Remove from user's likedPosts if exists
  user.likedPosts = user.likedPosts.filter(
    (postId) => postId.toString() !== (post._id as Types.ObjectId).toString()
  );

  // Check if already disliked
  const alreadyDisliked = post.dislikes.some((id) => id.toString() === userId.toString());
  
  if (alreadyDisliked) {
    // Remove dislike
    post.dislikes = post.dislikes.filter(
      (id) => id.toString() !== userId.toString()
    );
  } else {
    // Add dislike
    post.dislikes.push(userId as Types.ObjectId);
  }

  await Promise.all([post.save(), user.save()]);
  
  const updatedPost = await Post.findById(post._id)
    .populate("author", "name email role")
    .populate("category", "name");
    
  res.json(updatedPost);
};

// Bookmark Post
export const bookmarkPost = async (req: AuthRequest, res: Response) => {
  const postId = req.params.id;
  const userId = req.user?._id;

  if (!userId) throw new BadRequestException("User not found", ErrorCode.UNAUTHORIZED);

  const user = await User.findById(userId);
  if (!user) throw new BadRequestException("User not found", ErrorCode.USER_NOT_FOUND);

  const post = await Post.findById(postId);
  if (!post) throw new NotFoundException("Post not found", ErrorCode.USER_NOT_FOUND);

  // Check if post is already bookmarked
  const isBookmarked = user.bookmarks.some(
    (bookmarkId) => bookmarkId.toString() === postId
  );

  if (isBookmarked) {
    // Remove bookmark
    user.bookmarks = user.bookmarks.filter(
      (bookmarkId) => bookmarkId.toString() !== postId
    );
    await user.save();
    res.json({ 
      message: "Post removed from bookmarks", 
      bookmarked: false,
      bookmarks: user.bookmarks 
    });
  } else {
    // Add bookmark
    user.bookmarks.push(new Types.ObjectId(postId));
    await user.save();
    res.json({ 
      message: "Post added to bookmarks", 
      bookmarked: true,
      bookmarks: user.bookmarks 
    });
  }
};

// Get User Bookmarks
export const getUserBookmarks = async (req: AuthRequest, res: Response) => {
  const userId = req.user?._id;

  if (!userId) throw new BadRequestException("User not found", ErrorCode.UNAUTHORIZED);

  const user = await User.findById(userId).populate({
    path: 'bookmarks',
    populate: [
      { path: 'author', select: 'name email role' },
      { path: 'category', select: 'name' }
    ]
  });

  if (!user) throw new BadRequestException("User not found", ErrorCode.USER_NOT_FOUND);

  res.json({
    bookmarks: user.bookmarks,
    total: user.bookmarks.length
  });
};

// Get User Liked Posts
export const getUserLikedPosts = async (req: AuthRequest, res: Response) => {
  const userId = req.user?._id;

  if (!userId) throw new BadRequestException("User not found", ErrorCode.UNAUTHORIZED);

  const user = await User.findById(userId).populate({
    path: 'likedPosts',
    populate: [
      { path: 'author', select: 'name email role' },
      { path: 'category', select: 'name' }
    ]
  });

  if (!user) throw new BadRequestException("User not found", ErrorCode.USER_NOT_FOUND);

  res.json({
    likedPosts: user.likedPosts,
    total: user.likedPosts.length
  });
};

// Check if Post is Bookmarked
export const checkBookmarkStatus = async (req: AuthRequest, res: Response) => {
  const postId = req.params.id;
  const userId = req.user?._id;

  if (!userId) throw new BadRequestException("User not found", ErrorCode.UNAUTHORIZED);

  const user = await User.findById(userId);
  if (!user) throw new BadRequestException("User not found", ErrorCode.USER_NOT_FOUND);

  const isBookmarked = user.bookmarks.some(
    (bookmarkId) => bookmarkId.toString() === postId
  );

  res.json({ bookmarked: isBookmarked });
};