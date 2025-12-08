import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Projects from "../pages/Projects";
import CreateProject from "../pages/CreateProject";
import ProjectView from "../pages/ProjectView";
import PhaseView from "../pages/PhaseView";
import StoryView from "../pages/StoryView";

// EPICS
import CreateEpic from "../pages/CreateEpic";
import EpicDetail from "../pages/EpicDetail"; // ✔ CORRECTO

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

        {/* PROJECTS */}
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/create" element={<CreateProject />} />
        <Route path="/projects/:id" element={<ProjectView />} />

        {/* PHASES */}
        <Route path="/projects/:id/phases/:phaseId" element={<PhaseView />} />

        {/* EPICS */}
        <Route path="/projects/:id/epics/create" element={<CreateEpic />} />
        <Route path="/epics/:epicId" element={<EpicDetail />} /> {/* ✔ */}

        {/* STORIES */}
        <Route path="/stories/:storyId" element={<StoryView />} />

      </Routes>
    </BrowserRouter>
  );
}
