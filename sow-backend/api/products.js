import express from "express";
import pool from "../config/pgDatabase.js";
import auth from "../middleware/auth.js";

const productRouter = express.Router();

// Add Product
productRouter.post("/add", auth, async (req, res) => {
  try {
    const userId = req.userId;
    const { article_no, name, in_price, price, unit, in_stock = 0, description } =
      req.body;

    if (!article_no || !name || !in_price || !price || !unit) {
      return res.json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const insertQuery = `INSERT INTO products (article_no, name, in_price, price, unit, in_stock, description, user_id) 
                         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;

    await pool.query(insertQuery, [
      article_no,
      name,
      in_price,
      price,
      unit,
      in_stock,
      description,
      userId,
    ]);

    res.json({
      success: true,
      message: "Products added successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
});

// Fetch users all Products
productRouter.get("/getAll", auth, async (req, res) => {
  try {
    const userId = req.userId;

    const products = await pool.query(
      "SELECT id, article_no, name, in_price, price, unit, in_stock, description from products WHERE user_id = $1 ORDER BY id ASC",
      [userId]
    );

    res.json({ success: true, message: products.rows });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
});

// Update Product
productRouter.put("/update/:id", auth, async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const {
      article_no,
      name,
      in_price,
      price,
      unit,
      in_stock,
      description = "",
    } = req.body;

    if (!article_no || !name || !in_price || !price || !unit) {
      return res.json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // check owner
    const ownerCheck = await pool.query(
      "SELECT user_id FROM products WHERE id = $1",
      [id]
    );
    if (ownerCheck.rows.length === 0) {
      return res.json({ success: false, message: "Product not found" });
    }
    if (ownerCheck.rows[0].user_id !== userId) {
      return res.json({
        success: false,
        message: "Not authorized to update this product",
      });
    }

    const updateQuery = `
      UPDATE products 
      SET article_no = $1,
          name = $2,
          in_price = $3,
          price = $4,
          unit = $5,
          in_stock = $6,
          description = $7
      WHERE id = $8
    `;

    const result = await pool.query(updateQuery, [
      article_no,
      name,
      in_price,
      price,
      unit,
      in_stock,
      description,
      id,
    ]);

    if (result.rowCount === 0) {
      return res.json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, message: "Product updated successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
});

// Delete product
productRouter.delete("/delete/:id", auth, async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    // check owner
    const ownerCheck = await pool.query(
      "SELECT user_id FROM products WHERE id = $1",
      [id]
    );
    if (ownerCheck.rows.length === 0) {
      return res.json({ success: false, message: "Product not found" });
    }
    if (ownerCheck.rows[0].user_id !== userId) {
      return res.json({
        success: false,
        message: "Not authorized to delete this product",
      });
    }

    const result = await pool.query("DELETE FROM products WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return res.json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
});

export default productRouter;
