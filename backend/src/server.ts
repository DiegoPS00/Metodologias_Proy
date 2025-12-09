import express from "express";
import cors from "cors";
import { routerAuth } from "./routes/auth";
import { routerProjects } from "./routes/projects";
import { routerEpics } from "./routes/epics";
import { routerArtifacts } from "./routes/artifacts";
import routerBacklog from "./routes/backlog";
import { routerPlan } from "./routes/plan";
import { routerIteraciones } from "./routes/iteraciones";
import { routerTests } from "./routes/tests";
const app = express();
app.use(cors());
app.use(express.json());

app.use("/projects", routerProjects);
app.use("/auth", routerAuth);
app.use(routerEpics);
app.use(routerArtifacts);
app.use(routerBacklog);
app.use(routerPlan);
app.use(routerIteraciones);
app.use("/", routerTests);
app.listen(3001, () => {
  console.log("🔥 Backend escuchando en http://localhost:3001");
});
