import { Router } from "express";
import { db } from "../db";
import { verifyToken } from "../middleware/auth";

export const routerPlan = Router();

/* ────────────────────────────────────────────────
   HU-003 — CREAR / ACTUALIZAR PLAN DEL PROYECTO
────────────────────────────────────────────────── */
routerPlan.post("/projects/:id/plan", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { objetivo, alcance, riesgos, cronograma } = req.body;

  try {
    await db.query(
      `
      INSERT INTO plan_proyecto (project_id, objetivo, alcance, riesgos, cronograma)
      VALUES (?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE 
        objetivo = VALUES(objetivo),
        alcance = VALUES(alcance),
        riesgos = VALUES(riesgos),
        cronograma = VALUES(cronograma)
      `,
      [id, objetivo, alcance, riesgos, cronograma]
    );

    res.json({ message: "Plan del proyecto guardado correctamente" });
  } catch (err) {
    console.log("Error al guardar plan:", err);
    res.status(500).json({ message: "No se pudo guardar el plan" });
  }
});

/* ────────────────────────────────────────────────
   HU-004 — ACTUALIZAR AVANCE Y NOTAS DE SEGUIMIENTO
────────────────────────────────────────────────── */
routerPlan.patch("/projects/:id/plan/avance", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { avance, notas_seguimiento } = req.body;

  try {
    await db.query(
      `
      UPDATE plan_proyecto
      SET avance = ?, notas_seguimiento = ?
      WHERE project_id = ?
      `,
      [avance, notas_seguimiento, id]
    );

    res.json({ message: "Avance actualizado correctamente" });
  } catch (err) {
    console.log("Error actualizando avance:", err);
    res.status(500).json({ message: "No se pudo actualizar el avance" });
  }
});

/* ────────────────────────────────────────────────
   HU-005 — REGISTRAR MICROINCREMENTOS
────────────────────────────────────────────────── */
routerPlan.post(
  "/projects/:id/microincrementos",
  verifyToken,
  async (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion } = req.body;

    if (!titulo) {
      return res.status(400).json({ message: "El título es obligatorio" });
    }

    try {
      await db.query(
        `
        INSERT INTO microincrementos (project_id, titulo, descripcion)
        VALUES (?, ?, ?)
        `,
        [id, titulo, descripcion]
      );

      res.json({ message: "Microincremento registrado correctamente" });
    } catch (err) {
      console.log("Error registrando microincremento:", err);
      res.status(500).json({ message: "No se pudo registrar el microincremento" });
    }
  }
);

/* ────────────────────────────────────────────────
   OBTENER PLAN + MICROINCREMENTOS DEL PROYECTO
────────────────────────────────────────────────── */
routerPlan.get("/projects/:id/plan", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const [[plan]]: any = await db.query(
      "SELECT * FROM plan_proyecto WHERE project_id = ?",
      [id]
    );

    const [micro]: any = await db.query(
      `
      SELECT * 
      FROM microincrementos
      WHERE project_id = ?
      ORDER BY fecha DESC
      `,
      [id]
    );

    res.json({ plan, micro });
  } catch (err) {
    console.log("Error obteniendo plan:", err);
    res.status(500).json({ message: "No se pudo obtener el plan" });
  }
});
