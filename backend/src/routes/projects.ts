import { Router } from "express";
import { db } from "../db";
import { verifyToken } from "../middleware/auth";

export const routerProjects = Router();

/* ================================
   📌  Crear Proyecto
================================ */
routerProjects.post("/create", verifyToken, async (req: any, res) => {
  const { name } = req.body;
  const owner = req.user.id;

  await db.query("INSERT INTO projects (name, owner) VALUES (?, ?)", [
    name,
    owner,
  ]);

  res.json({ message: "Proyecto creado correctamente" });
});

/* ================================
   📌  Listar proyectos del usuario
================================ */
routerProjects.get("/list", verifyToken, async (req: any, res) => {
  const owner = req.user.id;

  const [rows]: any = await db.query(
    "SELECT * FROM projects WHERE owner = ?",
    [owner]
  );

  res.json(rows);
});

/* ================================
   📌  Obtener información de un proyecto
================================ */
routerProjects.get("/:id", verifyToken, async (req: any, res) => {
  const { id } = req.params;
  const owner = req.user.id;

  const [rows]: any = await db.query(
    "SELECT * FROM projects WHERE id = ? AND owner = ?",
    [id, owner]
  );

  if (rows.length === 0) {
    return res.status(404).json({ message: "Proyecto no encontrado" });
  }

  res.json(rows[0]);
});

/* ================================
   📌  Listar EPICS del proyecto
================================ */
routerProjects.get("/:id/epics", verifyToken, async (req: any, res) => {
  const { id } = req.params;

  const [rows]: any = await db.query(
    "SELECT * FROM epics WHERE project_id = ?",
    [id]
  );

  res.json(rows);
});

/* ================================
   📌  Crear EPIC dentro del proyecto
================================ */
routerProjects.post("/:id/epics/create", verifyToken, async (req: any, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  await db.query(
    "INSERT INTO epics (project_id, title, description) VALUES (?, ?, ?)",
    [id, title, description]
  );

  res.json({ message: "Epic creado correctamente" });
});
