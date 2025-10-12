// backend/src/app.js
import express from "express";
import cors from "cors";
import scanRoute from "../src/routes/scanRoute.js";
import wifiRoute from "../src/routes/wifiRoute.js";
import authRoutes from "../src/routes/auth.route.js";

const app = express();

app.use(cors({ origin: "*", methods: ["GET", "POST"] }));
app.use(express.json());

// 🧠 Simple logger for all requests
app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.originalUrl} — ${new Date().toLocaleTimeString()}`);
  next();
});

// ✅ Health check
app.get("/ping", (req, res) => {
  console.log("🏓 Ping received!");
  res.send("Pong 🟢");
});

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/scan", scanRoute);
app.use("/api/wifi-scan", wifiRoute);

export default app;
