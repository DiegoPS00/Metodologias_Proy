import { Router } from "express";
import { db } from "../db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const routerAuth = Router();


// ===============================
// 📌  REGISTER
// ===============================
routerAuth.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({ message: "Faltan datos" });

    // Revisar si ya existe
    const [rows]: any = await db.query(
      "SELECT id FROM usuarios WHERE username = ?",
      [username]
    );

    if (rows.length > 0)
      return res.status(400).json({ message: "El usuario ya existe" });

    // Hash
    const hashed = await bcrypt.hash(password, 10);

    // Insert
    await db.query(
      "INSERT INTO usuarios (username, password_hash) VALUES (?, ?)",
      [username, hashed]
    );

    return res.json({ message: "Usuario registrado correctamente" });

  } catch (err) {
    console.error("Error en register:", err);
    return res.status(500).json({ message: "Error del servidor" });
  }
});


// ===============================
// 📌  LOGIN
// ===============================
routerAuth.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Buscar usuario
  const [rows]: any = await db.query(
    "SELECT * FROM usuarios WHERE username = ?",
    [username]
  );

  if (rows.length === 0) {
    return res.status(403).json({ message: "Usuario no encontrado" });
  }

  const user = rows[0];

  const validPass = await bcrypt.compare(password, user.password_hash);

  if (!validPass) {
    return res.status(403).json({ message: "Contraseña incorrecta" });
  }

  // Crear token
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    "SECRET123",
    { expiresIn: "8h" }
  );

  return res.json({
    message: "Login exitoso",
    token,
  });
});
