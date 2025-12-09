import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/axios";
import { alertSuccess, alertError } from "../utils/alerts";

export default function IterationView() {
  const { id } = useParams(); // ID de iteración
  const [iter, setIter] = useState<any>(null);
  const [micros, setMicros] = useState<any[]>([]);

  // form
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [progress, setProgress] = useState(0);

  async function load() {
    const info = await api.get(`/iteraciones/${id}`);
    setIter(info.data);

    const micro = await api.get(`/microincrements/iteration/${id}`);
    setMicros(micro.data);
  }

async function createMicro() {
  if (!title.trim()) return alertError("El título es obligatorio");

  try {
    await api.post("microincrements", {
      project_id: iter.project_id,
      iteration_id: Number(id),
      title,
      description,
      progress,
    });

    alertSuccess("Microincremento técnico creado");
    setTitle("");
    setDescription("");
    setProgress(0);
    load();
  } catch (err) {
    console.error("Error creando microincremento:", err);
    alertError("No se pudo crear");
  }
}



  async function updateProgress(mid: number, newVal: number) {
    await api.put(`/microincrements/${mid}/progress`, {
      progress: newVal,
    });
    load();
  }

  useEffect(() => {
    load();
  }, [id]);

  if (!iter) return <p>Cargando...</p>;

  return (
    <>
      <style>{`
        .bg {
          width: 100vw;
          min-height: 100vh;
          background: radial-gradient(circle at 50% 0%, #300066 0%, #000 70%);
          padding-top: 40px;
          display: flex;
          justify-content: center;
          color: white;
        }

        .card {
          width: 800px;
          background: rgba(20, 20, 20, 0.75);
          padding: 35px;
          border-radius: 20px;
          border: 1px solid #2a2a2a;
          box-shadow: 0 0 40px #7c2bff33;
          backdrop-filter: blur(10px);
        }

        .micro {
          background: #141414;
          padding: 16px;
          margin-bottom: 12px;
          border-radius: 12px;
          border: 1px solid #333;
        }

        .input, .textarea {
          width: 100%;
          padding: 12px;
          background: #111;
          border: 1px solid #333;
          color: white;
          margin-bottom: 10px;
          border-radius: 10px;
        }

        .textarea { min-height: 70px; }

        .btn {
          width: 100%;
          padding: 12px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          background: linear-gradient(90deg,#7b2fff,#b46aff);
          color: white;
          font-weight: bold;
          transition: .25s;
        }

        .btn:hover {
          opacity: .9;
          transform: translateY(-2px);
        }

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

          <h2 style={{ textAlign: "center", marginBottom: 20 }}>
            ⏱ Iteración: {iter.nombre}
          </h2>

          <p style={{ color: "#cfc3ff" }}>{iter.objetivo}</p>

          <hr style={{ margin: "25px 0" }} />

          <h3 style={{ color: "#d5b6ff" }}>⚡ Microincrementos Técnicos</h3>

          {/* FORM CREAR */}
          <input
            className="input"
            placeholder="Título del microincremento técnico"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="textarea"
            placeholder="Descripción (opcional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label>Progreso inicial: {progress}%</label>
          <input
            type="range"
            min={0}
            max={100}
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
          />

          <button className="btn" style={{ marginTop: 10 }} onClick={createMicro}>
            ➕ Crear Microincremento Técnico
          </button>

          <hr style={{ margin: "25px 0" }} />

          {/* LISTA */}
          {micros.length === 0 && (
            <p style={{ color: "#c9aaff" }}>Sin microincrementos técnicos</p>
          )}

          {micros.map((m) => (
            <div className="micro" key={m.id}>
              <strong style={{ fontSize: 16, color: "#d5b6ff" }}>
                {m.title}
              </strong>
              <p style={{ color: "#cfc3ff" }}>{m.description}</p>

              <label>Progreso: {m.progress}%</label>
              <input
                type="range"
                min={0}
                max={100}
                value={m.progress}
                onChange={(e) =>
                  updateProgress(m.id, Number(e.target.value))
                }
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
