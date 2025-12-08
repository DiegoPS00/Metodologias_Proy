import { Router } from "express";
import { db } from "../db";
import { verifyToken } from "../middleware/auth";

export const routerEpics = Router();

/* ============================================
   GET — Lista de EPICS por proyecto
================================================ */
routerEpics.get("/projects/:id/epics", verifyToken, async (req, res) => {
  const { id } = req.params;
  const [rows]: any = await db.query(
    "SELECT * FROM epics WHERE project_id = ?",
    [id]
  );
  res.json(rows);
});
/* ============================================
   GET — Obtener EPIC por ID
=============================================== */
routerEpics.get("/epics/:epicId", verifyToken, async (req, res) => {
  const { epicId } = req.params;

  const [rows]: any = await db.query(
    "SELECT * FROM epics WHERE id = ?",
    [epicId]
  );

  if (rows.length === 0) {
    return res.status(404).json({ message: "EPIC no encontrada" });
  }

  res.json(rows[0]);
});


/* ============================================
   POST — Crear EPIC
================================================ */
routerEpics.post("/projects/:id/epics", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  await db.query(
    "INSERT INTO epics (project_id, title, description) VALUES (?, ?, ?)",
    [id, title, description]
  );

  res.json({ message: "EPIC creada correctamente" });
});

/* ============================================
   GET — Lista de historias dentro de una EPIC
================================================ */
routerEpics.get("/epics/:epicId/stories", verifyToken, async (req, res) => {
  const { epicId } = req.params;

  const [rows]: any = await db.query(
    "SELECT * FROM stories WHERE epic_id = ?",
    [epicId]
  );

  res.json(rows);
});

/* ============================================
   POST — Crear historia dentro de una EPIC
================================================ */
routerEpics.post("/epics/:epicId/stories", verifyToken, async (req, res) => {
  const { epicId } = req.params;
  const { title, description, points } = req.body;

  const code = "HU-" + Math.floor(Math.random() * 900 + 100); // HU-123

  await db.query(
    `INSERT INTO stories (epic_id, title, description, points, code)
     VALUES (?, ?, ?, ?, ?)`,
    [epicId, title, description, points, code]
  );

  res.json({ message: "Historia creada correctamente" });
});
