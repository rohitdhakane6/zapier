import { Router, Request, Response, NextFunction } from "express";
import jwt, { JwtPayload, TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";

const route = Router();

route.use((req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      throw new Error('JWT_SECRET is not defined');
    }

    // Verify the token and type the decoded payload
    const decoded = jwt.verify(token, secretKey) as JwtPayload;

    // Attach userId to req object
    //@ts-ignore
    req.userId = decoded.userId;

    next();
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      return res.status(401).json({ message: "Token expired" });
    } else if (err instanceof JsonWebTokenError) {
      return res.status(403).json({ message: "Invalid token" });
    } else {
      console.error("JWT Error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
});

export const authMiddleware = route;
