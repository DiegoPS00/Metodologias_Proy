import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api/axios";

export default function ProjectView() {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [phases, setPhases] = useState([]);

  useEffect(() => {
    api.get(`/projects/${id}`).then(res => {
      console.log("PROJECT DATA:", res.data);

      // si el backend devuelve { project: {...} }
      if (res.data.project) {
        setProject(res.data.project);
      } else {
        // si devuelve directamente {id, name, ...}
        setProject(res.data);
      }
    });

    api.get(`/projects/${id}/phases`).then(res => setPhases(res.data));
  }, [id]);

  function logout() {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  return (
    <>
      <style>{`
        .pv-bg { width:100vw; height:100vh; display:flex; justify-content:center; align-items:center; background: radial-gradient(circle,#2d0052,#000); }
        .pv-card { width:580px; padding:40px; background:rgba(15,15,15,0.75); border-radius:18px; border:1px solid #333; box-shadow:0 0 25px #7c2bff66; position:relative; color:#fff; }
        .top-bar { position:absolute; top:10px; left:10px; right:10px; display:flex; justify-content:space-between; }
        .icon-btn { width:42px;height:42px;background:#111;border:1px solid #333;border-radius:10px;color:#d5b6ff;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:.25s; }
        .icon-btn:hover { background:#1a1a1a; border-color:#8e37ff; transform:translateY(-2px); }
        .phase { padding:15px; border:1px solid #333; background:#111; border-radius:12px; margin-bottom:12px; cursor:pointer; transition:.25s; }
        .phase:hover { background:#1a1a1a; border-color:#8e37ff; transform:scale(1.03); }
      `}</style>

      <div className="pv-bg">
        <div className="pv-card">

          <div className="top-bar">
            <div className="icon-btn" onClick={() => history.back()}>←</div>
            <div className="icon-btn" onClick={logout}>⛔</div>
          </div>

          <h2 style={{ textAlign:"center", color:"#d5b6ff" }}>
            {project ? (project.name ?? project.project?.name ?? "Sin nombre") : "Cargando..."}
          </h2>

          {phases.map((p:any) => (
            <div
              className="phase"
              key={p.id}
              onClick={() => (window.location.href = `/projects/${id}/phases/${p.id}`)}
            >
              📂 {p.phase_name}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
