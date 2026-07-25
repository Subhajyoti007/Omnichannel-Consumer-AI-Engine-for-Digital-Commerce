import { Router } from "express";
import { getDb } from "../data/db";
import { CustomerDigitalTwin } from "../data/mock-data";

const router = Router();

// Helper to fetch twin from SQLite
async function getTwin(id: string): Promise<CustomerDigitalTwin | null> {
  const db = await getDb();
  const row = await db.get("SELECT data FROM twins WHERE id = ?", [id]);
  if (!row) return null;
  return JSON.parse(row.data) as CustomerDigitalTwin;
}

// Helper to save twin to SQLite
async function saveTwin(twin: CustomerDigitalTwin) {
  const db = await getDb();
  await db.run("UPDATE twins SET data = ? WHERE id = ?", [JSON.stringify(twin), twin.id]);
}

// GET /api/twin/:id
router.get("/:id", async (req, res) => {
  try {
    const twin = await getTwin(req.params.id);
    if (twin) {
      res.json(twin);
    } else {
      res.status(404).json({ error: "Twin not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST /api/twin/:id/cart
router.post("/:id/cart", async (req, res) => {
  try {
    const twin = await getTwin(req.params.id);
    if (!twin) return res.status(404).json({ error: "Twin not found" });

    const { productId, qty = 1 } = req.body;
    
    const existing = twin.cart.find((c) => c.productId === productId);
    if (existing) {
      existing.qty += qty;
    } else {
      twin.cart.push({ productId, qty });
    }
    
    twin.intent = "ready_to_buy";
    await saveTwin(twin);
    res.json(twin);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE /api/twin/:id/cart/:productId
router.delete("/:id/cart/:productId", async (req, res) => {
  try {
    const twin = await getTwin(req.params.id);
    if (!twin) return res.status(404).json({ error: "Twin not found" });

    twin.cart = twin.cart.filter((c) => c.productId !== req.params.productId);
    await saveTwin(twin);
    res.json(twin);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST /api/twin/:id/journey
router.post("/:id/journey", async (req, res) => {
  try {
    const twin = await getTwin(req.params.id);
    if (!twin) return res.status(404).json({ error: "Twin not found" });

    const { channel, type, label, productId, meta } = req.body;
    
    const newEvent = {
      id: `j-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      ts: new Date().toISOString(),
      channel: channel || "OneShop",
      type,
      label,
      productId,
      meta,
    };

    twin.journey = [newEvent, ...twin.journey].slice(0, 40);
    await saveTwin(twin);
    res.json(twin);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST /api/twin/:id/ledger
router.post("/:id/ledger", async (req, res) => {
  try {
    const twin = await getTwin(req.params.id);
    if (!twin) return res.status(404).json({ error: "Twin not found" });

    const { perkId, title, cost } = req.body;
    const newEntry = {
      id: `red-${Date.now()}`,
      ts: new Date().toISOString(),
      label: `Redeemed: ${title}`,
      delta: -cost,
      category: "redemption" as const,
    };

    twin.loyaltyLedger = [newEntry, ...(twin.loyaltyLedger || [])];
    await saveTwin(twin);
    res.json(twin);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
