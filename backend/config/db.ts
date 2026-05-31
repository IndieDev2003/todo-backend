import mongoose from "mongoose";

const mongo_uri = process.env.MONGO_URI || "";

export const connectDB = async () => {
  try {
    await mongoose.connect(mongo_uri);
    console.log("DB Connnected");
  } catch (error:any) {
      console.log('Database Failed to Connect, Error :',error?.message)
  }
};
