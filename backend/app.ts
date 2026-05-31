import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectDB } from "./config/db.ts";
import taskRouter from "./routes/task.routes.ts";

const PORT = process.env.PORT;

await connectDB();
const app = express();
app.use(
  cors({
    origin: true, // Allow only your frontend origin
  }),
);
app.use(express.json());

app.get("/", async (_, res) => {
  return res.send("Task API Working");
});
app.use("/api/task", taskRouter);

app.listen(PORT, () => console.log(`Task API Running on ${PORT}`));
