import { Request, Response } from "express";
import Category from "../models/Category";
import { AuthRequest } from "../middlewares/authMiddleware";
import { createCategorySchema, updateCategorySchema } from "../validators/categoryValidator";
import { NotFoundException } from "../exceptions/not-found";
import { BadRequestException } from "../exceptions/bad-request";
import { ErrorCode } from "../exceptions/root";

export const createCategory = async (req: AuthRequest, res: Response) => {
  const { name } = createCategorySchema.parse(req.body);

  const existing = await Category.findOne({ name });
  if (existing) {
    throw new BadRequestException("Category already exists", ErrorCode.USER_ALREADY_EXISTS);
  }

  const category = await Category.create({ name });
  res.status(201).json(category);
};

export const getCategories = async (req: Request, res: Response) => {
  const categories = await Category.find().sort({ name: 1 });
  res.json(categories);
};

export const updateCategory = async (req: AuthRequest, res: Response) => {
  const updates = updateCategorySchema.parse(req.body);

  const category = await Category.findById(req.params.id);
  if (!category) {
    throw new NotFoundException("Category not found", ErrorCode.USER_NOT_FOUND);
  }

  if (updates.name) category.name = updates.name;

  await category.save();
  res.json(category);
};

export const deleteCategory = async (req: AuthRequest, res: Response) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    throw new NotFoundException("Category not found", ErrorCode.USER_NOT_FOUND);
  }

  await category.deleteOne();
  res.json({ message: "Category deleted successfully" });
};
