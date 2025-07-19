// middleware/authMiddleware.js
// Middleware to verify JWT and attach user info to request

import jwt from 'jsonwebtoken';

/**
 * Verifies the JWT token in Authorization header.
 * Attaches decoded user info to req.user.
 */
export default function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing or invalid Authorization header' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('JWT verification error:', err.message);
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
    req.user = decoded;  // Attach decoded token payload (e.g., user id) to request
    next();
  });
}
