import mongoose from 'mongoose';
import { MONGO_URL } from './utils/config';

const MONGO_URI = MONGO_URL;

const connectDB = () =>{
    mongoose
  .connect(process.env.MONGO_URI || '')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));
}

export default connectDB;