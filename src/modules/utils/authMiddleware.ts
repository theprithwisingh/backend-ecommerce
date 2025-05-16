import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

interface AuthPayload {
  userId: number;
}


declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}


export const authMiddleware: RequestHandler = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    res.status(401).json({ message: "Unauthorized request" });
    return;
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Token missing in Authorization header" });
    return;
  }

  try {
    if (!process.env.JWT_SECRET) {
       res.status(500).json({ message: "JWT_SECRET is not defined" });
       return;
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as AuthPayload;
    console.log("Authenticated userId:", decodedToken.userId);
    req.user = { userId: decodedToken.userId };
    next();
  } catch (error) { 
    res.status(403).json({ message: "Invalid or expired token" });
    return ;
  }
};
