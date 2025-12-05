import { Router } from "express";
import { db } from "../db";
import { verifyToken } from "../middleware/auth";

export const routerProjects = Router();

// CREATE PROJECT
routerProjects.post("/create", verifyToken, async (req: any, res) => {
  const { name } = req.body;
  const owner = req.user.id;

  await db.query("INSERT INTO projects (name, owner) VALUES (?, ?)", [
    name,
    owner,
  ]);

  res.json({ message: "Proyecto creado correctamente" });
});
routerProjects.get("/list", verifyToken, async (req: any, res) => {
  const owner = req.user.id;

  const [rows]: any = await db.query("SELECT * FROM projects WHERE owner = ?", [
    owner,
  ]);

  res.json(rows);
});
