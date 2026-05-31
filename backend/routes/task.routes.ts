import express from 'express'
import { createTask, deleteTask, getAllTasks, updateTaskStatus } from '../controllers/tasks.controller.ts';

const taskRouter = express.Router();

taskRouter.get("/all-tasks", getAllTasks)
taskRouter.post("/create", createTask);
taskRouter.put('/update-status/:id', updateTaskStatus)
taskRouter.delete("/delete-task/:id",deleteTask)

export default taskRouter