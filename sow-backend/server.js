import express from "express";
import cors from "cors";
import "dotenv/config";
import pool from "./config/pgDatabase.js";
import createUserTable from "./models/userModel.js";
import createTranslationTable from "./models/translationModel.js";
import loginRouter from "./api/login.js";
import translationRouter from "./api/translation.js";
import createProductsTable from "./models/productsModels.js";
import productRouter from "./api/products.js";

// Initializing the app
const app = express();
const PORT = process.env.PORT || 4000;

// Creating datbase tables
await createUserTable(pool);
await createTranslationTable(pool);
await createProductsTable(pool);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// API Endpoints
app.use("/api/login", loginRouter);
app.use("/api/translation", translationRouter);
app.use("/api/products", productRouter);


// Sample route
app.get("/", (req, res) => {
  res.send("SOW Backend Server is running...");
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
