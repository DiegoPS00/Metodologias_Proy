import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Projects from "../pages/Projects";
import CreateProject from "../pages/CreateProject";
import ProjectView from "../pages/ProjectView";
import PhaseView from "../pages/PhaseView";
import StoryView from "../pages/StoryView";
import ArtifactsView from "../pages/ArtifactsView";
import Backlog from "../pages/backlog";
import ProjectPlan from "../pages/ProjectPlan";
// EPICS
import CreateEpic from "../pages/CreateEpic";
import EpicDetail from "../pages/EpicDetail"; // ✔ CORRECTO
import Iterations from "../pages/Iterations";
import IterationView from "../pages/IterationView";
import UnitTests from "../pages/UnitTests";
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route path="/" element={<Login />} />

        {/* REGISTER */}
        <Route path="/register" element={<Register />} />

        {/* DASHBOARD */}
        <Route path="/dashboard" element={<Dashboard />} />
<Route path="/tests" element={<UnitTests />} />
        {/* PROJECTS */}
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/create" element={<CreateProject />} />
        <Route path="/projects/:id" element={<ProjectView />} />
        <Route path="/projects/:id/backlog" element={<Backlog />} />
        {/* PHASES */}
        <Route path="/projects/:id/phases/:phaseId" element={<PhaseView />} />
<Route path="/projects/:id/plan" element={<ProjectPlan />} />
        {/* EPICS */}
        <Route path="/projects/:id/epics/create" element={<CreateEpic />} />
        <Route path="/epics/:epicId" element={<EpicDetail />} /> {/* ✔ */}
<Route path="/projects/:id/iteraciones" element={<Iterations />} />
<Route path="/iteraciones/:itId" element={<IterationView />} />
        {/* STORIES */}
        <Route path="/stories/:storyId" element={<StoryView />} />
        <Route path="/projects/:id/artifacts" element={<ArtifactsView />} />


      </Routes>
    </BrowserRouter>
  );
}
