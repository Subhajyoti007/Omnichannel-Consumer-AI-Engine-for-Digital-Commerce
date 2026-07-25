import { Router } from "express";
import { getDb } from "../data/db";
import { Product } from "../data/mock-data";

const router = Router();

// GET /api/products
router.get("/products", async (req, res) => {
  try {
    const db = await getDb();
    const rows = await db.all("SELECT data FROM products");
    const products = rows.map((r) => JSON.parse(r.data));
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET /api/products/:id
router.get("/products/:id", async (req, res) => {
  try {
    const db = await getDb();
    const row = await db.get("SELECT data FROM products WHERE id = ?", [req.params.id]);
    if (row) {
      res.json(JSON.parse(row.data));
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET /api/promotions
router.get("/promotions", async (req, res) => {
  try {
    const db = await getDb();
    const rows = await db.all("SELECT data FROM promotions");
    const promotions = rows.map((r) => JSON.parse(r.data));
    res.json(promotions);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
