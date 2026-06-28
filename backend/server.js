import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./src/routes/authRoutes.js";
import gigRoutes from "./src/routes/gigRoutes.js";
import profileRoutes from "./src/routes/profileRoutes.js";
import connectDB from "./src/config/db.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

// Database
connectDB();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/gigs", gigRoutes);
app.use("/api/profile", profileRoutes);

app.get("/", (req, res) => {
  res.send("WorkHive API running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`WorkHive server running on port ${PORT}`);
});
