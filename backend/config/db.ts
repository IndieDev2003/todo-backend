import mongoose from "mongoose";
import { MongoClient } from "mongodb";


const mongo_uri = process.env.MONGO_URI || "";

export const connectDB = async () => {
  try {
    await mongoose.connect(mongo_uri);
    console.log("DB Connnected");
  } catch (error: any) {
    console.log("Database Failed to Connect, Error :", error?.message);
  }
};


export const client = new MongoClient(mongo_uri);
export  const db = client.db();