import express from "express";
import "dotenv/config";

import authRoutes from "./routes/auth.route.js";

const app = express();

app.use(express.json());

//Auth Routes
app.use("/api/auth", authRoutes);

export default app;
