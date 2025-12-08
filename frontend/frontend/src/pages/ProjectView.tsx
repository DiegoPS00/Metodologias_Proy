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
        .pv-bg { width:100vw;height:100vh;display:flex;justify-content:center;align-items:center;background: radial-gradient(circle,#2d0052,#000);}
        .pv-card { width:650px;padding:40px;background:rgba(15,15,15,.75);border-radius:18px;border:1px solid #333;box-shadow:0 0 25px #7c2bff66;color:white;position:relative; }
        .top-bar { position:absolute;top:10px;left:10px;right:10px;display:flex;justify-content:space-between; }
        .icon-btn { width:42px;height:42px;background:#111;border:1px solid #333;border-radius:10px;color:#d5b6ff;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:.25s; }
        .icon-btn:hover { background:#1a1a1a;border-color:#8e37ff;transform:translateY(-2px); }
        .epic {padding:15px;background:#111;border-radius:12px;border:1px solid #333;margin-bottom:12px;cursor:pointer;transition:.25s;}
        .epic:hover {background:#1a1a1a;border-color:#8e37ff;transform:scale(1.03);}
      `}</style>

      <div className="pv-bg">
        <div className="pv-card">
          <div className="top-bar">
            <div className="icon-btn" onClick={() => history.back()}>
              ←
            </div>
            <div className="icon-btn" onClick={logout}>
              ⛔
            </div>
          </div>

          <h2 style={{ textAlign: "center", color: "#d5b6ff" }}>
            {project?.name}
          </h2>

          {epics.map((e: any) => (
            <div
              key={e.id}
              className="epic"
              onClick={() => (window.location.href = `/epics/${e.id}`)}
            >
              <strong style={{ color: "#d5b6ff" }}>📦 {e.title}</strong>
              <br />
              <span style={{ color: "#cfc3ff" }}>{e.description}</span>
            </div>
          ))}

          <button
            onClick={() =>
              (window.location.href = `/projects/${id}/epics/create`)
            }
            style={{
              marginTop: "20px",
              width: "100%",
              padding: "12px",
              background: "linear-gradient(90deg,#6a00ff,#9a47ff)",
              border: "none",
              borderRadius: "12px",
              color: "white",
              cursor: "pointer",
            }}
          >
            + Crear EPIC
          </button>
          <button
            className="epic"
            onClick={() => (window.location.href = `/projects/${id}/artifacts`)}
          >
            📚 Artefactos del Proyecto
          </button>
        </div>
      </div>
    </>
  );
}
