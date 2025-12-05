import express from "express";
import cors from "cors";
import { routerAuth } from "./routes/auth";
import { routerProjects } from "./routes/projects";
const app = express();
app.use(cors());
app.use(express.json());

app.use("/projects", routerProjects);
app.use("/auth", routerAuth);

app.listen(3001, () => {
  console.log("🔥 Backend escuchando en http://localhost:3001");
});
