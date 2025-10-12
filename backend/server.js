// backend/server.js
import app from "./src/app.js";
import "dotenv/config";

const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌐 Access at: http://192.168.29.165:${PORT}/ping`);
});
