import { Router } from "express";
import { db } from "../db";

export const routerDefects = Router();

// Registrar defecto
routerDefects.post("/", async (req, res) => {
  try {
    const { project_id, artifact_id, title, description, severity } = req.body;

    if (!project_id || !artifact_id || !title) {
      return res.status(400).json({ message: "project_id, artifact_id y title son obligatorios" });
    }

    const [result]: any = await db.query(
      `
      INSERT INTO defectos (project_id, artifact_id, title, description, severity)
      VALUES (?, ?, ?, ?, ?)
      `,
      [project_id, artifact_id, title, description || "", severity || "low"]
    );

    res.json({ message: "Defecto registrado", id: result.insertId });

  } catch (err) {
    console.error("Error registrando defecto:", err);
    res.status(500).json({ message: "Error del servidor" });
  }
});

// Obtener defectos por artefacto
routerDefects.get("/artifact/:artifact_id", async (req, res) => {
  try {
    const { artifact_id } = req.params;

    const [rows]: any = await db.query(
      `SELECT * FROM defectos WHERE artifact_id = ? ORDER BY created_at DESC`,
      [artifact_id]
    );

    res.json(rows);

  } catch (err) {
    console.error("Error obteniendo defectos:", err);
    res.status(500).json({ message: "Error del servidor" });
  }
});

// Obtener defectos por proyecto
routerDefects.get("/project/:project_id", async (req, res) => {
  try {
    const { project_id } = req.params;

    const [rows]: any = await db.query(
      `SELECT * FROM defectos WHERE project_id = ? ORDER BY created_at DESC`,
      [project_id]
    );

    res.json(rows);

  } catch (err) {
    console.error("Error obteniendo defectos:", err);
    res.status(500).json({ message: "Error del servidor" });
  }
});
