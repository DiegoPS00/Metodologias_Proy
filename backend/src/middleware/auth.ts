import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["authorization"];

  if (!token) return res.status(401).json({ message: "Token requerido" });

  try {
    const decoded: any = jwt.verify(token, "SECRET123");
    (req as any).user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Token inválido" });
  }
}
