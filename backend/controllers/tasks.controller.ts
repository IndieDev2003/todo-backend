import { Task } from "../models/task.model.ts";
import type { Request, Response } from "express";

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, priority } = req.body;

    if (!title || !description || !priority) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const task = await Task.create({
      title,
      description,
      priority,
    });

    return res.status(201).json({
      success: true,
      data: task,
      message: "Task Created",
    });
  } catch (error: any) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const existingTask = await Task.findById(id);

    if (!existingTask) {
      return res
        .status(404)
        .json({ success: false, message: "Task not Found" });
    }

    await existingTask.deleteOne();
    return res
      .status(301)
      .json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find();

    if (tasks.length === 0) {
      return res
        // .status(404)
        .json({ success: false, message: "Add task to view" });
    }

    return res.json({ data: tasks, success: true, message: "Tasks fetched" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const updateTaskStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const existingTask = await Task.findById(id);

    if (!existingTask) {
      return res
        .status(400)
        .json({ success: false, message: "Task not found" });
    }

    existingTask.status = status;
    await existingTask.save();

    return res.status(200).json({
      success: true,
      message: "Task status updated",
      task: existingTask,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
