import { Router } from "express";
import { db } from "../db";
import { verifyToken } from "../middleware/auth";

export const routerBacklog = Router();

/* ────────────────────────────────────────────────
   GET BACKLOG BY PROJECT
────────────────────────────────────────────────── */
routerBacklog.get("/projects/:id/backlog", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const [rows]: any = await db.query(
      "SELECT * FROM backlog WHERE project_id = ? ORDER BY created_at DESC",
      [id]
    );

    res.json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error al obtener backlog" });
  }
});

/* ────────────────────────────────────────────────
   CREATE BACKLOG ITEM
────────────────────────────────────────────────── */
routerBacklog.post("/projects/:id/backlog", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { title, description, priority } = req.body;

  if (!title)
    return res.status(400).json({ message: "El título es obligatorio" });

  try {
    await db.query(
      `INSERT INTO backlog (project_id, title, description, priority)
       VALUES (?, ?, ?, ?)`,
      [id, title, description, priority || "Medium"]
    );

    res.json({ message: "Item agregado al backlog" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error al agregar al backlog" });
  }
});

/* ────────────────────────────────────────────────
   UPDATE STATUS OF BACKLOG ITEM
────────────────────────────────────────────────── */
routerBacklog.patch("/backlog/:itemId", verifyToken, async (req, res) => {
  const { itemId } = req.params;
  const { status } = req.body;

  if (!status)
    return res.status(400).json({ message: "Estado requerido" });

  try {
    await db.query(
      "UPDATE backlog SET status = ? WHERE id = ?",
      [status, itemId]
    );

    res.json({ message: "Estado actualizado" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error al actualizar estado" });
  }
});

export default routerBacklog;
