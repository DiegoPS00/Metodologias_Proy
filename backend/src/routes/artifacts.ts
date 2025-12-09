import { Router } from "express";
import { db } from "../db";
import { verifyToken } from "../middleware/auth";

export const routerArtifacts = Router();

/* ────────────────────────────────────────────────
   GET ARTIFACTS BY PROJECT (ALL PHASES)
────────────────────────────────────────────────── */
routerArtifacts.get("/projects/:id/artifacts", verifyToken, async (req, res) => {
  const { id } = req.params;

  const [rows]: any = await db.query(
    "SELECT * FROM artifacts WHERE project_id = ? ORDER BY created_at DESC",
    [id]
  );

  res.json(rows);
});

/* ────────────────────────────────────────────────
   GET ARTIFACTS BY PROJECT + PHASE
────────────────────────────────────────────────── */
routerArtifacts.get("/artifacts/:id/defects/count", async (req, res) => {
  try {
    const { id } = req.params;

    const [rows]: any = await db.query(
      "SELECT COUNT(*) AS total FROM defects WHERE artifact_id = ?",
      [id]
    );

    return res.json(rows[0]);

  } catch (err) {
    console.error("Error contando defectos:", err);
    return res.status(500).json({ message: "Error del servidor" });
  }
});

routerArtifacts.get(
  "/projects/:id/artifacts/:phase",
  verifyToken,
  async (req, res) => {
    const { id, phase } = req.params;

    const [rows]: any = await db.query(
      "SELECT * FROM artifacts WHERE project_id = ? AND phase_name = ? ORDER BY created_at DESC",
      [id, phase]
    );

    res.json(rows);
  }
);
// Obtener un artefacto por ID
routerArtifacts.get("/artifacts/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [rows]: any = await db.query(
      "SELECT * FROM artifacts WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Artifact not found" });
    }

    return res.json(rows[0]);

  } catch (err) {
    console.error("Error obteniendo artifact:", err);
    return res.status(500).json({ message: "Error del servidor" });
  }
});

/* ────────────────────────────────────────────────
   CREATE ARTIFACT
────────────────────────────────────────────────── */
routerArtifacts.post("/projects/:id/artifacts", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { title, description, phase_name, change_notes, version } = req.body;

  if (!title || !phase_name) {
    return res.status(400).json({ message: "Faltan datos obligatorios" });
  }

  // Validación nueva: no permitir versión menor a la actual (si existe artifact con mismo nombre)
  const [[existing]]: any = await db.query(
    "SELECT version FROM artifacts WHERE project_id = ? AND title = ? AND phase_name = ?",
    [id, title, phase_name]
  );

  if (existing && version < existing.version) {
    return res.status(400).json({
      message: `La versión no puede ser menor a la actual (${existing.version}).`
    });
  }

  await db.query(
    `INSERT INTO artifacts 
       (project_id, phase_name, title, description, change_note, version)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [id, phase_name, title, description, change_notes, version]
  );

  res.json({ message: "Artefacto agregado correctamente" });
});


/* ────────────────────────────────────────────────
   DELETE ARTIFACT
────────────────────────────────────────────────── */
routerArtifacts.delete("/artifacts/:artifactId", verifyToken, async (req, res) => {
  const { artifactId } = req.params;

  await db.query("DELETE FROM artifacts WHERE id = ?", [artifactId]);

  res.json({ message: "Artefacto eliminado" });
});
