import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Projects from "../pages/Projects";
import CreateProject from "../pages/CreateProject";
import ProjectView from "../pages/ProjectView";
import PhaseView from "../pages/PhaseView";
import StoryView from "../pages/StoryView";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* LOGIN */}
        <Route path="/" element={<Login />} />

        {/* DASHBOARD */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* PROJECTS */}
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/create" element={<CreateProject />} />

        {/* NEW ROUTES (NECESSARY) */}
        <Route path="/projects/:id" element={<ProjectView />} />
        <Route path="/projects/:id/phases/:phaseId" element={<PhaseView />} />
        <Route path="/stories/:storyId" element={<StoryView />} />
      </Routes>
    </BrowserRouter>
  );
}
