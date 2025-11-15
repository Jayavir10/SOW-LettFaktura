import express from "express";
import pool from "../config/pgDatabase.js";

const translationRouter = express.Router();

// Add Translation
translationRouter.post("/add", async (req, res) => {
  try {
    const { label, lang, value } = req.body;

    if (!label || !lang || !value) {
      return res.json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // Query for adding or updating translation
    const insertQuery = `
            INSERT INTO translations (label, lang, value)
            VALUES ($1, $2, $3)
            ON CONFLICT (label, lang)
            DO UPDATE SET value = EXCLUDED.value;
        `;

    // Executing the query
    await pool.query(insertQuery, [label, lang, value]);

    res.json({
      success: true,
      message: "Translation added/updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
});

// Fetch trnaslation by language
translationRouter.get("/fetch/:lang", async (req, res) => {
  try {
    const { lang } = req.params;

    const result = await pool.query(
      "SELECT label, value from translations WHERE lang = $1",
      [lang]
    );

    const translations = {};
    result.rows.forEach((row) => {
      translations[row.label] = row.value;
    });

    res.json({ success: true, message: translations });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
});

export default translationRouter;
