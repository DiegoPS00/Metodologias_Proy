import { Router } from "express";
import { db } from "../db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const routerAuth = Router();

routerAuth.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Buscar usuario en DB
  const [rows]: any = await db.query(
    "SELECT * FROM usuarios WHERE username = ?",
    [username]
  );

  if (rows.length === 0) {
    return res.status(403).json({ message: "Usuario no encontrado" });
  }

  const validPass = await bcrypt.compare(password, rows[0].password_hash);
  if (!validPass) {
    return res.status(403).json({ message: "Contraseña incorrecta" });
  }

  const token = jwt.sign(
    {
      id: rows[0].id,
      username: rows[0].username,
    },
    "SECRET123",
    { expiresIn: "8h" }
  );

  return res.json({
    message: "Login exitoso",
    token,
  });
});
