import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectDB } from "./config/db.ts";
import taskRouter from "./routes/task.routes.ts";

// Better Auth
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.ts";

const PORT = process.env.PORT;

await connectDB();
const app = express();
app.use(
  cors({
    origin: 'http://localhost:5173', // Allow only your frontend origin
    credentials:true
  }),
);
app.use(express.json());

app.get("/", async (_, res) => {
  return res.send("Task API Working");
});

// Auth with Better-Auth
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use("/api/task", taskRouter);

app.listen(PORT, () => console.log(`Task API Running on ${PORT}`));
