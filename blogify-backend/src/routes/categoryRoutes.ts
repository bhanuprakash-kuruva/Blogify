import { Router } from "express";
import { createCategory, getCategories, updateCategory, deleteCategory } from "../controllers/categoryController";
import { protect } from "../middlewares/authMiddleware";
import { admin } from "../middlewares/adminMiddleware";
import errorHandler from "../error-handler";

const categoryRouter = Router();

categoryRouter.get("/", errorHandler(getCategories));
categoryRouter.post("/", protect, admin, errorHandler(createCategory));
categoryRouter.put("/:id", protect, admin, errorHandler(updateCategory));
categoryRouter.delete("/:id", protect, admin, errorHandler(deleteCategory));

export default categoryRouter;
