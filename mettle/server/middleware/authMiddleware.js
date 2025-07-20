// server/middleware/authMiddleware.js
import jwt from "jsonwebtoken";

/**
 * Middleware to verify JWT and attach user info to req.user
 * Requires Authorization: Bearer <token> header
 */
export default function authMiddleware(req, res, next) {
  console.log("Auth Middleware running");

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.warn("Missing or malformed Authorization header");
    return res.status(401).json({ message: "Missing or invalid Authorization header" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    console.warn("No token found after Bearer");
    return res.status(401).json({ message: "Missing token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || (!decoded.id && !decoded._id)) {
      console.warn("Decoded token missing id or _id");
      return res.status(401).json({ message: "Invalid token payload" });
    }

    req.user = {
      id: decoded.id || decoded._id,
      email: decoded.email || null,
    };

    console.log("Auth Middleware success, user id:", req.user.id);
    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
}
