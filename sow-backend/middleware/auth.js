import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.json({
        success: false,
        message: "Unauthorized, Please login.",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.json({
        success: false,
        message: "Unauthorized, Please login.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;

    next();
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Invalid or expired token" });
  }
};

export default auth;
