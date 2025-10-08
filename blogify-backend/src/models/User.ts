// models/User.ts
import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  bookmarks: Types.ObjectId[];
  likedPosts: Types.ObjectId[];
  createdAt: Date;
}

const userSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  bookmarks: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Post',
    default: [] 
  }],
  likedPosts: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Post',
    default: [] 
  }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IUser>('User', userSchema);