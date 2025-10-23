import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDb = async () => {
  try {
    const conn = await mongoose.connect(ENV.MONGO_URI);
    console.log(conn.connection.host);
  } catch (error) {
    console.log("Db connection error", error);
    process.exit(1);
  }
};
