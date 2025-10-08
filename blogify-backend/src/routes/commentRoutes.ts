import express from "express";
import {
  addComment,
  getCommentsByPost,
  deleteComment,
  likeComment,
  dislikeComment,
} from "../controllers/commentController";
import { protect } from "../middlewares/authMiddleware";
import { admin } from "../middlewares/adminMiddleware";
import errorHandler from "../error-handler";

const commentRouter = express.Router();

commentRouter.post("/", protect, errorHandler(addComment));
commentRouter.get("/:postId", errorHandler(getCommentsByPost));
commentRouter.delete("/:id", protect, errorHandler(deleteComment));
commentRouter.post("/:id/like", protect, errorHandler(likeComment));
commentRouter.post("/:id/dislike", protect, errorHandler(dislikeComment));

export default commentRouter;
