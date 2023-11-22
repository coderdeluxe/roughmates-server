import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import accountRouter from "./routes/account.js";
import taskRouter from "./routes/task.js";
import projectRouter from "./routes/project.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/accounts", accountRouter);
app.use("/tasks", taskRouter);
app.use("/projects", projectRouter);

const MONGODB_URL =
  "mongodb+srv://coderdeluxe:LDWxmINP1Zm5Jx8Q@cluster0.mdxsr1e.mongodb.net/roughmates_db?retryWrites=true&w=majority";

const port = 5000;

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running in port ${port}`);
    });
  })
  .catch((error) => console.log(`${error} did not connect`));
