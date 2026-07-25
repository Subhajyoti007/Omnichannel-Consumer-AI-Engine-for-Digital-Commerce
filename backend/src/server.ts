import express from "express";
import cors from "cors";
import catalogRoutes from "./routes/catalog";
import twinRoutes from "./routes/twin";
import chatRoutes from "./routes/chat";
import loyaltyRoutes from "./routes/loyalty";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api", catalogRoutes);
app.use("/api/twin", twinRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/loyalty", loyaltyRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/", (req, res) => {
  res.send("Backend was running successfully");
});

import { getDb } from "./data/db";

app.listen(port, async () => {
  try {
    await getDb();
    console.log(`Backend server is running at http://localhost:${port}`);
    console.log(`SQLite Database initialized successfully.`);
  } catch (err) {
    console.error("Failed to initialize database:", err);
  }
});
