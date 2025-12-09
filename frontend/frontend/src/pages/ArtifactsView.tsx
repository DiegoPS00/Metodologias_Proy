import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api/axios";
import { alertSuccess, alertError } from "../utils/alerts";

const PHASES = ["Inception", "Elaboration", "Construction", "Transition"];

export default function ArtifactsView() {
  const { id } = useParams(); // project_id
  const [phase, setPhase] = useState("Inception");
  const [artifacts, setArtifacts] = useState<any[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [changeNotes, setChangeNotes] = useState("");
  const [version, setVersion] = useState(1);

  async function load() {
    const res = await api.get(`/projects/${id}/artifacts/${phase}`);
    setArtifacts(res.data);
  }

  async function add() {
    if (!title.trim())
      return alertError("El nombre del artefacto es obligatorio");

    try {
      await api.post(`/projects/${id}/artifacts`, {
        phase_name: phase,
        title,
        description,
        change_notes: changeNotes,
        version,
      });

      alertSuccess("Artefacto registrado");
      setTitle("");
      setDesc("");
      setChangeNotes("");
      setVersion(1);

      load();
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Error al registrar artefacto";
      alertError(msg);
    }
  }

  useEffect(() => {
    load();
  }, [phase]);

  return (
    <>
      <style>{`
  .artifacts-bg {
    width: 100vw;
    height: 100vh;
    background: #0f0f0f;
    display: flex;
    justify-content: center;
    padding-top: 40px;
  }
  .card {
    width: 900px;
    background: #1c1c1c;
    padding: 20px;
    border-radius: 12px;
    color: white;
    box-shadow: 0 0 20px #0006;
  }
  .tabs {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }
  .tab {
    padding: 10px 18px;
    border-radius: 8px;
    background: #2a2a2a;
    cursor: pointer;
    transition: .2s;
  }
  .tab.active {
    background: #7a3cff;
    font-weight: bold;
  }
  .artifact {
    background: #222;
    padding: 15px;
    border-radius: 10px;
    margin-bottom: 12px;
    border: 1px solid #333;
  }
  .input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 8px;
    background: #111;
    border: 1px solid #333;
    color: white;
  }
  .btn {
    width: 100%;
    padding: 12px;
    background: linear-gradient(90deg,#7a3cff,#9a63ff);
    border: none;
    border-radius: 10px;
    cursor: pointer;
    margin-top: 10px;
    color: white;
    font-weight: bold;
  }

  /* 🔥 Nueva clase requerida */
  .secondary-btn {
    margin-top: 10px;
    padding: 8px 12px;
    background: #333;
    border: 1px solid #555;
    border-radius: 8px;
    color: #d5b6ff;
    cursor: pointer;
    transition: .25s;
  }
  .secondary-btn:hover {
    background: #444;
    transform: translateY(-2px);
    border-color: #7a3cff;
  }
`}</style>


      <div className="artifacts-bg">
        <div className="card">

          <h2 style={{ marginBottom: "15px" }}>
            Artefactos del Proyecto — <span style={{ color: "#c9a7ff" }}>{phase}</span>
          </h2>

          {/* PHASE TABS */}
          <div className="tabs">
            {PHASES.map((p) => (
              <div
                key={p}
                className={`tab ${phase === p ? "active" : ""}`}
                onClick={() => setPhase(p)}
              >
                {p}
              </div>
            ))}
          </div>

          <h3 style={{ marginTop: "20px", marginBottom: "10px", color: "#c9a7ff" }}>
            Registrar artefacto
          </h3>

          {/* FORM */}
          <input
            className="input"
            placeholder="Nombre del artefacto"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="input"
            type="number"
            min={1}
            placeholder="Versión (ej. 1)"
            value={version}
            onChange={(e) => setVersion(Number(e.target.value))}
          />

          <textarea
            className="input"
            placeholder="Descripción (opcional)"
            value={description}
            onChange={(e) => setDesc(e.target.value)}
            rows={3}
          />

          <textarea
            className="input"
            placeholder="Notas de cambio (opcional)"
            value={changeNotes}
            onChange={(e) => setChangeNotes(e.target.value)}
            rows={3}
          />

          <button className="btn" onClick={add}>
            ➕ Agregar artefacto
          </button>
            
          <hr style={{ margin: "25px 0", borderColor: "#333" }} />

          <h3 style={{ color: "#c9a7ff" }}>Artefactos registrados</h3>

          {artifacts.map((a) => (
  <div className="artifact" key={a.id}>
    <strong style={{ color: "#d5b6ff" }}>{a.title}</strong>

    <p style={{ color: "#bfaaff", marginTop: "4px" }}>
      <b>Versión:</b> {a.version}
    </p>

    {/* BOTÓN PARA VER DEFECTOS */}
    <button
      className="secondary-btn"
      onClick={() => (window.location.href = `/artifact/${a.id}/defects`)}
    >
      ⚠ Ver Defectos
    </button>

    {a.description && (
      <small style={{ color: "#bfaaff" }}>
        {a.description}
      </small>
    )}

    {a.change_notes && (
      <p style={{ color: "#9d80ff", marginTop: "8px" }}>
        <b>Notas de cambio:</b> {a.change_notes}
      </p>
    )}
  </div>
))}

        </div>
      </div>
    </>
  );
}
