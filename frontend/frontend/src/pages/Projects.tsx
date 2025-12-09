import { useEffect, useState } from "react";
import { api } from "../api/axios";
import { confirmAction, alertSuccess, alertError } from "../utils/alerts";

interface Project {
  id: number;
  name: string;
  archived: number;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  async function load() {
    api.get("/projects/list").then((res) => {
      // Solo mostrar proyectos NO archivados
      setProjects(res.data.filter((p: Project) => p.archived === 0));
    });
  }

  useEffect(() => {
    load();
  }, []);

  async function logout() {
    const conf = await confirmAction("¿Deseas cerrar sesión?");
    if (!conf.isConfirmed) return;

    localStorage.removeItem("token");
    alertSuccess("Sesión cerrada");
    window.location.href = "/";
  }

  async function archiveProject(id: number) {
    const conf = await confirmAction("¿Archivar este proyecto?");
    if (!conf.isConfirmed) return;

    try {
      await api.patch(`/projects/${id}/archive`);
      alertSuccess("Proyecto archivado");
      load();
    } catch {
      alertError("No se pudo archivar");
    }
  }

  async function deleteProject(id: number) {
    const conf = await confirmAction("¿Eliminar definitivamente este proyecto? Esta acción NO se puede deshacer.");
    if (!conf.isConfirmed) return;

    try {
      await api.delete(`/projects/${id}`);
      alertSuccess("Proyecto eliminado");
      load();
    } catch {
      alertError("No se pudo eliminar el proyecto");
    }
  }

  return (
    <>
      <style>{`
        .pr-bg {
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: radial-gradient(circle at 50% 20%, #2d0052 0%, #000 70%);
        }

        .pr-card {
          width: 520px;
          padding: 40px;
          background: rgba(15,15,15,0.75);
          border-radius: 18px;
          backdrop-filter: blur(20px);
          border: 1px solid #333;
          box-shadow: 0 0 25px #7c2bff66;
          position: relative;
        }

        .top-bar {
          position: absolute;
          top: 10px;
          left: 10px;
          right: 10px;
          display: flex;
          justify-content: space-between;
        }

        .icon-btn {
          width: 42px;
          height: 42px;
          background: #111;
          border: 1px solid #333;
          border-radius: 10px;
          font-size: 20px;
          color: #d5b6ff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: .25s;
        }

        .icon-btn:hover {
          background: #1a1a1a;
          border-color: #8e37ff;
          transform: translateY(-2px);
        }

        .pr-item {
          background: #111;
          border: 1px solid #333;
          padding: 15px;
          margin-bottom: 12px;
          color: #e4d2ff;
          border-radius: 12px;
          cursor: pointer;
          transition: .25s ease;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .pr-item:hover {
          background: #1a1a1a;
          border-color: #8e37ff;
          transform: scale(1.03);
          box-shadow: 0 0 12px #8e37ff55;
        }

        .actions {
          display: flex;
          gap: 12px;
        }

        .action-btn {
          background: transparent;
          border: none;
          font-size: 20px;
          cursor: pointer;
          transition: .2s;
        }

        .archive-btn {
          color: #ffdd55;
        }

        .archive-btn:hover {
          color: #ffcc00;
          transform: scale(1.2);
        }

        .delete-btn {
          color: #ff5e5e;
        }

        .delete-btn:hover {
          color: #ff1f1f;
          transform: scale(1.2);
        }

      `}</style>

      <div className="pr-bg">
        <div className="pr-card">

          {/* ICONOS */}
          <div className="top-bar">
            <div
              className="icon-btn"
              onClick={() => (window.location.href = "/dashboard")}
            >
              ←
            </div>

            <div
              className="icon-btn"
              onClick={() => (window.location.href = "/projects/create")}
            >
              +
            </div>
<div
  className="icon-btn"
  onClick={() => (window.location.href = "/projects/archived")}
>
  🗄
</div>

            <div className="icon-btn" onClick={logout}>⛔</div>
          </div>

          <h2 style={{ textAlign: "center", color: "#d5b6ff" }}>
            Mis Proyectos
          </h2>

          <ul style={{ listStyle: "none", padding: 0 }}>
  {projects.map((p) => (
    <li
      key={p.id}
      className="pr-item"
      onClick={() => (window.location.href = `/projects/${p.id}`)}
    >
      {/* TEXTO DEL PROYECTO */}
      <div>
        📁 {p.name}
      </div>

      {/* BOTONES */}
      <div className="actions">
        <button
          className="action-btn archive-btn"
          onClick={(e) => {
            e.stopPropagation(); // ← MUY IMPORTANTE
            archiveProject(p.id);
          }}
        >
          🗄
        </button>

        <button
          className="action-btn delete-btn"
          onClick={(e) => {
            e.stopPropagation(); // ← MUY IMPORTANTE
            deleteProject(p.id);
          }}
        >
          🗑
        </button>
      </div>
    </li>
  ))}
</ul>


        </div>
      </div>
    </>
  );
}
