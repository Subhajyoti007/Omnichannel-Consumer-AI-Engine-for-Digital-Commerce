import { Router } from "express";
import { getDb } from "../data/db";

const router = Router();

// GET /api/loyalty/perks
router.get("/perks", async (req, res) => {
  try {
    const db = await getDb();
    const rows = await db.all("SELECT data FROM perks");
    const perks = rows.map((r) => JSON.parse(r.data));
    res.json(perks);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
