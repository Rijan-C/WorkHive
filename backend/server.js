import dotenv from "dotenv";
import express from "express";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import authRoutes from "./src/routes/authRouts.js";
import connectDB from "./src/config/db.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config();

const app = express();
app.use(express.json());
connectDB();

// routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
