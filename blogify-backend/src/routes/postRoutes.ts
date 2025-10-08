import express from 'express';
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  likePost,
  dislikePost,
  bookmarkPost,
  getUserBookmarks,
  checkBookmarkStatus,
  getUserLikedPosts
} from '../controllers/postController';
import { protect } from '../middlewares/authMiddleware';
import { admin } from '../middlewares/adminMiddleware';
import multer from 'multer';
import errorHandler from '../error-handler';

const postRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

postRouter.get('/', errorHandler(getPosts)); 
postRouter.get('/:id', errorHandler(getPostById)); 

postRouter.post('/', protect, admin, upload.single('image'), errorHandler(createPost));
postRouter.put('/:id', protect, admin, upload.single('image'), errorHandler(updatePost));
postRouter.delete('/:id', protect, admin, errorHandler(deletePost));

postRouter.post('/like/:id', protect, errorHandler(likePost));
postRouter.post('/dislike/:id', protect, errorHandler(dislikePost));

postRouter.post('/bookmark/:id', protect, errorHandler(bookmarkPost));
postRouter.get('/bookmarks/my', protect, errorHandler(getUserBookmarks));
postRouter.get('/bookmarks/check/:id', protect, errorHandler(checkBookmarkStatus));
postRouter.get('/liked-posts/my', protect, errorHandler(getUserLikedPosts));

export default postRouter;
