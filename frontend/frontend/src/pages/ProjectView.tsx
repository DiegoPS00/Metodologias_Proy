import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api/axios";
import { confirmAction } from "../utils/alerts";

export default function ProjectView() {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [epics, setEpics] = useState([]);

  useEffect(() => {
    api.get(`/projects/${id}`).then((res) => setProject(res.data));
    api.get(`/projects/${id}/epics`).then((res) => setEpics(res.data));
  }, [id]);

  async function logout() {
    const conf = await confirmAction("¿Deseas cerrar sesión?");
    if (!conf.isConfirmed) return;
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  return (
    <>
      <style>{`
        .pv-bg {
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: radial-gradient(circle at 50% 0%, #3a0066 0%, #000 70%);
        }

        .pv-card {
          width: 700px;
          padding: 45px;
          background: rgba(20, 20, 20, 0.75);
          border-radius: 20px;
          border: 1px solid #2a2a2a;
          box-shadow: 0 0 40px #7c2bff33;
          color: white;
          position: relative;
          backdrop-filter: blur(12px);
          animation: fadeIn .4s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
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
          background: #141414;
          border: 1px solid #333;
          border-radius: 12px;
          color: #d5b6ff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: .25s;
        }

        .icon-btn:hover {
          background: #1f1f1f;
          border-color: #944dff;
          transform: translateY(-3px);
          box-shadow: 0 0 12px #944dff55;
        }

        .epic {
          padding: 16px 18px;
          background: #151515;
          border-radius: 14px;
          border: 1px solid #2e2e2e;
          margin-bottom: 14px;
          cursor: pointer;
          transition: .25s;
        }

        .epic:hover {
          background: #1e1e1e;
          border-color: #a55cff;
          transform: scale(1.03);
          box-shadow: 0 0 18px #944dff33;
        }

        .create-btn {
          margin-top: 18px;
          width: 100%;
          padding: 14px;
          background: linear-gradient(90deg, #7b2fff, #b46aff);
          border: none;
          border-radius: 14px;
          color: white;
          font-size: 17px;
          font-weight: 600;
          cursor: pointer;
          transition: .25s;
        }

        .create-btn:hover {
          opacity: .9;
          transform: translateY(-3px);
          box-shadow: 0 0 18px #a55cff55;
        }

        .secondary-btn {
          margin-top: 12px;
          width: 100%;
          padding: 14px;
          background: #191919;
          border: 1px solid #333;
          border-radius: 14px;
          color: #d5b6ff;
          font-size: 16px;
          cursor: pointer;
          transition: .25s;
        }

        .secondary-btn:hover {
          background: #222;
          border-color: #a55cff;
          transform: translateY(-3px);
          box-shadow: 0 0 14px #944dff44;
        }
      `}</style>

      <div className="pv-bg">
        <div className="pv-card">
          {/* TOP BAR */}
          <div className="top-bar">
            <div className="icon-btn" onClick={() => history.back()}>
              ←
            </div>
            <div className="icon-btn" onClick={logout}>
              ⛔
            </div>
          </div>

          {/* TITLE */}
          <h2 style={{ textAlign: "center", color: "#e1c9ff", marginBottom: "25px" }}>
            {project?.name}
          </h2>

          {/* EPICS LIST */}
          {epics.map((e: any) => (
            <div
              key={e.id}
              className="epic"
              onClick={() => (window.location.href = `/epics/${e.id}`)}
            >
              <strong style={{ color: "#d5b6ff", fontSize: "17px" }}>
                📦 {e.title}
              </strong>
              <br />
              <span style={{ color: "#cfc3ff", fontSize: "14px" }}>{e.description}</span>
            </div>
          ))}

          {/* CREATE EPIC BUTTON */}
          <button
            className="create-btn"
            onClick={() => (window.location.href = `/projects/${id}/epics/create`)}
          >
            + Crear EPIC
          </button>

          {/* SECONDARY BUTTON */}
          <button
            className="secondary-btn"
            onClick={() => (window.location.href = `/projects/${id}/artifacts`)}
          >
            📚 Artefactos del Proyecto
          </button>
        </div>
      </div>
    </>
  );
}
