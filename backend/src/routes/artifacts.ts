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

/* ────────────────────────────────────────────────
   CREATE ARTIFACT
────────────────────────────────────────────────── */
routerArtifacts.post("/projects/:id/artifacts", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { title, description, phase_name } = req.body;

  if (!title || !phase_name) {
    return res.status(400).json({ message: "Faltan datos obligatorios" });
  }

  await db.query(
    "INSERT INTO artifacts (project_id, phase_name, title, description) VALUES (?, ?, ?, ?)",
    [id, phase_name, title, description]
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
