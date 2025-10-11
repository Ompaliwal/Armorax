import express from "express";
import "dotenv/config";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";

const app = express();

app.use(cors());
app.use(express.json());

//Auth Routes
app.use("/api/auth", authRoutes);

export default app;
