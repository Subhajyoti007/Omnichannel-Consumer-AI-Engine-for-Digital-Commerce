import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import path from "path";
import fs from "fs";
import { PRODUCTS, PROMOTIONS, SEED_TWIN } from "./mock-data";
import { PERKS } from "./loyalty-data";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "database.sqlite");

let dbInstance: Database | null = null;

export async function getDb(): Promise<Database> {
  if (dbInstance) return dbInstance;

  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  dbInstance = await open({
    filename: DB_PATH,
    driver: sqlite3.Database,
  });

  await initializeDatabase(dbInstance);

  return dbInstance;
}

async function initializeDatabase(db: Database) {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      data TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS promotions (
      id TEXT PRIMARY KEY,
      data TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS twins (
      id TEXT PRIMARY KEY,
      data TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS perks (
      id TEXT PRIMARY KEY,
      data TEXT NOT NULL
    );
  `);

  const productCount = await db.get(`SELECT COUNT(*) as count FROM products`);
  if (productCount.count === 0) {
    const stmt = await db.prepare(`INSERT INTO products (id, data) VALUES (?, ?)`);
    for (const p of PRODUCTS) {
      await stmt.run(p.id, JSON.stringify(p));
    }
    await stmt.finalize();
  }

  const promoCount = await db.get(`SELECT COUNT(*) as count FROM promotions`);
  if (promoCount.count === 0) {
    const stmt = await db.prepare(`INSERT INTO promotions (id, data) VALUES (?, ?)`);
    for (const p of PROMOTIONS) {
      await stmt.run(p.id, JSON.stringify(p));
    }
    await stmt.finalize();
  }

  const perkCount = await db.get(`SELECT COUNT(*) as count FROM perks`);
  if (perkCount.count === 0) {
    const stmt = await db.prepare(`INSERT INTO perks (id, data) VALUES (?, ?)`);
    for (const p of PERKS) {
      await stmt.run(p.id, JSON.stringify(p));
    }
    await stmt.finalize();
  }

  const twinCount = await db.get(`SELECT COUNT(*) as count FROM twins`);
  if (twinCount.count === 0) {
    await db.run(`INSERT INTO twins (id, data) VALUES (?, ?)`, [
      SEED_TWIN.id,
      JSON.stringify(SEED_TWIN),
    ]);
  }
}
