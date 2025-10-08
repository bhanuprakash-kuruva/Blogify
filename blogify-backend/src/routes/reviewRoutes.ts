// routes/reviewRoutes.ts
import { Router } from "express";
import { addReview, getAllReviews, getUserReviews } from "../controllers/reviewController";
import { protect } from "../middlewares/authMiddleware";
import { admin } from "../middlewares/adminMiddleware";
import errorHandler from "../error-handler";

const reviewRouter = Router();

reviewRouter.post("/", protect, errorHandler(addReview));
reviewRouter.get("/",protect,admin, errorHandler(getAllReviews));
reviewRouter.get("/:id", protect, errorHandler(getUserReviews));

export default reviewRouter;
