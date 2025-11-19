import express from "express";
import pool from "../config/pgDatabase.js";
import auth from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.get("/fetch", auth, async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.json({
        success: false,
        message: "Unauthorized, Please Login",
      });
    }

    const result = await pool.query(
      "SELECT id, name from users WHERE id = $1",
      [userId]
    );

    res.json({ success: true, message: result.rows[0] });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
});

export default userRouter;
