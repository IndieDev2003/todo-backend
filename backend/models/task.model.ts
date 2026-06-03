import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    userId: {
      type:String,
      required:true
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: ["Low", "High", "Medium", "Urgent"],
    },
    status: {
      type: String, enum: ["Pending", "Done"],
      default:'Pending'
     },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

export const Task = mongoose.model("Task", TaskSchema);
