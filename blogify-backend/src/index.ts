import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db";
import { PORT } from "./utils/config";
import rootRouter from "./routes/root";
import { errorMiddleware } from "./middlewares/exception-middlware";
import { setupSwagger } from "./swagger";

dotenv.config();

const app: Express = express();

connectDB();

app.use(cors());
app.use(express.json());

// Swagger docs
setupSwagger(app);

// API routes
app.use("/api", rootRouter);
app.use(errorMiddleware);

// Health check
app.get("/", (req: Request, res: Response) => {
  res.send("API is running 🚀");
});

const port = PORT;
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
  console.log(`📖 Swagger docs available at http://localhost:${port}/api-docs`);
});
