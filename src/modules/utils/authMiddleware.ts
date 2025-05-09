import { Request,Response,NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthPayload{
    userId:number,
    role:string
}
declare global {
    namespace Express {
      interface Request {
        user?: AuthPayload;
      }
    }
  }
  
export function authMiddleware(req:Request,res:Response, next:NextFunction){
const authHeader = req.headers["authorization"];
if (!authHeader) {
    return res.status(401).json({ message: "unauthorized request" });
}

const token = authHeader.split(" ")[1];
if (!token) {
    return res.status(401).json({ message: "Token missing in Authorization header" });
}
try {
    if (!process.env.JWT_SECRET) {
        return res.status(500).json({ message: "JWT_SECRET is not defined in environment variables" });
    }
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodeToken;
    next();
} catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
}
}