import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  let token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Token requerido" });
  }

  // Si viene con Bearer, lo limpiamos
  if (token.startsWith("Bearer ")) {
    token = token.slice(7).trim(); // elimina "Bearer "
  }

  try {
    const decoded: any = jwt.verify(token, "SECRET123");
    (req as any).user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido" });
  }
}
