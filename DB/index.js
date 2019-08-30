import mongoose from "mongoose";
import User from "./models/User";
import Message from "./models/Messages";
import { config } from "dotenv";
config();
const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
};
const models = { User, Message };
export { connectDb };
export default models;
