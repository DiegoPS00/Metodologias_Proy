import { useEffect, useState } from "react";
import { api } from "../api/axios";
import { confirmAction, alertSuccess, alertError } from "../utils/alerts";

interface Project {
  id: number;
  name: string;
  archived: number;
}

export default function ArchivedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);

  async function load() {
    api.get("/projects/archived/list").then((res) => {
      setProjects(res.data);
    });
  }

  async function restore(id: number) {
    const conf = await confirmAction("¿Restaurar este proyecto?");
    if (!conf.isConfirmed) return;

    try {
      await api.patch(`/projects/${id}/restore`);
      alertSuccess("Proyecto restaurado");
      load();
    } catch {
      alertError("No se pudo restaurar");
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <style>{`
        .arch-bg {
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: radial-gradient(circle at 50% 20%, #1b0033 0%, #000 80%);
        }

        .arch-card {
          width: 550px;
          padding: 40px;
          background: rgba(10,10,10,0.75);
          border-radius: 18px;
          backdrop-filter: blur(20px);
          border: 1px solid #333;
          box-shadow: 0 0 20px #792bff55;
        }

        .arch-item {
          background: #161616;
          border: 1px solid #333;
          padding: 15px;
          margin-bottom: 12px;
          border-radius: 12px;
          color: #cfc3ff;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .restore-btn {
          border: none;
          background: #2c2266;
          color: #d5b6ff;
          padding: 8px 12px;
          border-radius: 8px;
          cursor: pointer;
          transition: .25s;
        }

        .restore-btn:hover {
          background: #3a2a88;
          transform: scale(1.05);
        }

        .back-btn {
          width: 100%;
          padding: 12px;
          margin-top: 15px;
          border-radius: 10px;
          background: #111;
          color: #d5b6ff;
          border: 1px solid #333;
          cursor: pointer;
          transition: .25s;
        }

        .back-btn:hover {
          background: #1c1c1c;
          border-color: #944dff;
        }
      `}</style>

      <div className="arch-bg">
        <div className="arch-card">
          <h2 style={{ textAlign: "center", color: "#e3d1ff" }}>
            📁 Proyectos Archivados
          </h2>

          <ul style={{ listStyle: "none", padding: 0 }}>
            {projects.length === 0 && (
              <p style={{ textAlign: "center", marginTop: "20px", color: "#b893ff" }}>
                No hay proyectos archivados.
              </p>
            )}

            {projects.map((p) => (
              <li key={p.id} className="arch-item">
                <span>🗄 {p.name}</span>

                <button
                  className="restore-btn"
                  onClick={() => restore(p.id)}
                >
                  🗘 Restaurar
                </button>
              </li>
            ))}
          </ul>

          <button
            className="back-btn"
            onClick={() => (window.location.href = "/projects")}
          >
            ← Regresar a proyectos
          </button>
          
        </div>
      </div>
    </>
  );
}
