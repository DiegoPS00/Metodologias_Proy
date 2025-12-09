import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/axios";
import { alertSuccess, alertError } from "../utils/alerts";

export default function ArtifactDefects() {
  const { artifactId } = useParams();
  const [defects, setDefects] = useState([]);
  const [artifact, setArtifact] = useState<any>(null);

  // form
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("low");

  // ===============================
  // LOAD DATA
  // ===============================
  async function load() {
    try {
      // obtener info del artefacto
      const art = await api.get(`/artifacts/${artifactId}`);
      setArtifact(art.data);

      // obtener defectos del artefacto
      const res = await api.get(`/defects/artifact/${artifactId}`);
      setDefects(res.data);

    } catch (err) {
      console.error(err);
      alertError("No se pudo cargar la información");
    }
  }

  // ===============================
  // CREAR DEFECTO
  // ===============================
  async function create() {
    if (!title.trim()) return alertError("El título es obligatorio");
    if (!artifact) return alertError("Artefacto no cargado");

    try {
      await api.post("/defects", {
        project_id: artifact.project_id,
        artifact_id: Number(artifactId),   // 🔥 asegurado como número
        title,
        description,
        severity,
      });

      alertSuccess("Defecto registrado");
      setTitle("");
      setDescription("");
      setSeverity("low");

      load();

    } catch (error) {
      console.error(error);
      alertError("No se pudo registrar el defecto");
    }
  }

  useEffect(() => {
    load();
  }, [artifactId]);

  if (!artifact) return <p style={{ color: "white" }}>Cargando artefacto...</p>;

  return (
    <>
      <style>{`
        .bg {
          width: 100vw;
          min-height: 100vh;
          background: radial-gradient(circle at 50% 0%, #3a0066 0%, #000 70%);
          padding: 40px;
          color: white;
          display: flex;
          justify-content: center;
        }

        .card {
          width: 800px;
          background: rgba(20,20,20,0.75);
          padding: 40px;
          border-radius: 20px;
          border: 1px solid #2a2a2a;
          box-shadow: 0 0 40px #7c2bff55;
          backdrop-filter: blur(10px);
        }

        .defect {
          background: #141414;
          padding: 16px;
          margin-bottom: 14px;
          border-radius: 12px;
          border: 1px solid #333;
        }

        .input, .textarea, .select {
          width: 100%;
          padding: 12px;
          background: #111;
          border: 1px solid #333;
          color: white;
          border-radius: 12px;
          margin-bottom: 12px;
        }

        .btn {
          width: 100%;
          padding: 14px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          font-weight: bold;
          font-size: 16px;
          background: linear-gradient(90deg,#7b2fff,#b46aff);
          color: white;
          transition: .25s;
        }

        .btn:hover {
          opacity: .9;
          transform: translateY(-3px);
          box-shadow: 0 0 16px #a55cff55;
        }

        .sev-low { color: #61ff8a; }
        .sev-medium { color: #ffe56a; }
        .sev-high { color: #ff6a6a; }
      `}</style>

      <div className="bg">
        <div className="card">

          <button
            className="btn"
            style={{ marginBottom: 20, background: "#1c1c1c" }}
            onClick={() => history.back()}
          >
            ← Volver
          </button>

          <h2 style={{ textAlign: "center", color: "#e1c9ff" }}>
            🧩 Defectos del Entregable
          </h2>

          <h3 style={{ textAlign: "center", marginBottom: 20 }}>
            {artifact.name}
          </h3>

          <hr style={{ margin: "20px 0" }} />

          {/* FORM */}
          <h3 style={{ color: "#d5b6ff" }}>➕ Registrar Defecto</h3>

          <input
            className="input"
            placeholder="Título del defecto"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="textarea"
            placeholder="Descripción (opcional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <select
            className="select"
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
          >
            <option value="low">Bajo</option>
            <option value="medium">Medio</option>
            <option value="high">Alto</option>
          </select>

          <button className="btn" onClick={create}>
            Registrar Defecto
          </button>

          <hr style={{ margin: "25px 0" }} />

          {/* LISTA */}
          <h3 style={{ color: "#cfaaff" }}>📋 Lista de Defectos</h3>

          {defects.length === 0 && (
            <p style={{ color: "#c9aaff" }}>No hay defectos registrados</p>
          )}

          {defects.map((d: any) => (
            <div className="defect" key={d.id}>
              <strong className={`sev-${d.severity}`}>
                {d.title} ({d.severity})
              </strong>
              <p>{d.description}</p>
              <small>{new Date(d.created_at).toLocaleString()}</small>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
