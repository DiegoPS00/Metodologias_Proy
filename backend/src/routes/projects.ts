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
routerProjects.patch("/:id/archive", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    await db.query(
      "UPDATE projects SET archived = 1 WHERE id = ?",
      [id]
    );

    res.json({ message: "Proyecto archivado" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "No se pudo archivar el proyecto" });
  }
});
routerProjects.delete("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM artifacts WHERE project_id = ?", [id]);
    await db.query("DELETE FROM backlog WHERE project_id = ?", [id]);
    await db.query("DELETE FROM epics WHERE project_id = ?", [id]);
    await db.query("DELETE FROM projects WHERE id = ?", [id]);

    res.json({ message: "Proyecto eliminado definitivamente" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "No se pudo eliminar el proyecto" });
  }
});

// Obtener proyectos archivados
routerProjects.get("/archived/list", verifyToken, async (req, res) => {
  try {
    const [rows]: any = await db.query(
      "SELECT id, name, archived FROM projects WHERE archived = 1 ORDER BY id DESC"
    );

    res.json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error obteniendo proyectos archivados" });
  }
});
// Restaurar proyecto archivado
routerProjects.patch("/:id/restore", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    await db.query(
      "UPDATE projects SET archived = 0 WHERE id = ?",
      [id]
    );

    res.json({ message: "Proyecto restaurado" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "No se pudo restaurar el proyecto" });
  }
});
