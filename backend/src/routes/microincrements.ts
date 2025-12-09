import { Router } from "express";
import { db } from "../db";

export const routerMicro = Router();


// ===============================
// 📌  CREAR MICROINCREMENTO
// ===============================
routerMicro.post("/", async (req, res) => {
  try {
    const { project_id, iteration_id, title, description, progress } = req.body;

    if (!project_id || !title) {
      return res.status(400).json({
        message: "project_id y title son obligatorios"
      });
    }

    const [result]: any = await db.query(
      `
      INSERT INTO microincrements (project_id, iteration_id, title, description, progress)
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        project_id,
        iteration_id || null,
        title,
        description || "",
        progress || 0
      ]
    );

    return res.json({
      message: "Microincremento registrado correctamente",
      id: result.insertId
    });

  } catch (err) {
    console.error("Error creando microincremento:", err);
    return res.status(500).json({ message: "Error del servidor" });
  }
});


// ===============================
// 📌  OBTENER MICROINCREMENTOS POR PROYECTO
// ===============================
routerMicro.get("/:project_id", async (req, res) => {
  try {
    const { project_id } = req.params;

    const [rows]: any = await db.query(
      `
      SELECT *
      FROM microincrements
      WHERE project_id = ?
      ORDER BY created_at DESC
      `,
      [project_id]
    );

    return res.json(rows);

  } catch (err) {
    console.error("Error obteniendo microincrementos:", err);
    return res.status(500).json({ message: "Error del servidor" });
  }
});


// ===============================
// 📌  ACTUALIZAR PROGRESO
// ===============================
routerMicro.put("/:id/progress", async (req, res) => {
  try {
    const { id } = req.params;
    const { progress } = req.body;

    if (progress < 0 || progress > 100) {
      return res.status(400).json({
        message: "El progreso debe estar entre 0 y 100"
      });
    }

    await db.query(
      `UPDATE microincrements SET progress = ? WHERE id = ?`,
      [progress, id]
    );

    return res.json({ message: "Progreso actualizado correctamente" });

  } catch (err) {
    console.error("Error actualizando progreso:", err);
    return res.status(500).json({ message: "Error del servidor" });
  }
});
// Obtener microincrementos por iteración
routerMicro.get("/iteration/:iteration_id", async (req, res) => {
  try {
    const { iteration_id } = req.params;

    const [rows]: any = await db.query(
      `
      SELECT *
      FROM microincrements
      WHERE iteration_id = ?
      ORDER BY created_at DESC
      `,
      [iteration_id]
    );

    return res.json(rows);
  } catch (err) {
    console.error("Error obteniendo microincrementos por iteración:", err);
    return res.status(500).json({ message: "Error del servidor" });
  }
});
