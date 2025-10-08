// controllers/reviewController.ts
import { Request, Response } from "express";
import { Review } from "../models/Review";

export const addReview = async (req: Request, res: Response) => {
  try {
    const { rating, message } = req.body;
    const userId = (req as any).user.id; // added by auth middleware
    console.log(userId);
    if (!rating || !message) {
      return res.status(400).json({ message: "Rating and message are required" });
    }

    const review = new Review({ rating, message, userId });
    await review.save();

    return res.status(201).json({ message: "Review added successfully", review });
  } catch (error) {
    console.error("Error adding review:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find().populate("userId", "name email");
    return res.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserReviews = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const reviews = await Review.find({ userId });
    return res.json(reviews);
  } catch (error) {
    console.error("Error fetching user reviews:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
