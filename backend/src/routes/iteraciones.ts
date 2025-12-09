import { Router } from "express";
import { db } from "../db";
import { verifyToken } from "../middleware/auth";

export const routerIteraciones = Router();

/* ────────────────────────────────────────────────
   HU-015 — CREAR ITERACIÓN
────────────────────────────────────────────────── */
routerIteraciones.post("/projects/:id/iteraciones", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { nombre, objetivo, fecha_inicio, fecha_fin } = req.body;

  await db.query(
    `INSERT INTO iteraciones (project_id, nombre, objetivo, fecha_inicio, fecha_fin)
     VALUES (?, ?, ?, ?, ?)`,
    [id, nombre, objetivo, fecha_inicio, fecha_fin]
  );

  res.json({ message: "Iteración creada correctamente" });
});

/* ────────────────────────────────────────────────
   HU-016 — ACTUALIZAR CAPACIDAD Y VELOCIDAD
────────────────────────────────────────────────── */
routerIteraciones.patch("/iteraciones/:itId/capacidad", verifyToken, async (req, res) => {
  const { itId } = req.params;
  const { capacidad_planeada, capacidad_real, velocidad } = req.body;

  await db.query(
    `UPDATE iteraciones
     SET capacidad_planeada=?, capacidad_real=?, velocidad=?
     WHERE id = ?`,
    [capacidad_planeada, capacidad_real, velocidad, itId]
  );

  res.json({ message: "Capacidad y velocidad actualizadas" });
});

/* ────────────────────────────────────────────────
   HU-017 — REGISTRAR MICROTAREAS TÉCNICAS
────────────────────────────────────────────────── */
routerIteraciones.post("/iteraciones/:itId/micro", verifyToken, async (req, res) => {
  const { itId } = req.params;
  const { titulo, descripcion } = req.body;

  await db.query(
    `INSERT INTO iteracion_microtasks (iteracion_id, titulo, descripcion)
     VALUES (?, ?, ?)`,
    [itId, titulo, descripcion]
  );

  res.json({ message: "Microtarea técnica registrada" });
});

/* ────────────────────────────────────────────────
   OBTENER ITERACIONES DE UN PROYECTO
────────────────────────────────────────────────── */
routerIteraciones.get("/projects/:id/iteraciones", verifyToken, async (req, res) => {
  const { id } = req.params;

  const [rows] = await db.query(
    "SELECT * FROM iteraciones WHERE project_id = ? ORDER BY id DESC",
    [id]
  );

  res.json(rows);
});

/* ────────────────────────────────────────────────
   OBTENER DETALLE DE UNA ITERACIÓN
────────────────────────────────────────────────── */
routerIteraciones.get("/iteraciones/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [rows]: any = await db.query(
      `
      SELECT 
        id, 
        nombre, 
        objetivo, 
        estado,
        project_id
      FROM iteraciones
      WHERE id = ?
      `,
      [id]
    );

    if (rows.length === 0)
      return res.status(404).json({ message: "Iteración no encontrada" });

    return res.json(rows[0]);

  } catch (err) {
    console.error("Error obteniendo iteración:", err);
    return res.status(500).json({ message: "Error del servidor" });
  }
});

