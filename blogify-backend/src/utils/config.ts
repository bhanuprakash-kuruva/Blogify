import dotenv from 'dotenv';

// Load environment variables first
dotenv.config();

export const PORT = process.env.PORT || 5000;
export const MONGO_URL = process.env.MONGO_URI;
export const JWT_SECRET = process.env.JWT_SECRET;
export const ADMIN_SECRET = process.env.ADMIN_SECRET || 'bhanu@2005';
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;