import { Pool } from "pg";
import "dotenv/config";

  const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
  });

  pool.on("connect", () => console.log("Connected to PostgreSQL database"));
  pool.on("error", (err) => console.error("Error connecting to PostgreSQL database:", err));

export default pool;
