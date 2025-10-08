import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IPost extends Document {
  title: string;
  content: string;
  category: Types.ObjectId;
  author: Types.ObjectId;
  imageUrl?: string;
  likes: Types.ObjectId[];
  dislikes: Types.ObjectId[];
  tags?: string[];
  status: 'draft' | 'published';
  slug?: string;
  createdAt: Date;
  updatedAt: Date;
}

const postSchema: Schema<IPost> = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    imageUrl: { type: String },

    likes: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
    dislikes: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
    tags: [{ type: String }],
    status: { type: String, enum: ['draft', 'published'], default: 'published' },
    slug: { type: String, unique: true },
  },
  { timestamps: true }
);

postSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }
  next();
});

export default mongoose.model<IPost>('Post', postSchema);
